import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import {
  ProductReview,
  SupplementCategory,
  SupplementProduct,
  SUPPLEMENTS_CATALOG,
} from './data/supplements';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterSidebar, PriceBucket } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { BrandSpotlight } from './components/BrandSpotlight';
import { Footer } from './components/Footer';
import {
  AuthPage,
  AuthUser,
  SubscriptionSelection,
} from './components/AuthPage';

type SortOption =
  | 'bestsellers'
  | 'toprated'
  | 'price-asc'
  | 'price-desc'
  | 'mostreviewed';

const CART_STORAGE_KEY = 'iherb_sg_cart_v1';
const USER_STORAGE_KEY = 'iherb_sg_user_v1';
const SUBS_STORAGE_KEY = 'iherb_sg_subscriptions_v1';

export default function App() {
  // Navigation & Auth State
  const [pageView, setPageView] = useState<'store' | 'auth'>(() =>
    window.location.hash === '#auth' ? 'auth' : 'store'
  );
  const [pendingSubscription, setPendingSubscription] =
    useState<SubscriptionSelection | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [subscriptions, setSubscriptions] = useState<
    Record<string, { variantId: string; cadence: string }>
  >(() => {
    try {
      const raw = localStorage.getItem(SUBS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Catalog Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SupplementCategory | 'All'>('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [onlyITested, setOnlyITested] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [priceBucket, setPriceBucket] = useState<PriceBucket>('all');
  const [sortBy, setSortBy] = useState<SortOption>('bestsellers');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Detail & Cart UI
  const [detailProduct, setDetailProduct] = useState<SupplementProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customReviews, setCustomReviews] = useState<Record<string, ProductReview[]>>({});

  // Persistent Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const parsed: { productId: string; variantId: string; quantity: number }[] =
        JSON.parse(raw);
      return parsed
        .map((entry) => {
          const product = SUPPLEMENTS_CATALOG.find(
            (p) => p.id === entry.productId
          );
          if (!product) return null;
          return {
            product,
            variantId: entry.variantId,
            quantity: entry.quantity,
          };
        })
        .filter((x): x is CartItem => x !== null);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      const serializable = cartItems.map((i) => ({
        productId: i.product.id,
        variantId: i.variantId,
        quantity: i.quantity,
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializable));
    } catch {
      // Ignore storage quota issues
    }
  }, [cartItems]);

  useEffect(() => {
    const onHashChange = () => {
      setPageView(window.location.hash === '#auth' ? 'auth' : 'store');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Derived facet metadata
  const { brandCounts, categoryCounts, allGoals, allDietary } = useMemo(() => {
    const bCounts: Record<string, number> = {};
    const cCounts: Record<string, number> = {};
    const goalsSet = new Set<string>();
    const dietarySet = new Set<string>();

    for (const p of SUPPLEMENTS_CATALOG) {
      bCounts[p.brand] = (bCounts[p.brand] || 0) + 1;
      cCounts[p.category] = (cCounts[p.category] || 0) + 1;
      p.healthGoals.forEach((g) => goalsSet.add(g));
      p.dietary.forEach((d) => dietarySet.add(d));
    }

    return {
      brandCounts: bCounts,
      categoryCounts: cCounts,
      allGoals: Array.from(goalsSet).sort(),
      allDietary: Array.from(dietarySet).sort(),
    };
  }, []);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = SUPPLEMENTS_CATALOG.filter((p) => {
      if (activeCategory !== 'All' && p.category !== activeCategory) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      if (
        selectedGoals.length > 0 &&
        !selectedGoals.some((g) => p.healthGoals.includes(g))
      ) {
        return false;
      }
      if (
        selectedDietary.length > 0 &&
        !selectedDietary.every((d) => p.dietary.includes(d))
      ) {
        return false;
      }
      if (onlyITested && !p.iTested) {
        return false;
      }
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      const basePrice = p.variants[0].priceSGD;
      if (priceBucket === 'under25' && basePrice >= 25) return false;
      if (priceBucket === '25to45' && (basePrice < 25 || basePrice > 45))
        return false;
      if (priceBucket === 'over45' && basePrice <= 45) return false;

      if (q) {
        const haystack = `${p.brand} ${p.name} ${p.subtitle} ${p.category} ${p.healthGoals.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case 'toprated':
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        case 'price-asc':
          return a.variants[0].priceSGD - b.variants[0].priceSGD;
        case 'price-desc':
          return b.variants[0].priceSGD - a.variants[0].priceSGD;
        case 'mostreviewed':
          return b.reviewCount - a.reviewCount;
        case 'bestsellers':
        default:
          return a.rank - b.rank;
      }
    });
  }, [
    searchQuery,
    activeCategory,
    selectedBrands,
    selectedGoals,
    selectedDietary,
    onlyITested,
    minRating,
    priceBucket,
    sortBy,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    activeCategory !== 'All' ||
    selectedBrands.length > 0 ||
    selectedGoals.length > 0 ||
    selectedDietary.length > 0 ||
    onlyITested ||
    minRating > 0 ||
    priceBucket !== 'all';

  const resetAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSelectedBrands([]);
    setSelectedGoals([]);
    setSelectedDietary([]);
    setOnlyITested(false);
    setMinRating(0);
    setPriceBucket('all');
  };

  const toggleItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    val: string
  ) => {
    setter((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  // Cart handlers
  const handleAddToCart = (
    product: SupplementProduct,
    variantId: string,
    quantity = 1
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.variantId === variantId
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.variantId === variantId
            ? { ...item, quantity: Math.min(20, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, variantId, quantity }];
    });
  };

  const handleUpdateQty = (
    productId: string,
    variantId: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variantId === variantId)
      )
    );
  };

  const handleAddReview = (productId: string, review: ProductReview) => {
    setCustomReviews((prev) => ({
      ...prev,
      [productId]: [review, ...(prev[productId] || [])],
    }));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => {
    const variant =
      item.product.variants.find((v) => v.id === item.variantId) ||
      item.product.variants[0];
    return sum + variant.priceSGD * item.quantity;
  }, 0);

  const handleSubscribeRedirect = (
    product: SupplementProduct,
    variantId: string,
    cadence: string
  ) => {
    setPendingSubscription({ product, variantId, cadence });
    setDetailProduct(null);
    setPageView('auth');
    if (window.location.hash !== '#auth') {
      window.location.hash = 'auth';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStore = () => {
    setPageView('store');
    if (window.location.hash === '#auth') {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (
    user: AuthUser,
    cadence?: string,
    sub?: SubscriptionSelection | null
  ) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
    if (sub && cadence) {
      setSubscriptions((prev) => {
        const next = {
          ...prev,
          [sub.product.id]: { variantId: sub.variantId, cadence },
        };
        try {
          localStorage.setItem(SUBS_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore storage errors
        }
        return next;
      });
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  if (pageView === 'auth') {
    return (
      <AuthPage
        subscription={pendingSubscription}
        currentUser={currentUser}
        onBackToStore={handleBackToStore}
        onAuthSuccess={handleAuthSuccess}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1C241E]">
      <Header
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onScrollToBrands={() => {
          document
            .getElementById('brands-section')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Catalog Workspace: Sidebar + 3-Column Product Grid */}
        <section
          id="catalog-section"
          className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-[256px] shrink-0">
              <FilterSidebar
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                selectedBrands={selectedBrands}
                onToggleBrand={(b) => toggleItem(setSelectedBrands, b)}
                selectedGoals={selectedGoals}
                onToggleGoal={(g) => toggleItem(setSelectedGoals, g)}
                selectedDietary={selectedDietary}
                onToggleDietary={(d) => toggleItem(setSelectedDietary, d)}
                onlyITested={onlyITested}
                onToggleITested={() => setOnlyITested((v) => !v)}
                minRating={minRating}
                onChangeMinRating={setMinRating}
                priceBucket={priceBucket}
                onChangePriceBucket={setPriceBucket}
                brandCounts={brandCounts}
                categoryCounts={categoryCounts}
                allGoals={allGoals}
                allDietary={allDietary}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={resetAllFilters}
              />
            </div>

            {/* Product Grid Column */}
            <div className="flex-1 min-w-0">
              {/* Catalog Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#E5E8E3]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-lg border border-[#D4DBD0] bg-white text-xs font-semibold text-[#1C241E]"
                  >
                    <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                    <span>Filters</span>
                  </button>
                  <p className="text-sm text-[#4A554C]">
                    Showing{' '}
                    <span className="font-semibold text-[#1C241E] tabular-nums">
                      {filteredProducts.length}
                    </span>{' '}
                    of{' '}
                    <span className="tabular-nums">
                      {SUPPLEMENTS_CATALOG.length}
                    </span>{' '}
                    supplements
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <label
                    htmlFor="sort-select"
                    className="text-xs font-medium text-[#5A655C] whitespace-nowrap"
                  >
                    Sort by
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="min-h-[40px] px-3 py-1.5 rounded-lg border border-[#D4DBD0] bg-white text-xs font-medium text-[#1C241E] focus:outline-none focus:border-[#458500]"
                  >
                    <option value="bestsellers">Best Sellers</option>
                    <option value="toprated">Highest Rated</option>
                    <option value="mostreviewed">Most Reviewed</option>
                    <option value="price-asc">Price: Low to High (SG$)</option>
                    <option value="price-desc">Price: High to Low (SG$)</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Summary Bar */}
              {hasActiveFilters && (
                <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[#5A655C] mr-1">Active:</span>
                  {activeCategory !== 'All' && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory('All')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#EDF3E8] text-[#234300] font-medium hover:bg-[#DFE9D6]"
                    >
                      <span>{activeCategory}</span>
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                  {selectedBrands.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => toggleItem(setSelectedBrands, b)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#EDF3E8] text-[#234300] font-medium hover:bg-[#DFE9D6]"
                    >
                      <span>{b}</span>
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  ))}
                  {selectedGoals.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleItem(setSelectedGoals, g)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#EDF3E8] text-[#234300] font-medium hover:bg-[#DFE9D6]"
                    >
                      <span>{g}</span>
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  ))}
                  {selectedDietary.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleItem(setSelectedDietary, d)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#EDF3E8] text-[#234300] font-medium hover:bg-[#DFE9D6]"
                    >
                      <span>{d}</span>
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  ))}
                  {onlyITested && (
                    <button
                      type="button"
                      onClick={() => setOnlyITested(false)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#EDF3E8] text-[#234300] font-medium hover:bg-[#DFE9D6]"
                    >
                      <span>iTested Verified</span>
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="ml-1 text-[#3D7700] font-semibold hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Product Grid or Empty State */}
              {filteredProducts.length === 0 ? (
                <div className="py-16 px-6 rounded-xl border border-[#E5E8E3] bg-white text-center space-y-3">
                  <h3 className="font-display text-lg font-semibold text-[#1C241E]">
                    No matching supplements found
                  </h3>
                  <p className="text-sm text-[#5A655C] max-w-md mx-auto">
                    Try clearing one or more active filters or searching for another
                    nutrient or brand.
                  </p>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="mt-2 px-5 py-2.5 min-h-[40px] rounded-lg bg-[#3D7700] hover:bg-[#315F00] text-white text-xs font-semibold transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const defaultVariantId = product.variants[0].id;
                    const cartQuantity =
                      cartItems.find(
                        (item) =>
                          item.product.id === product.id &&
                          item.variantId === defaultVariantId
                      )?.quantity || 0;
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        cartQuantity={cartQuantity}
                        subscribedCadence={subscriptions[product.id]?.cadence}
                        onOpenDetail={setDetailProduct}
                        onAddToCart={(p, variantId) =>
                          handleAddToCart(p, variantId, 1)
                        }
                        onUpdateQuantity={handleUpdateQty}
                        onSubscribe={handleSubscribeRedirect}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <BrandSpotlight
          selectedBrands={selectedBrands}
          onSelectBrand={(brandName) =>
            setSelectedBrands((prev) =>
              prev.includes(brandName) ? prev : [brandName]
            )
          }
        />
      </main>

      <Footer
        onSelectCategory={setActiveCategory}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter supplements"
          className="fixed inset-0 z-50 flex lg:hidden bg-[#1C241E]/50"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            className="w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-base font-bold text-[#1C241E]">
                Filter Catalog
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="p-2 rounded-lg text-[#4A554C] hover:bg-[#F3F5F2]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <FilterSidebar
              activeCategory={activeCategory}
              onSelectCategory={(c) => {
                setActiveCategory(c);
                setMobileFiltersOpen(false);
              }}
              selectedBrands={selectedBrands}
              onToggleBrand={(b) => toggleItem(setSelectedBrands, b)}
              selectedGoals={selectedGoals}
              onToggleGoal={(g) => toggleItem(setSelectedGoals, g)}
              selectedDietary={selectedDietary}
              onToggleDietary={(d) => toggleItem(setSelectedDietary, d)}
              onlyITested={onlyITested}
              onToggleITested={() => setOnlyITested((v) => !v)}
              minRating={minRating}
              onChangeMinRating={setMinRating}
              priceBucket={priceBucket}
              onChangePriceBucket={setPriceBucket}
              brandCounts={brandCounts}
              categoryCounts={categoryCounts}
              allGoals={allGoals}
              allDietary={allDietary}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={resetAllFilters}
            />
          </div>
        </div>
      )}

      <ProductDetailModal
        product={detailProduct}
        cartItems={cartItems}
        subscribedCadence={
          detailProduct ? subscriptions[detailProduct.id]?.cadence : undefined
        }
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onUpdateQty={handleUpdateQty}
        onSubscribe={handleSubscribeRedirect}
        customReviews={customReviews}
        onAddReview={handleAddReview}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
