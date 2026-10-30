/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * About Us section matching the reference design with vertical outlined headline,
 * landscaper portrait photo, script kicker, and company story.
 */

import React, { useState } from 'react';
import { CheckCircle2, Award, Clock, Users, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assets.ts';

interface EliteAboutUsProps {
  onOpenDetails: () => void;
}

export function EliteAboutUs({ onOpenDetails }: EliteAboutUsProps) {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Outlined Vertical Title + Portrait Photo */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start gap-4 sm:gap-6">
            {/* Outlined Vertical Typography */}
            <div className="shrink-0 select-none flex items-center justify-center" aria-hidden="true">
              <span className="font-['Oswald'] text-4xl sm:text-6xl font-bold uppercase tracking-widest text-outline-lime writing-mode-vertical">
                ABOUT US
              </span>
            </div>

            {/* Photo Container */}
            <div className="relative w-full max-w-md rounded-xs overflow-hidden shadow-lg border border-[#E2ECE0] group">
              <img
                src={getAssetUrl('/assets/aistudio/lawn_53235d3c.jpg')}
                alt="Elite Outdoor Solution landscaper at work"
                className="w-full h-[460px] sm:h-[520px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              {/* Subtle green vignette overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#16572E]/40 via-transparent to-transparent pointer-events-none" />

              {/* Trust badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-xs border border-[#E2ECE0] shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-['Oswald'] text-sm font-bold uppercase text-[#16572E]">
                    100% Insured & Certified
                  </p>
                  <p className="text-xs text-[#5D7163]">Commercial & Residential Grounds Care</p>
                </div>
                <Award className="w-7 h-7 text-[#84CC16] shrink-0" />
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Script Kicker */}
            <p className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl text-[#65A30D] font-bold mb-2">
              About Us
            </p>

            {/* High-Impact Headline */}
            <h2 className="font-['Oswald',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#1C2A20] leading-tight mb-6">
              INTRODUCTION OF ELITE OUTDOOR SOLUTION
            </h2>

            {/* Descriptive Body Copy */}
            <p className="text-sm sm:text-base text-[#5D7163] leading-relaxed mb-4">
              At Elite Outdoor Solution, we believe that an impeccably maintained exterior creates an inviting atmosphere of tranquility and natural beauty. Based in Courtice and serving the greater region, our team combines horticultural science with master craftsmanship to deliver tailor-made outdoor solutions.
            </p>

            <p className="text-sm sm:text-base text-[#5D7163] leading-relaxed mb-6">
              From precision turf striping and artistic hedge sculpting to complex perennial bed rejuvenation, our insured professionals use commercial-grade equipment and eco-conscious techniques to ensure vibrant, healthy greenery across every season.
            </p>

            {/* Expanded Content when clicked */}
            {showFullStory && (
              <div className="mb-6 p-4 bg-[#F2F7EE] border border-[#E2ECE0] rounded-xs text-xs sm:text-sm text-[#1C2A20] space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                  <span>Transparent itemized written estimates with zero hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                  <span>Licensed arborists & certified horticultural specialists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                  <span>Commercial low-noise battery & high-efficiency machinery</span>
                </div>
              </div>
            )}

            {/* Read More Button */}
            <button
              onClick={() => {
                setShowFullStory(!showFullStory);
                onOpenDetails();
              }}
              className="px-8 py-3 bg-[#16572E] hover:bg-[#0F3E20] text-white font-['Oswald'] font-bold text-sm tracking-wider uppercase rounded-xs transition-colors duration-150 shadow-sm cursor-pointer"
            >
              {showFullStory ? 'VIEW COMPANY BROCHURE' : 'READ MORE'}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
