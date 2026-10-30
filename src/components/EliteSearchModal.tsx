/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Search Modal allowing visitors to search across services, packages, and seasonal tips.
 */

import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface EliteSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
}

const SEARCHABLE_ITEMS = [
  { name: 'Hedge Trimming & Pruning', category: 'Shrubs & Privacy Screens', id: 'hedge-trimming' },
  { name: 'Precision Grass Cutting & Edging', category: 'Lawn Maintenance', id: 'grass-cutting' },
  { name: 'Lawn Designing & Sod Installation', category: 'Turf Architecture', id: 'lawn-design' },
  { name: 'Garden Maintenance & Mulch Laying', category: 'Garden Beds', id: 'garden-maintenance' },
  { name: 'Spring Aeration & Overseeding', category: 'Seasonal Renewal', id: 'seasonal-cleanup' },
  { name: 'Fall Leaf Clean-Up & Vacuuming', category: 'Seasonal Care', id: 'seasonal-cleanup' },
  { name: 'Commercial Property Grounds Maintenance', category: 'Commercial Estates', id: 'grass-cutting' },
  { name: 'Dark Cedar Bark Mulch Delivery & Install', category: 'Garden Beds', id: 'garden-maintenance' },
];

export function EliteSearchModal({ isOpen, onClose, onSelectService }: EliteSearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? SEARCHABLE_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCHABLE_ITEMS.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center p-4 pt-20">
      <div className="relative w-full max-w-xl bg-white rounded-xs border border-[#16572E] shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-[#F2F7EE] border-b border-[#E2ECE0] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#16572E] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search outdoor services (e.g. hedge, mulch, aeration, mowing)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#1C2A20] focus:outline-hidden placeholder-[#768E7C]"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#5D7163] hover:text-[#1C2A20] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-[#E2ECE0]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#65A30D] pb-2">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Landscaping Services'}
          </div>

          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#5D7163]">
              No direct matches found for "{query}". You can request a custom quote for any outdoor project.
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectService(item.id);
                  onClose();
                }}
                className="py-3 px-2 flex items-center justify-between hover:bg-[#F2F7EE] rounded-xs cursor-pointer group transition-colors"
              >
                <div>
                  <div className="font-['Oswald'] text-base uppercase font-bold text-[#1C2A20] group-hover:text-[#16572E]">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#5D7163]">{item.category}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#84CC16] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAFDF7] p-3 text-center border-t border-[#E2ECE0] text-xs text-[#5D7163]">
          Need an on-site evaluation? Call <strong className="text-[#16572E]">(647) 702-5682</strong>
        </div>

      </div>
    </div>
  );
}
