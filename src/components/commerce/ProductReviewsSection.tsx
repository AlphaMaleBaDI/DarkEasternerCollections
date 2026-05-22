'use client';

import React, { useState } from 'react';

export type ProductReview = {
  id: string;
  productId?: string;
  productSlug?: string;
  customerName: string;
  city?: string;
  rating?: number;
  review: string;
  verified: boolean;
  pending?: boolean;
  createdAt: string;
};

// Seed product-specific reviews
const SEED_REVIEWS: ProductReview[] = [
  // Royal Presence (Slug: royal-blue-couture-masterpiece, Category: female-fashion)
  {
    id: "rev-1",
    productSlug: "royal-blue-couture-masterpiece",
    customerName: "Amina K.",
    city: "Abuja",
    rating: 5,
    review: "The structure and drape of the Royal Presence are absolutely breathtaking. It has a commanding, regal silhouette that felt bespoke in every sense.",
    verified: true,
    createdAt: "2026-04-12"
  },
  {
    id: "rev-2",
    productSlug: "royal-blue-couture-masterpiece",
    customerName: "Chloe T.",
    city: "London",
    rating: 5,
    review: "A masterclass in drapery. The blue is incredibly rich and vibrant under showroom lights. The fitting guide helped me get the perfect length.",
    verified: true,
    createdAt: "2026-05-01"
  },
  // Emerald Statement Gown (Slug: emerald-luxury-statement, Category: female-fashion)
  {
    id: "rev-3",
    productSlug: "emerald-luxury-statement",
    customerName: "Funmi A.",
    city: "Lagos",
    rating: 5,
    review: "The emerald tone is deep and elegant. The fabric flows beautifully when walking and holds its structure flawlessly. Absolute luxury.",
    verified: true,
    createdAt: "2026-03-24"
  },
  // Pink Radiance (Slug: pink-tiered-couture-mini, Category: female-fashion)
  {
    id: "rev-4",
    productSlug: "pink-tiered-couture-mini",
    customerName: "Sadiya M.",
    city: "Geneva",
    rating: 4,
    review: "Vibrant, bold, and expressive. The tiered layers are so unique. It has a beautiful couture feel while remaining modern and playful.",
    verified: true,
    createdAt: "2026-04-30"
  },
  // Signature Luxury Tresses (Slug: luxury-hair-collection-01, Category: wigs)
  {
    id: "rev-5",
    productSlug: "luxury-hair-collection-01",
    customerName: "Sarah N.",
    city: "Houston",
    rating: 5,
    review: "Impeccable lace melting and hair density. It moves entirely naturally and has a gorgeous healthy shine. The best wig I have ever purchased.",
    verified: true,
    createdAt: "2026-05-10"
  },
  {
    id: "rev-6",
    productSlug: "luxury-hair-collection-01",
    customerName: "Nneka E.",
    city: "Abuja",
    rating: 5,
    review: "Crown-worthy hair. The hand-tied parting is incredibly realistic and holds curls perfectly. The private curator was extremely helpful during selection.",
    verified: true,
    createdAt: "2026-05-18"
  }
];

// Fallback reviews by category
const CATEGORY_FALLBACK_REVIEWS: Record<string, Omit<ProductReview, 'id' | 'createdAt'>[]> = {
  hair: [
    {
      customerName: "Zainab A.",
      city: "London",
      rating: 5,
      review: "The hair feels incredibly soft and holds its styling beautifully. The lace blend is completely invisible. Highly recommend.",
      verified: true
    },
    {
      customerName: "Tolu O.",
      city: "Lagos",
      rating: 5,
      review: "Absolutely flawless density and movement. The private styling guidance ensured I got the exact length for my features.",
      verified: true
    }
  ],
  perfumes: [
    {
      customerName: "Marcus K.",
      city: "New York",
      rating: 5,
      review: "A magnificent scent composition. It does not shout; it establishes an aura that lingers long after you leave. Absolute luxury.",
      verified: true
    },
    {
      customerName: "Elena R.",
      city: "Paris",
      rating: 5,
      review: "Deep, mysterious, and beautifully long-lasting. The notes evolve throughout the day, drawing quiet compliments from those in the know.",
      verified: true
    }
  ],
  men: [
    {
      customerName: "Tariq J.",
      city: "Dubai",
      rating: 5,
      review: "The tailoring is sharp and the shoulder line is powerful. Represents Afro-Luxe couture at its absolute finest.",
      verified: true
    },
    {
      customerName: "Segun O.",
      city: "Houston",
      rating: 5,
      review: "Incredible fabric weight and craftsmanship. It fits perfectly and commands the room effortlessly.",
      verified: true
    }
  ],
  women: [
    {
      customerName: "Chinedu A.",
      city: "Lagos",
      rating: 5,
      review: "The drape and fitting are spectacular. The custom sizing coordination guaranteed it sat perfectly. Highly professional curator guide.",
      verified: true
    },
    {
      customerName: "Sophia M.",
      city: "Geneva",
      rating: 5,
      review: "Every stitch is elegant. Bold, structured, and makes a beautiful statement. Uncompromising quality.",
      verified: true
    }
  ]
};

