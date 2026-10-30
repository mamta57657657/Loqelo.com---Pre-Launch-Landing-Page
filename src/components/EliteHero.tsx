/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Hero Section matching the full-bleed landscape banner with script kicker,
 * bold condensed headline, dual buttons, and carousel dots.
 */

import React, { useState } from 'react';
import { ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';
import { getAssetUrl } from '../utils/assets.ts';

interface EliteHeroProps {
  onOpenQuote: () => void;
  onExploreMore: () => void;
  onContactUs: () => void;
}

export function EliteHero({ onOpenQuote, onExploreMore, onContactUs }: EliteHeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      kicker: 'Welcome To Our Elite Outdoor Solution',
      title: 'CREATING OUTDOOR SPACES THAT INVITE RELAXATION',
      description:
        'Professional landscaping, precision lawn manicuring, hedge sculpting, and bespoke outdoor design engineered to elevate curb appeal and outdoor tranquility.',
      bgImage: '/assets/aistudio/trees_8ac2c2ca.jpg',
    },
    {
      kicker: 'Precision Horticultural Craftsmanship',
      title: 'ARCHITECTURAL HEDGES & PRISTINE LAWN CARE',
      description:
        'From high-definition turf striping to ornamental hedge contouring, our certified specialists deliver unrivaled care for residential estates.',
      bgImage: '/assets/aistudio/lawn_53235d3c.jpg',
    },
    {
      kicker: 'Transform Your Backyard Sanctuary',
      title: 'CUSTOM GARDEN DESIGN & SEASONAL MAINTENANCE',
      description:
        'Tailored fertilization, perennial plantings, organic weed defense, and comprehensive seasonal cleanups that keep your property vibrant year-round.',
      bgImage: '/assets/aistudio/house_31508b24.jpg',
    },
  ];

  const current = heroSlides[activeSlide];

  return (
    <section id="home" className="relative min-h-[580px] lg:min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background Photography with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={getAssetUrl(current.bgImage)}
          alt="Elite Outdoor Landscaping"
          className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out scale-105"
        />
        {/* Gradients to match the reference lighting and ensure WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-[#0F3E20]/25 mix-blend-multiply" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Script Kicker */}
        <p className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl lg:text-4xl text-[#A3E635] tracking-wide mb-3 drop-shadow-md">
          {current.kicker}
        </p>

        {/* High-Impact Condensed Bold Headline */}
        <h1 className="font-['Oswald',sans-serif] text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white leading-[1.05] mb-6 drop-shadow-lg max-w-4xl text-balance">
          {current.title}
        </h1>

        {/* Subtitle Description */}
        <p className="font-['DM_Sans',sans-serif] text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed mb-10 drop-shadow-sm font-normal">
          {current.description}
        </p>

        {/* Action Button Pair matching reference */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreMore}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#16572E] hover:bg-[#0F3E20] text-white font-['Oswald'] font-bold text-base tracking-wider uppercase rounded-xs transition-colors duration-150 shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            EXPLORE MORE
          </button>

          <button
            onClick={onContactUs}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white hover:text-[#16572E] text-white border-2 border-white font-['Oswald'] font-bold text-base tracking-wider uppercase rounded-xs transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
          >
            CONTACT US
          </button>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center gap-2.5 mt-14" aria-label="Hero carousel pagination">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx
                  ? 'w-8 bg-[#84CC16]'
                  : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
