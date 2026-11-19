import { Minus, Plus, RefreshCw, Star } from 'lucide-react';
import { formatSGD, SupplementProduct } from '../data/supplements';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: SupplementProduct;
  cartQuantity: number;
  onOpenDetail: (product: SupplementProduct) => void;
  onAddToCart: (product: SupplementProduct, variantId: string) => void;
  onUpdateQuantity: (
    productId: string,
    variantId: string,
    delta: number
  ) => void;
  onSubscribe: (product: SupplementProduct, variantId: string) => void;
}

export function ProductCard({
  product,
  cartQuantity,
  onOpenDetail,
  onAddToCart,
  onUpdateQuantity,
  onSubscribe,
}: ProductCardProps) {
  const defaultVariant = product.variants[0];
  const pricePerServing = defaultVariant.priceSGD / defaultVariant.servings;
  const subscribePrice = defaultVariant.priceSGD * 0.9;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, defaultVariant.id);
  };

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-[#E5E8E3] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(28,36,30,0.14)]">
      {/* 4:3 Product Photography */}
      <button
        type="button"
        onClick={() => onOpenDetail(product)}
        aria-label={`View details for ${product.brand} ${product.name}`}
        className="relative aspect-[4/3] w-full bg-[#F3F5F2] overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#458500]"
      >
        <ResilientImage
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          title={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      {/* Identical Field Order Card Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Quiet single-line unboxed metadata kicker */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#5A655C] mb-1.5">
          <span className="font-medium truncate">{product.brand}</span>
          {(product.kicker || product.iTested) && (
            <span className="shrink-0 text-[#3D7700] font-medium">
              {product.kicker || 'iTested'}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-display text-[15px] font-semibold text-[#1C241E] leading-snug line-clamp-2 min-h-[2.65rem]">
          <button
            type="button"
            onClick={() => onOpenDetail(product)}
            className="text-left hover:text-[#3D7700] transition-colors focus-visible:outline-2 focus-visible:outline-[#458500] rounded"
          >
            {product.name}
          </button>
        </h3>

        {/* Rating & Review Count */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#4A554C]">
          <Star
            className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706] shrink-0"
            aria-hidden="true"
          />
          <span className="font-semibold text-[#1C241E] tabular-nums">
            {product.rating.toFixed(1)}
          </span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums text-[#5A655C]">
            {product.reviewCount.toLocaleString()} reviews
          </span>
        </div>

        {/* Variant Info */}
        <p className="mt-1.5 text-xs text-[#5A655C]">
          {defaultVariant.label} · {formatSGD(pricePerServing)} / serving
        </p>

        {/* Price + Action aligned at baseline */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-[#F0F2EE]">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[17px] font-bold text-[#1C241E] tabular-nums">
              {formatSGD(defaultVariant.priceSGD)}
            </span>
            {defaultVariant.originalPriceSGD && (
              <span className="text-xs text-[#78837A] line-through tabular-nums">
                {formatSGD(defaultVariant.originalPriceSGD)}
              </span>
            )}
          </div>

          {cartQuantity === 0 ? (
            <button
              type="button"
              onClick={handleQuickAdd}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold bg-[#3D7700] hover:bg-[#315F00] text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D7700]"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div
              role="group"
              aria-label={`Quantity in cart for ${product.name}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center min-h-[40px] rounded-lg bg-[#3D7700] text-white overflow-hidden shrink-0"
            >
              <button
                type="button"
                aria-label={`Decrease quantity of ${product.name}`}
                onClick={() =>
                  onUpdateQuantity(product.id, defaultVariant.id, -1)
                }
                className="w-10 min-h-[40px] flex items-center justify-center hover:bg-[#315F00] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
              >
                <Minus className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <span className="min-w-[28px] px-1.5 text-center text-xs font-semibold tabular-nums">
                {cartQuantity}
              </span>
              <button
                type="button"
                aria-label={`Increase quantity of ${product.name}`}
                onClick={() =>
                  cartQuantity < 20 &&
                  onUpdateQuantity(product.id, defaultVariant.id, 1)
                }
                disabled={cartQuantity >= 20}
                className="w-10 min-h-[40px] flex items-center justify-center hover:bg-[#315F00] disabled:opacity-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Replicated Subscribe & Save Row */}
        <div className="mt-3 pt-3 flex items-center justify-between gap-3 border-t border-[#F0F2EE]">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[17px] font-extrabold text-[#DC2626] tabular-nums">
              {formatSGD(subscribePrice)}
            </span>
            <span className="text-xs font-semibold text-[#78837A] tabular-nums">
              (10%)
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSubscribe(product, defaultVariant.id);
            }}
            className="subscribe-glow-btn inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold bg-[#B91C1C] hover:bg-[#991B1B] text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C]"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Subscribe Now</span>
          </button>
        </div>
      </div>
    </article>
  );
}
