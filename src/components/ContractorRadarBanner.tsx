/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { Briefcase, ArrowRight, MapPin, Compass, CheckCircle2, SlidersHorizontal } from 'lucide-react';

interface ContractorRadarBannerProps {
  t: TranslationDictionary;
  onStartCollaboration: () => void;
  onExploreRadar: () => void;
}

export const ContractorRadarBanner: React.FC<ContractorRadarBannerProps> = ({
  onStartCollaboration,
  onExploreRadar
}) => {
  const [selectedPin, setSelectedPin] = useState<number>(1);
  const [activeRadius, setActiveRadius] = useState<number>(25);

  const pins = [
    {
      id: 1,
      top: '52%',
      left: '68%',
      number: 3,
      category: 'Garden',
      title: 'Lawn care & hedge trimming',
      distance: '2.4 km',
      bids: '3 bids',
      timeLeft: 'closes in 2d',
      priceGuide: '€180 - €320'
    },
    {
      id: 2,
      top: '68%',
      left: '42%',
      number: 2,
      category: 'Cleaning',
      title: 'Window cleaning & facade wash',
      distance: '4.8 km',
      bids: '4 bids',
      timeLeft: 'closes in 1d 6h',
      priceGuide: '€220 - €350'
    },
    {
      id: 3,
      top: '32%',
      left: '34%',
      number: 5,
      category: 'Trades',
      title: 'Bathroom tap & radiator service',
      distance: '7.1 km',
      bids: '2 bids',
      timeLeft: 'closes in 3d',
      priceGuide: '€160 - €280'
    }
  ];

  const currentJob = pins.find(p => p.id === selectedPin) || pins[0];

  return (
    <section className="py-12 sm:py-16 bg-[#F4F7F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container matching image1_1ef90fcf.png */}
        <div className="rounded-3xl bg-[#0C2229] text-white overflow-hidden shadow-xl border border-[#0C2229]/50 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8 z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#65C8A6] uppercase tracking-wider block">
                For service providers
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Jobs that fit your skills, inside your radius.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                No listings to chase. We send you jobs by service and distance, and you bid in under a minute.
              </p>

              {/* Perks Checklist */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#65C8A6] shrink-0" />
                  <span>Choose your operating radius from 5 km to 100 km</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#65C8A6] shrink-0" />
                  <span>Only pay when you get hired — 0% launch fee for 3 months</span>
                </div>
              </div>
            </div>

            {/* CTAs matching image1_1ef90fcf.png */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onStartCollaboration}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#65C8A6] hover:bg-[#52B895] text-[#0C2229] font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Briefcase className="w-4 h-4" />
                <span>Start a Collaboration</span>
              </button>

              <button
                type="button"
                onClick={onExploreRadar}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700 transition-all"
              >
                <span>How bidding works</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Radar Map Graphic */}
          <div className="lg:col-span-6 bg-[#E7EFEF] relative min-h-[360px] sm:min-h-[420px] flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-[#1F3A42]">
            
            {/* Radius toggle controls in top-right */}
            <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-xs border border-[#D5EBE7] flex items-center gap-1.5 text-xs">
              <Compass className="w-3.5 h-3.5 text-[#077E88]" />
              <span className="text-[#0C2229] font-bold">{activeRadius} km radius</span>
              <button
                onClick={() => setActiveRadius(prev => prev === 25 ? 50 : 25)}
                className="text-[10px] text-[#077E88] font-semibold underline ml-1"
              >
                switch
              </button>
            </div>

            {/* Stylized Map Roads & Canvas */}
            <div className="absolute inset-0 bg-[#E8F0EF]">
              {/* Roads */}
              <div className="absolute inset-0 opacity-40">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-50,120 Q200,80 450,220 T900,180" stroke="#CBDDD9" strokeWidth="24" fill="none" />
                  <path d="M80,-30 Q140,250 280,450" stroke="#CBDDD9" strokeWidth="18" fill="none" />
                  <path d="M380,-30 Q310,220 520,450" stroke="#CBDDD9" strokeWidth="16" fill="none" />
                  <path d="M-20,320 L700,280" stroke="#CBDDD9" strokeWidth="12" fill="none" />
                  <path d="M-50,220 Q300,180 600,340" stroke="#A9D4CD" strokeWidth="36" fill="none" />
                </svg>
              </div>

              {/* Concentric Radar Circles with Live Pulse Waves */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border-2 border-dashed border-[#077E88]/30 animate-pulse-glow pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-dashed border-[#077E88]/40 pointer-events-none" />
              
              {/* Animated Radar Sweep Beam Scanner */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full overflow-hidden pointer-events-none">
                <div 
                  className="w-full h-full animate-radar-sweep origin-center"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(7, 126, 136, 0.28) 0deg, rgba(7, 126, 136, 0.05) 45deg, transparent 90deg, transparent 360deg)'
                  }}
                />
              </div>

              {/* Center Radar Transmitter Beacon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#077E88] shadow-md border-2 border-white ring-4 ring-[#077E88]/20 animate-ping opacity-75" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#077E88] shadow-md border-2 border-white ring-4 ring-[#077E88]/20" />
            </div>

            {/* Map Pins matching Figma image1_1ef90fcf.png */}
            {pins.map((pin) => (
              <motion.button
                key={pin.id}
                type="button"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedPin(pin.id)}
                style={{ top: pin.top, left: pin.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-md transition-all cursor-pointer ${
                  selectedPin === pin.id
                    ? 'bg-[#077E88] text-white scale-110 ring-4 ring-[#077E88]/30 shadow-lg'
                    : 'bg-[#0C2229] text-white hover:bg-[#077E88]'
                }`}
                title={`${pin.title} (${pin.distance})`}
              >
                <span>{pin.number}</span>
              </motion.button>
            ))}

            {/* Floating Job Card on Radar with Smooth Spring Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentJob.id}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                className="absolute bottom-6 right-6 z-20 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#D5EBE7] max-w-xs"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E7F6F8] text-[#077E88] font-bold text-[11px]">
                    {currentJob.category}
                  </span>
                  <span className="text-[#76898E] font-medium text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#077E88]" />
                    <span>{currentJob.distance}</span>
                  </span>
                </div>

                <h4 className="font-display font-bold text-sm text-[#0C2229] line-clamp-1 mb-1">
                  {currentJob.title}
                </h4>

                <div className="flex items-center justify-between text-xs text-[#5E7379] pt-2 border-t border-[#E4EAE9]/80 mt-2">
                  <span>{currentJob.bids} · {currentJob.timeLeft}</span>
                  <button
                    type="button"
                    onClick={onStartCollaboration}
                    className="font-bold text-[#077E88] hover:text-[#05626A] flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View & bid</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
