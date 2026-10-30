/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Testimonials Section matching the reference speech bubble cards with overlapping
 * dark green quotation badge, 5 stars, active author highlight, and slider dots.
 */

import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  stars: number;
  content: string;
  service: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'SARAH MCKENNA',
    role: 'HOMEOWNER',
    location: 'Courtice, ON',
    stars: 5,
    service: 'Hedge Sculpting & Mulching',
    content:
      'The hedge trimming and perimeter lawn edging was completed with surgical precision. Our 12-foot cedar privacy hedge was overgrown, and Elite Outdoor shaped it perfectly without harming a single branch.',
  },
  {
    id: '2',
    name: 'JAMES VINCE',
    role: 'HAPPY CUSTOMER',
    location: 'Bowmanville, ON',
    stars: 5,
    service: 'Full Lawn Rejuvenation & Mowing',
    content:
      'Elite Outdoor Solution completely revamped our front and backyard. From aeration and weed control to weekly rotary striping, the curb appeal is night and day. Upfront pricing and zero surprises.',
  },
  {
    id: '3',
    name: 'MICHAEL CHEN',
    role: 'ESTATE MANAGER',
    location: 'Oshawa, ON',
    stars: 5,
    service: 'Garden Bed Maintenance',
    content:
      'Managing a 1.5-acre property requires dependable contractors. Their crew arrives on schedule every Thursday, details the flower beds, trims the edges, and leaves the driveway spotless. Highly recommended.',
  },
  {
    id: '4',
    name: 'ELEANOR ROSS',
    role: 'RESIDENTIAL CLIENT',
    location: 'Courtice, ON',
    stars: 5,
    service: 'Seasonal Spring Cleanup',
    content:
      'Prompt, polite, and very knowledgeable about local Ontario shrubs. They removed all winter debris, edged the garden beds, and installed fresh triple-mix soil. Excellent service from start to finish.',
  },
];

export function EliteTestimonials() {
  const [activeIdx, setActiveIdx] = useState(1); // James Vince is active by default as in reference

  const activeReview = TESTIMONIALS[activeIdx];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl text-[#65A30D] font-bold mb-2">
            Testimonials
          </p>

          <h2 className="font-['Oswald',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#1C2A20] leading-tight">
            WHAT ARE CLIENTS SAY
          </h2>
        </div>

        {/* 3 Speech Bubble Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch mb-10">
          {TESTIMONIALS.slice(0, 3).map((item, idx) => {
            const isHighlighted = idx === activeIdx;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isHighlighted ? 'scale-102 z-10' : 'opacity-90 hover:opacity-100'
                }`}
              >
                {/* Speech Bubble Container */}
                <div
                  className={`relative p-8 rounded-md bg-white border ${
                    isHighlighted
                      ? 'border-[#84CC16] shadow-md ring-1 ring-[#84CC16]/20'
                      : 'border-[#E2ECE0] shadow-xs hover:border-[#84CC16]/50'
                  }`}
                >
                  {/* Overlapping Dark Green Quote Icon Badge */}
                  <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#16572E] text-white flex items-center justify-center shadow-sm">
                    <Quote className="w-5 h-5 fill-current text-[#84CC16]" />
                  </div>

                  {/* 5 Gold Stars */}
                  <div className="flex items-center gap-1 mb-4 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#5D7163] leading-relaxed mb-4 min-h-[96px]">
                    {item.content}
                  </p>

                  <div className="text-[11px] font-semibold text-[#16572E] uppercase tracking-wider">
                    {item.service}
                  </div>

                  {/* Speech Bubble Tail */}
                  <div
                    className="absolute -bottom-3 left-10 w-6 h-6 bg-white border-b border-r border-[#E2ECE0] transform rotate-45"
                    style={{ borderColor: isHighlighted ? '#84CC16' : '#E2ECE0' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Customer Highlight Below Cards (as seen in reference design) */}
        <div className="text-center mt-6">
          <div className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase tracking-wider text-[#16572E]">
            {activeReview.name}
          </div>
          <div className="text-xs font-semibold tracking-widest text-[#5D7163] uppercase mt-0.5">
            {activeReview.role} · {activeReview.location}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {TESTIMONIALS.slice(0, 3).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveIdx(dotIdx)}
                className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeIdx === dotIdx
                    ? 'w-7 bg-[#84CC16]'
                    : 'w-2.5 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                }`}
                aria-label={`View testimonial ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
