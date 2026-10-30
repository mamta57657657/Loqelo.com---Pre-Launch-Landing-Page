/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Footer Section matching the reference layout:
 * - 4 columns: Logo & Bio, QUICK LINKS, USEFUL LINKS, CONTACT INFO
 * - Bottom grass silhouette divider and dark green copyright bar.
 */

import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { GrassSilhouetteDivider } from './GrassSilhouetteDivider.tsx';

interface EliteFooterProps {
  onOpenQuote: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenFaq: () => void;
}

export function EliteFooter({
  onOpenQuote,
  onOpenPrivacy,
  onOpenTerms,
  onOpenFaq,
}: EliteFooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F2F7EE] text-[#1C2A20] pt-16 pb-0 overflow-hidden border-t border-[#E2ECE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Logo & Company Mission */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-5 cursor-pointer" onClick={() => scrollTo('home')}>
              <div className="w-12 h-12 rounded-full bg-[#16572E] border-2 border-[#84CC16] flex items-center justify-center p-1.5 shadow-sm text-white">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-current" strokeWidth="2">
                  <circle cx="20" cy="20" r="16" stroke="#84CC16" strokeWidth="1.5" />
                  <path d="M12 25 C14 22 20 22 23 25" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18 16 C20 13 26 13 28 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20 30 L20 18 C20 12 26 10 26 10 C26 15 22 17 20 18" fill="#84CC16" stroke="#84CC16" />
                  <path d="M20 22 C15 17 14 12 14 12 C18 12 20 17 20 22" fill="#A3E635" stroke="#A3E635" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-['Oswald'] font-bold text-xl tracking-wider text-[#16572E] uppercase leading-tight">
                  ELITE OUTDOOR
                </span>
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#65A30D] uppercase leading-none">
                  SOLUTION
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5D7163] leading-relaxed mb-6 max-w-sm">
              Providing precision landscaping, artistic hedge trimming, and dependable lawn maintenance across Courtice, Bowmanville, and the Durham Region. Dedicated to outdoor spaces that inspire tranquility.
            </p>

            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 bg-[#16572E] hover:bg-[#0F3E20] text-white font-['Oswald'] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <span>GET FREE ESTIMATE</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
            </button>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-['Oswald'] text-base font-bold uppercase tracking-wider text-[#16572E] mb-5">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5D7163]">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-[#16572E] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-[#16572E] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-[#16572E] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('testimonials')}
                  className="hover:text-[#16572E] transition-colors"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-[#16572E] transition-colors"
                >
                  Contacts Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="lg:col-span-2">
            <h4 className="font-['Oswald'] text-base font-bold uppercase tracking-wider text-[#16572E] mb-5">
              USEFUL LINKS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5D7163]">
              <li>
                <button onClick={onOpenTerms} className="hover:text-[#16572E] transition-colors">
                  Terms & Condition
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-[#16572E] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenFaq} className="hover:text-[#16572E] transition-colors">
                  FAQ's
                </button>
              </li>
              <li>
                <button onClick={onOpenQuote} className="hover:text-[#16572E] transition-colors">
                  Seasonal Care Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (matching exact reference) */}
          <div className="lg:col-span-4">
            <h4 className="font-['Oswald'] text-base font-bold uppercase tracking-wider text-[#16572E] mb-5">
              CONTACT INFO
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-[#1C2A20]">
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#84CC16] text-[#0F3E20] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-4 h-4 fill-current" />
                </div>
                <a
                  href="tel:6477025682"
                  className="hover:text-[#16572E] font-medium transition-colors"
                >
                  (647) 702-5682
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#84CC16] text-[#0F3E20] flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href="mailto:jessylewis97@outlook.com"
                  className="hover:text-[#16572E] font-medium transition-colors break-all"
                >
                  jessylewis97@outlook.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#84CC16] text-[#0F3E20] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-medium text-[#1C2A20]">
                  Courtice Ontario Canada
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Signature Grass Divider Line into Dark Green Bar */}
      <GrassSilhouetteDivider fillColor="#16572E" height={42} />

      {/* Copyright Bar matching reference */}
      <div className="bg-[#16572E] text-white text-xs py-4 px-4 text-center border-t border-[#1E753E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Copyrights © 2026</span>
          <span className="text-[#A3E635] font-semibold">Elite Outdoor Solutions.</span>
          <span>All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
