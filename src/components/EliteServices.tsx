/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Our Services section matching the rich forest green background, 4 service cards
 * with featured expanded state, circular carousel controls, VIEW MORE button,
 * and white grass blades silhouette transition.
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import { GrassSilhouetteDivider } from './GrassSilhouetteDivider.tsx';
import { getAssetUrl } from '../utils/assets.ts';

interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string;
  features: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'lawn-design',
    title: 'LAWN DESIGNING',
    image: '/assets/aistudio/lawn_53235d3c.jpg',
    description:
      'Custom turf layout, premium sod installation, micro-grading, and architectural landscape contours tailored to your soil composition.',
    features: ['Soil pH preparation', 'Kentucky Bluegrass & Fescue sod', 'Laser-guided grading'],
  },
  {
    id: 'hedge-trimming',
    title: 'HEDGE TRIMMING',
    image: '/assets/aistudio/hedge2_0d57def8.jpg',
    description:
      'Precision shaping, pruning, and health inspection for ornamental hedges, cedar privacy screens, and formal evergreen topiary.',
    features: ['Artistic boxwood shaping', 'Cedar height reduction', 'Diseased foliage removal'],
  },
  {
    id: 'grass-cutting',
    title: 'GRASS CUTTING',
    image: '/assets/aistudio/garden_14e81227.jpg',
    description:
      'Weekly and bi-weekly scheduled rotary mowing with razor-sharp blades, crisp perimeter edging, and thorough hardscape blowing.',
    features: ['Sharp mulching blades', 'Clean driveway edging', '100% debris blown clean'],
  },
  {
    id: 'garden-maintenance',
    title: 'GARDEN MAINTENANCE',
    image: '/assets/aistudio/garden_962c46dc.jpg',
    description:
      'Comprehensive seasonal planting, organic weed control, cedar bark mulch delivery, and perennial garden bed winterization.',
    features: ['Deep weed root extraction', 'Dark organic mulch renewal', 'Seasonal bulb planting'],
  },
  {
    id: 'seasonal-cleanup',
    title: 'SEASONAL CLEANUP',
    image: '/assets/aistudio/trees_8ac2c2ca.jpg',
    description:
      'Spring aeration, thatch dethatching, and autumn fallen leaf vacuuming to keep roots oxygenated and free from snow mold.',
    features: ['Core aeration', 'Heavy leaf vacuuming', 'Winter plant wrapping'],
  },
];

interface EliteServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onViewMore: () => void;
}

export function EliteServices({ onSelectService, onViewMore }: EliteServicesProps) {
  const [activeCardId, setActiveCardId] = useState<string>('hedge-trimming');
  const [startIndex, setStartIndex] = useState<number>(0);

  const visibleCards = SERVICES_DATA.slice(startIndex, startIndex + 4);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(SERVICES_DATA.length - 4);
    }
  };

  const handleNext = () => {
    if (startIndex + 4 < SERVICES_DATA.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  return (
    <section id="services" className="relative bg-[#16572E] text-white pt-20 pb-0 overflow-hidden">
      {/* Background Subtle Leaf Pattern / Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#84CC16_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl text-[#A3E635] font-bold mb-2">
            Our Services
          </p>

          <h2 className="font-['Oswald',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-white leading-tight mb-4">
            PROFESSIONAL LANDSCAPING WITH A PERSONAL TOUCH
          </h2>

          <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed">
            Delivering bespoke lawn architecture, precision horticulture, and dependable seasonal care tailored for homes and commercial estates.
          </p>
        </div>

        {/* 4 Cards Row with Carousel Controls */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#0F3E20]/90 border border-white/20 text-white flex items-center justify-center hover:bg-[#84CC16] hover:text-[#0F3E20] transition-colors shadow-md cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#0F3E20]/90 border border-white/20 text-white flex items-center justify-center hover:bg-[#84CC16] hover:text-[#0F3E20] transition-colors shadow-md cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleCards.map((service) => {
              const isSelected = activeCardId === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => {
                    setActiveCardId(service.id);
                    onSelectService(service);
                  }}
                  className={`group relative h-[380px] rounded-xs overflow-hidden cursor-pointer transition-all duration-300 shadow-md ${
                    isSelected ? 'ring-3 ring-[#84CC16]' : 'hover:-translate-y-1'
                  }`}
                >
                  {/* Background Photo */}
                  <img
                    src={getAssetUrl(service.image)}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* If card is active / featured (like Hedge Trimming in the reference image) */}
                  {isSelected ? (
                    <div className="absolute inset-0 bg-[#0F3E20]/90 p-6 flex flex-col justify-end text-left border-t-4 border-[#84CC16] animate-fadeIn">
                      <h3 className="font-['Oswald'] text-2xl font-bold uppercase tracking-wider text-[#A3E635] mb-3">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-1.5 text-xs text-white/80 mb-4">
                        {service.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="text-xs font-bold text-[#84CC16] tracking-wider uppercase flex items-center gap-1">
                        CLICK TO CUSTOMIZE QUOTE <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ) : (
                    /* Default Card Appearance */
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-center">
                      <h3 className="font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wider text-white drop-shadow-md group-hover:text-[#A3E635] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-white/70 mt-1 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* View More Button */}
        <div className="text-center mt-12 mb-16">
          <button
            onClick={onViewMore}
            className="px-8 py-3 bg-[#84CC16] hover:bg-[#74B32A] active:scale-95 text-[#0F3E20] font-['Oswald'] font-bold text-sm tracking-wider uppercase rounded-xs transition-colors shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            VIEW MORE
          </button>
        </div>
      </div>

      {/* Signature White Grass Blade Silhouette Transition to Testimonials */}
      <GrassSilhouetteDivider fillColor="#FFFFFF" height={58} />
    </section>
  );
}