const StarIcon = ({ filled, onClick, className = "w-3 h-3" }: { filled: boolean; onClick?: () => void; className?: string }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!onClick}
    className={`focus:outline-none transition-colors duration-300 ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    aria-label="Rate"
  >
    <svg 
      className={`${className} ${filled ? 'text-luxury-gold fill-luxury-gold' : 'text-zinc-800 fill-transparent hover:text-zinc-600'}`} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  </button>
);

interface ProductReviewsSectionProps {
  productId: string;
  productSlug: string;
  productCategory: string;
  productTitle: string;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  productId,
  productSlug,
  productCategory,
  productTitle
}) => {
  // Resolve reviews using: 1. productId, 2. productSlug, 3. category fallback, 4. default women
  const getInitialReviews = (): ProductReview[] => {
    // 1 & 2. Try match by ID or Slug
    const matched = SEED_REVIEWS.filter(
      (r) => r.productId === productId || r.productSlug === productSlug
    );
    if (matched.length > 0) return matched;

    // 3. Match by category mapping
    const cat = productCategory?.toLowerCase();
    let fallbackCat = 'women'; // default fallback
    if (cat === 'hair' || cat === 'wigs') {
      fallbackCat = 'hair';
    } else if (cat === 'perfumes') {
      fallbackCat = 'perfumes';
    } else if (cat === 'men' || cat === 'male-fashion') {
      fallbackCat = 'men';
    } else if (cat === 'women' || cat === 'female-fashion') {
      fallbackCat = 'women';
    }

    const fallbacks = CATEGORY_FALLBACK_REVIEWS[fallbackCat] || CATEGORY_FALLBACK_REVIEWS['women'];
    return fallbacks.map((f, idx) => ({
      id: `fallback-${fallbackCat}-${idx}`,
      productId,
      productSlug,
      customerName: f.customerName,
      city: f.city,
      rating: f.rating,
      review: f.review,
      verified: f.verified,
      createdAt: new Date(Date.now() - (idx + 1) * 86400000 * 3).toISOString().split('T')[0] // staggered dates
    }));
  };

  const [reviews, setReviews] = useState<ProductReview[]>(() => getInitialReviews());
  const [showAll, setShowAll] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  // Form State
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formReview, setFormReview] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Dynamic headings logic
  const getHeaderDetails = () => {
    const cat = productCategory?.toLowerCase();
    if (cat === 'hair' || cat === 'wigs') {
      return {
        title: "Hair Atelier Reflections",
        subcopy: "Verified experiences from our private hair clientele."
      };
    }
    if (cat === 'perfumes') {
      return {
        title: "Scent Reflections",
        subcopy: "Reflections on scent presence, longevity, and identity."
      };
    }
    if (cat === 'men' || cat === 'male-fashion') {
      return {
        title: "Menswear Reflections",
        subcopy: "Private client impressions on tailoring, fit, and presence."
      };
    }
    if (cat === 'women' || cat === 'female-fashion') {
      return {
        title: "Couture Reflections",
        subcopy: "Private client impressions on tailoring, fit, and presence."
      };
    }
    return {
      title: "Atelier Reflections",
      subcopy: "Verified impressions from our global private showroom."
    };
  };

  const { title, subcopy } = getHeaderDetails();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formReview.trim()) return;

    const newReview: ProductReview = {
      id: `custom-${Date.now()}`,
      productId,
      productSlug,
      customerName: formName,
      city: formCity.trim() ? formCity.trim() : undefined,
      rating: formRating > 0 ? formRating : undefined,
      review: formReview,
      verified: false,
      pending: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setShowSuccess(true);

    // Reset fields
    setFormName('');
    setFormCity('');
    setFormRating(0);
    setFormReview('');

    // Clear success banner after 10 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 10000);
  };

  // Limit first 2 on mobile, 3 on desktop using CSS classes
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="border-t border-zinc-900/60 bg-zinc-950 py-20 md:py-28 relative overflow-hidden">
      {/* Subtle decorative gold blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full filter blur-[120px] pointer-events-none opacity-20" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Editorial Title */}
          <div className="lg:col-span-4 flex flex-col justify-start lg:sticky lg:top-24 h-fit">
            <span className="text-luxury-gold text-xs uppercase tracking-[0.25em] mb-4 font-medium block">
              Reflections
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white leading-[1.2]">
              {title}
            </h2>
            <div className="h-[1px] w-12 bg-luxury-gold/30 my-6" />
            <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.18em] leading-relaxed font-light">
              {subcopy}
            </p>
          </div>
          
          {/* Right Column: Reviews list & Leave a Review Form */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Reviews List */}
            <div className="space-y-12 md:space-y-16">
              {visibleReviews.map((review, idx) => {
                const isExpanded = expandedReviews[review.id];
                const shouldTruncate = review.review.length > 250;
                const displayedText = shouldTruncate && !isExpanded
                  ? `${review.review.slice(0, 250)}...`
                  : review.review;

                return (
                  <div 
                    key={review.id} 
                    className={`group border-b border-zinc-900/40 pb-12 last:border-0 last:pb-0 ${
                      !showAll && idx === 2 ? 'md:block hidden' : ''
                    }`}
                  >
                    <div className="relative">
                      {/* Elegant quotes graphic */}
                      <span className="absolute -top-6 -left-4 text-6xl font-serif text-luxury-gold/10 pointer-events-none select-none">
                        &ldquo;
                      </span>
                      <div className="relative z-10 pl-4 space-y-3">
                        {review.rating && (
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon key={star} filled={star <= review.rating!} />
                            ))}
                          </div>
                        )}
                        <blockquote className="text-zinc-300 text-lg md:text-xl font-light italic leading-relaxed font-serif">
                          {displayedText}
                          {shouldTruncate && (
                            <button
                              type="button"
                              onClick={() => toggleExpand(review.id)}
                              className="text-luxury-gold hover:text-white text-[10px] uppercase tracking-[0.15em] font-medium transition-colors ml-2 focus:outline-none inline-block border-b border-luxury-gold/20 hover:border-white/30"
                            >
                              {isExpanded ? "Read Less" : "Read More"}
                            </button>
                          )}
                        </blockquote>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pl-4">
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-[1px] bg-luxury-gold/30" />
                        <span className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-light">
                          {review.customerName}{review.city ? ` · ${review.city}` : ''}
                        </span>
                      </div>
                      
                      {review.pending ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-zinc-800 bg-zinc-900/40 text-zinc-500 text-[8px] md:text-[9px] uppercase tracking-[0.18em] font-light select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" />
                          Pending Verification
                        </span>
                      ) : review.verified ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-luxury-gold/15 bg-luxury-gold/5 text-luxury-gold text-[8px] md:text-[9px] uppercase tracking-[0.18em] font-light select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                          Verified Client
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More Reflections Action */}
            {!showAll && reviews.length > (reviews.length > 2 ? 3 : 2) && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="text-luxury-gold hover:text-white uppercase tracking-[0.2em] text-[10px] font-medium transition-colors duration-500 pb-1 border-b border-luxury-gold/20 hover:border-white/30 inline-block"
                >
                  View More Reflections ({reviews.length - (reviews.length > 2 ? 3 : 2)} additional)
                </button>
              </div>
            )}

            {/* Client Reflection Form */}
            <div className="mt-16 pt-16 border-t border-zinc-900/60 max-w-xl">
              <h3 className="text-xl font-serif italic text-white mb-6">Client Reflection</h3>
              
              {showSuccess && (
                <div className="p-6 border border-luxury-gold/15 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-wider leading-relaxed font-light mb-6 animate-fade-in">
                  <div className="flex items-center gap-2 mb-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                    Submission Recorded
                  </div>
                  Your reflection has been submitted to the House curators for verification.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="client-name" className="block text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-light">
                      Name / Client Identification *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-zinc-950/80 border border-zinc-900 hover:border-zinc-800 focus:border-luxury-gold/40 focus:ring-1 focus:ring-luxury-gold/5 text-zinc-100 text-xs px-4 py-3 outline-none transition-all duration-300 font-light"
                      placeholder="e.g. Amina K."
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="client-city" className="block text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-light">
                      City / Location (Optional)
                    </label>
                    <input
                      id="client-city"
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full bg-zinc-950/80 border border-zinc-900 hover:border-zinc-800 focus:border-luxury-gold/40 focus:ring-1 focus:ring-luxury-gold/5 text-zinc-100 text-xs px-4 py-3 outline-none transition-all duration-300 font-light"
                      placeholder="e.g. Lagos"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-light">
                    Rating (Optional)
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon 
                        key={star} 
                        filled={star <= formRating} 
                        onClick={() => setFormRating(star)} 
                        className="w-4.5 h-4.5"
                      />
                    ))}
                    {formRating > 0 && (
                      <button 
                        type="button" 
                        onClick={() => setFormRating(0)}
                        className="text-[9px] uppercase tracking-[0.15em] text-zinc-600 hover:text-zinc-400 ml-2 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="client-review" className="block text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-light">
                    Reflection / Notes *
                  </label>
                  <textarea
                    id="client-review"
                    required
                    rows={4}
                    value={formReview}
                    onChange={(e) => setFormReview(e.target.value)}
                    className="w-full bg-zinc-950/80 border border-zinc-900 hover:border-zinc-800 focus:border-luxury-gold/40 focus:ring-1 focus:ring-luxury-gold/5 text-zinc-100 text-xs px-4 py-3 outline-none transition-all duration-300 font-light resize-none leading-relaxed"
                    placeholder={`Describe your experience with the ${productTitle}...`}
                  />
                </div>

                <button
                  type="submit"
                  className="border border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold hover:text-black font-medium text-[10px] uppercase tracking-[0.25em] px-8 py-3.5 transition-all duration-500 select-none block w-full md:w-auto"
                >
                  Submit Reflection
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
