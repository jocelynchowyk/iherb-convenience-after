import { useEffect, useState } from 'react';
import { Minus, Plus, RefreshCw, ShieldCheck, Star, Truck, X } from 'lucide-react';
import {
  formatSGD,
  ProductReview,
  SupplementProduct,
} from '../data/supplements';
import { CartItem } from './CartDrawer';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: SupplementProduct | null;
  cartItems: CartItem[];
  onClose: () => void;
  onAddToCart: (
    product: SupplementProduct,
    variantId: string,
    quantity: number
  ) => void;
  onUpdateQty: (productId: string, variantId: string, delta: number) => void;
  onSubscribe: (product: SupplementProduct, variantId: string) => void;
  customReviews: Record<string, ProductReview[]>;
  onAddReview: (productId: string, review: ProductReview) => void;
}

export function ProductDetailModal({
  product,
  cartItems,
  onClose,
  onAddToCart,
  onUpdateQty,
  onSubscribe,
  customReviews,
  onAddReview,
}: ProductDetailModalProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'facts' | 'usage' | 'reviews'>('facts');

  // Review composer state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedVariantId(product.variants[0].id);
      setActiveTab('facts');
      setShowReviewForm(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const variant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];
  const pricePerServing = variant.priceSGD / variant.servings;
  const cartQty =
    cartItems.find(
      (item) => item.product.id === product.id && item.variantId === variant.id
    )?.quantity || 0;
  const allReviews = [
    ...(customReviews[product.id] || []),
    ...product.reviews,
  ];

  const handleAdd = () => {
    onAddToCart(product, variant.id, 1);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewTitle.trim() || !reviewBody.trim()) return;
    const newReview: ProductReview = {
      id: `custom-${Date.now()}`,
      author: reviewAuthor.trim(),
      location: 'Singapore',
      rating: reviewRating,
      date: 'Nov 2026',
      title: reviewTitle.trim(),
      body: reviewBody.trim(),
      verifiedPurchase: true,
      helpfulCount: 0,
    };
    onAddReview(product.id, newReview);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewBody('');
    setReviewRating(5);
    setShowReviewForm(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C241E]/55 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#E5E8E3] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E8E3] bg-[#FAFBF9]">
          <div className="flex items-center gap-2 text-xs text-[#5A655C] truncate">
            <span>{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-[#1C241E]">{product.brand}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#4A554C] hover:text-[#1C241E] hover:bg-[#EDF0EB] transition-colors focus-visible:outline-2 focus-visible:outline-[#458500]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Contiguous Purchase Module */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Gallery Left */}
            <div className="md:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F3F5F2] border border-[#E5E8E3]">
                <ResilientImage
                  src={product.image}
                  alt={`${product.brand} ${product.name}`}
                  title={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5A655C]">
                {product.dietary.map((d, idx) => (
                  <span key={d} className="inline-flex items-center gap-2">
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <span>{d}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Purchase Controls Right */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <p className="text-xs font-semibold text-[#3D7700] mb-1">
                  {product.brand}
                  {product.iTested ? ' · iTested Third-Party Verified' : ''}
                </p>
                <h2
                  id="pdp-title"
                  className="font-display text-xl sm:text-2xl font-bold text-[#1C241E] leading-snug"
                >
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-[#4A554C]">{product.subtitle}</p>

                <div className="mt-3 flex items-center gap-2 text-xs text-[#4A554C]">
                  <div className="flex items-center gap-1">
                    <Star
                      className="w-4 h-4 fill-[#D97706] text-[#D97706]"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-[#1C241E] tabular-nums text-sm">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('reviews')}
                    className="underline decoration-[#C8D1C4] hover:text-[#1C241E] tabular-nums"
                  >
                    {(
                      product.reviewCount +
                      (customReviews[product.id]?.length || 0)
                    ).toLocaleString()}{' '}
                    reviews
                  </button>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#3D7700] font-medium">In Stock</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="py-3 border-y border-[#ECEFE9] flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-2xl font-bold text-[#1C241E] tabular-nums">
                    {formatSGD(variant.priceSGD)}
                  </span>
                  {variant.originalPriceSGD && (
                    <span className="text-sm text-[#78837A] line-through tabular-nums">
                      {formatSGD(variant.originalPriceSGD)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#5A655C] tabular-nums">
                  {formatSGD(pricePerServing)} / serving
                </span>
              </div>

              {/* Package Size / Variant Selector */}
              <div>
                <p className="text-xs font-semibold text-[#1C241E] mb-2">
                  Package Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const selected = v.id === variant.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`px-3.5 py-2 min-h-[40px] rounded-lg border text-xs font-medium transition-colors ${
                          selected
                            ? 'border-[#3D7700] bg-[#EDF3E8] text-[#234300]'
                            : 'border-[#D4DBD0] bg-white text-[#3F4A41] hover:border-[#8C998B]'
                        }`}
                      >
                        {v.label} ·{' '}
                        <span className="tabular-nums font-semibold">
                          {formatSGD(v.priceSGD)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Buy CTA -> Transforms into Quantity Stepper once added */}
              <div className="pt-1">
                {cartQty === 0 ? (
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full min-h-[44px] px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#3D7700] hover:bg-[#315F00] transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D7700]"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    <span className="tabular-nums">
                      Add to Cart · {formatSGD(variant.priceSGD)}
                    </span>
                  </button>
                ) : (
                  <div
                    role="group"
                    aria-label={`Cart quantity for ${product.name}`}
                    className="w-full min-h-[44px] rounded-lg bg-[#3D7700] text-white flex items-center justify-between overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-label={`Decrease ${product.name} quantity in cart`}
                      onClick={() => onUpdateQty(product.id, variant.id, -1)}
                      className="w-14 min-h-[44px] flex items-center justify-center hover:bg-[#315F00] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                    >
                      <Minus className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <span className="px-3 text-sm font-semibold tabular-nums">
                      {cartQty} in Cart · {formatSGD(variant.priceSGD * cartQty)}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${product.name} quantity in cart`}
                      onClick={() =>
                        cartQty < 20 && onUpdateQty(product.id, variant.id, 1)
                      }
                      disabled={cartQty >= 20}
                      className="w-14 min-h-[44px] flex items-center justify-center hover:bg-[#315F00] disabled:opacity-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                )}

                {/* Replicated Subscribe & Save Row */}
                <div className="mt-3 pt-3 border-t border-[#ECEFE9] flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-lg font-extrabold text-[#DC2626] tabular-nums">
                      {formatSGD(variant.priceSGD * 0.9)}
                    </span>
                    <span className="text-xs font-semibold text-[#78837A] tabular-nums">
                      (10%)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSubscribe(product, variant.id)}
                    className="subscribe-glow-btn inline-flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[42px] rounded-lg text-xs font-semibold bg-[#B91C1C] hover:bg-[#991B1B] text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Subscribe Now</span>
                  </button>
                </div>
              </div>

              {/* SG Fulfillment Info */}
              <div className="pt-2 space-y-1.5 text-xs text-[#4A554C]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#3D7700] shrink-0" aria-hidden="true" />
                  <span>
                    Ships to Singapore in 2–4 business days · Free shipping over SG$30
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3D7700] shrink-0" aria-hidden="true" />
                  <span>
                    Stored in climate-controlled facilities · Authentic manufacturer batch
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Tabs: Supplement Facts / Suggested Use / Customer Reviews */}
          <div className="border-t border-[#E5E8E3] pt-6">
            <div
              role="tablist"
              aria-label="Product specification tabs"
              className="flex items-center gap-2 border-b border-[#E5E8E3] pb-3 mb-5 overflow-x-auto"
            >
              {(
                [
                  { id: 'facts', label: 'Supplement Facts' },
                  { id: 'usage', label: 'Overview & Suggested Use' },
                  {
                    id: 'reviews',
                    label: `Customer Reviews (${allReviews.length})`,
                  },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === t.id
                      ? 'bg-[#1C241E] text-white'
                      : 'bg-[#F3F5F2] text-[#4A554C] hover:text-[#1C241E]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === 'facts' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 border border-[#D4DBD0] rounded-xl overflow-hidden">
                  <div className="bg-[#F3F5F2] px-4 py-3 border-b border-[#D4DBD0]">
                    <h3 className="font-display text-sm font-bold text-[#1C241E]">
                      Supplement Facts
                    </h3>
                    <p className="text-xs text-[#4A554C] mt-0.5">
                      Serving Size: {product.supplementFacts.servingSize}
                    </p>
                  </div>
                  <table className="w-full text-left text-xs sm:text-[13px]">
                    <thead>
                      <tr className="border-b border-[#E5E8E3] text-[#5A655C]">
                        <th className="py-2.5 px-4 font-semibold">Active Ingredient</th>
                        <th className="py-2.5 px-4 font-semibold text-right">
                          Amount / Serving
                        </th>
                        <th className="py-2.5 px-4 font-semibold text-right">
                          % Daily Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ECEFE9]">
                      {product.supplementFacts.rows.map((row) => (
                        <tr key={row.nutrient} className="text-[#1C241E]">
                          <td className="py-2.5 px-4 font-medium">{row.nutrient}</td>
                          <td className="py-2.5 px-4 text-right font-mono tabular-nums">
                            {row.amount}
                          </td>
                          <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#4A554C]">
                            {row.dailyValue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="px-4 py-2.5 bg-[#FAFBF9] border-t border-[#E5E8E3] text-[11px] text-[#5A655C]">
                    † Daily Value not established.
                  </p>
                </div>

                <div className="md:col-span-5 space-y-4 text-sm text-[#3F4A41]">
                  <div>
                    <h4 className="font-display text-xs font-semibold text-[#1C241E] mb-1">
                      Other Ingredients
                    </h4>
                    <p className="text-xs leading-relaxed text-[#4A554C]">
                      {product.otherIngredients}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-semibold text-[#1C241E] mb-1">
                      Health Focus
                    </h4>
                    <p className="text-xs text-[#4A554C]">
                      {product.healthGoals.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-4 max-w-2xl text-sm text-[#3F4A41] leading-relaxed">
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#1C241E] mb-1">
                    Product Description
                  </h3>
                  <p>{product.description}</p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#1C241E] mb-1">
                    Suggested Use
                  </h3>
                  <p>{product.suggestedUse}</p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#1C241E] mb-1">
                    Storage in Tropical Climates
                  </h3>
                  <p className="text-xs text-[#4A554C]">
                    Keep tightly sealed in a cool, dry place away from direct sunlight.
                    Desiccant packets should remain inside the bottle until empty.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-[#4A554C]">
                    Verified buyer feedback from Singapore shoppers
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm((v) => !v)}
                    className="px-4 py-2 min-h-[40px] rounded-lg border border-[#D4DBD0] text-xs font-semibold text-[#1C241E] hover:bg-[#F3F5F2] transition-colors"
                  >
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </button>
                </div>

                {showReviewForm && (
                  <form
                    onSubmit={handleReviewSubmit}
                    className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E5E8E3] space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder="Your name (e.g. Michelle K.)"
                        className="px-3 py-2 rounded-lg border border-[#D4DBD0] bg-white text-sm"
                      />
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        aria-label="Star rating"
                        className="px-3 py-2 rounded-lg border border-[#D4DBD0] bg-white text-sm"
                      >
                        <option value={5}>5 Stars — Excellent</option>
                        <option value={4}>4 Stars — Good</option>
                        <option value={3}>3 Stars — Average</option>
                        <option value={2}>2 Stars — Fair</option>
                        <option value={1}>1 Star — Poor</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      required
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="Review headline"
                      className="w-full px-3 py-2 rounded-lg border border-[#D4DBD0] bg-white text-sm"
                    />
                    <textarea
                      required
                      rows={3}
                      value={reviewBody}
                      onChange={(e) => setReviewBody(e.target.value)}
                      placeholder="Share your experience with potency, packaging, or delivery..."
                      className="w-full px-3 py-2 rounded-lg border border-[#D4DBD0] bg-white text-sm"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 min-h-[40px] rounded-lg bg-[#3D7700] hover:bg-[#315F00] text-white text-xs font-semibold"
                    >
                      Submit Review
                    </button>
                  </form>
                )}

                <div className="divide-y divide-[#ECEFE9]">
                  {allReviews.map((rev) => (
                    <div key={rev.id} className="py-4 first:pt-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]"
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <span className="font-display text-sm font-semibold text-[#1C241E]">
                            {rev.title}
                          </span>
                        </div>
                        <span className="text-xs text-[#6C776E]">{rev.date}</span>
                      </div>
                      <p className="text-sm text-[#3F4A41] leading-relaxed">
                        {rev.body}
                      </p>
                      <p className="text-xs text-[#6C776E]">
                        {rev.author} · {rev.location}
                        {rev.verifiedPurchase ? ' · Verified Purchase' : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
