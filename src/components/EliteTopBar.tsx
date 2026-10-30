/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Top Announcement Bar matching the dark forest green banner in the reference design.
 */

import React from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';

interface EliteTopBarProps {
  onOpenQuote: () => void;
}

export function EliteTopBar({ onOpenQuote }: EliteTopBarProps) {
  return (
    <div className="bg-[#16572E] text-white/95 text-xs py-2 px-4 border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="font-medium tracking-wide">
            Professional Outdoor Living & Landscape Care · Free Estimates & Consultations
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-white/80 shrink-0">
          <a
            href="tel:6477025682"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#A3E635]" />
            <span className="font-semibold text-white">(647) 702-5682</span>
          </a>
          <span className="text-white/40 hidden md:inline">|</span>
          <span className="hidden md:flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#A3E635]" />
            <span>Mon–Sat 7:00 AM – 7:00 PM</span>
          </span>
          <span className="text-white/40 hidden lg:inline">|</span>
          <span className="hidden lg:flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#A3E635]" />
            <span>Courtice, Ontario & Greater Durham</span>
          </span>
        </div>
      </div>
    </div>
  );
}
