import type { Product } from '@/data/dar-catalog';

export function ProductArtwork({ product }: { product: Product }) {
  return (
    <div
      className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-2xl"
      style={{ backgroundColor: product.bgHex }}
    >
      <svg viewBox="0 0 240 180" className="h-36 w-48" aria-hidden="true">
        {product.shape === 'sofa' && (
          <g fill="none" stroke={product.accentHex} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="34" y="64" width="172" height="58" rx="18" fill="#FFFFFFAA" />
            <path d="M48 64V50a14 14 0 0 1 14-14h116a14 14 0 0 1 14 14v14" fill="#FFFFFF80" />
            <line x1="92" y1="64" x2="92" y2="122" />
            <line x1="148" y1="64" x2="148" y2="122" />
            <line x1="56" y1="122" x2="56" y2="140" />
            <line x1="184" y1="122" x2="184" y2="140" />
          </g>
        )}
        {product.shape === 'table' && (
          <g fill="none" stroke={product.accentHex} strokeWidth="3.5" strokeLinejoin="round">
            <ellipse cx="120" cy="76" rx="78" ry="22" fill="#FFFFFFB8" />
            <rect x="64" y="96" width="28" height="44" rx="8" fill="#FFFFFF77" />
            <rect x="148" y="96" width="28" height="44" rx="8" fill="#FFFFFF77" />
          </g>
        )}
        {product.shape === 'screen' && (
          <g fill="none" stroke={product.accentHex} strokeWidth="3">
            <rect x="64" y="24" width="112" height="132" rx="8" fill="#FFFFFF75" />
            <path d="M92 24v132M120 24v132M148 24v132M64 68h112M64 112h112" />
            <polygon points="120,42 136,68 120,94 104,68" fill="#FFFFFFCC" />
          </g>
        )}
        {product.shape === 'lamp' && (
          <g fill="none" stroke={product.accentHex} strokeWidth="3.5" strokeLinecap="round">
            <line x1="120" y1="16" x2="120" y2="56" />
            <path d="M72 96c0-26 21-40 48-40s48 14 48 40H72z" fill="#FFFFFFCC" />
            <ellipse cx="120" cy="96" rx="48" ry="10" fill="#FFE6C7" />
          </g>
        )}
        {product.shape === 'chair' && (
          <g fill="none" stroke={product.accentHex} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M72 44h96v46a20 20 0 0 1-20 20H92a20 20 0 0 1-20-20V44z" fill="#FFFFFFB0" />
            <line x1="88" y1="110" x2="80" y2="144" />
            <line x1="152" y1="110" x2="160" y2="144" />
          </g>
        )}
        {product.shape === 'console' && (
          <g fill="none" stroke={product.accentHex} strokeWidth="3.5" strokeLinejoin="round">
            <rect x="40" y="64" width="160" height="18" rx="6" fill="#FFFFFFCC" />
            <line x1="56" y1="82" x2="56" y2="142" />
            <line x1="184" y1="82" x2="184" y2="142" />
            <line x1="56" y1="122" x2="184" y2="122" />
          </g>
        )}
      </svg>
    </div>
  );
}

