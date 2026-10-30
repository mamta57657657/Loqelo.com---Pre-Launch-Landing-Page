/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { ArrowRight } from 'lucide-react';
import { handleImageError, getAssetUrl } from '../utils/assets.ts';

interface HowItWorksProps {
  t: TranslationDictionary;
  onPostJobClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ t, onPostJobClick }) => {
  const steps = [
    {
      num: '01',
      title: 'Describe your need',
      desc: 'One sentence, in your own words. Add photos if it helps.',
      iconSvg: '/assets/aistudio/loqelo-edit_2ac1a2a5.svg',
    },
    {
      num: '02',
      title: 'We find the services',
      desc: 'Loqelo recognises what the job needs and tells matching pros nearby.',
      iconSvg: '/assets/aistudio/loqelo-icon_7d21a8b9.svg',
    },
    {
      num: '03',
      title: 'Receive offers',
      desc: 'Local pros review your request and send you their price and timing.',
      iconSvg: '/assets/aistudio/loqelo-euro_282e5473.svg',
    },
    {
      num: '04',
      title: 'Choose your pro',
      desc: 'Compare price, timing and reviews, then pick the one that fits.',
      iconSvg: '/assets/aistudio/loqelo-check_ac3c84dd.svg',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F4F7F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Figma 01 Home.png */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-16 sm:mb-20"
        >
          <p className="text-xs font-bold text-[#077E88] tracking-widest uppercase bg-[#E7F6F8] inline-block px-3.5 py-1.5 rounded-full border border-[#077E88]/15">
            HOW LOQELO WORKS
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0C2229]">
            From one sentence to the right pro.
          </h2>
          <p className="text-sm sm:text-base text-[#5E7379] max-w-xl mx-auto">
            One simple flow, from describing your need to choosing who does it.
          </p>
        </motion.div>

        {/* 4 Steps Horizontal Pipeline matching Figma 01 Home.png */}
        <div className="relative">
          
          {/* Subtle connecting dashed line on desktop */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] border-t-2 border-dashed border-[#B8D8D5] -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center text-center space-y-4 group cursor-pointer"
              >
                {/* Circular Badge with Step Number Tag */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border border-[#D5EBE7] shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 group-hover:border-[#077E88] group-hover:shadow-lg">
                    <img
                      src={getAssetUrl(step.iconSvg)}
                      alt={step.title}
                      onError={handleImageError}
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 object-contain text-[#077E88]"
                    />
                  </div>

                  {/* Step number badge on top-right of circle */}
                  <div className="absolute top-0 right-0 w-7 h-7 rounded-full bg-[#077E88] text-white text-[11px] font-bold flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                </div>

                {/* Step Title & Description */}
                <div className="space-y-1.5 max-w-xs px-2">
                  <h3 className="font-display font-bold text-lg text-[#0C2229] group-hover:text-[#077E88] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E7379] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Try Button */}
        <div className="mt-14 sm:mt-16 text-center">
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPostJobClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-sm font-semibold tracking-tight shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Try the 2-minute request preview</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
};
