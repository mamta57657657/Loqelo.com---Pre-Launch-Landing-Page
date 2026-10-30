/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { handleImageError, getAssetUrl } from '../utils/assets.ts';

interface DualAudienceCardsProps {
  t: TranslationDictionary;
  onSelectRole: (role: 'customer' | 'contractor') => void;
}

export const DualAudienceCards: React.FC<DualAudienceCardsProps> = ({ t, onSelectRole }) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#E4EAE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <span className="text-xs font-bold text-[#077E88] uppercase tracking-wider bg-[#E7F6F8] px-3.5 py-1.5 rounded-full border border-[#077E88]/15">
            Two Sides · One Transparent Ecosystem
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0C2229] tracking-tight">
            Designed for both sides of the job
          </h2>
          <p className="text-sm sm:text-base text-[#5E7379]">
            Whether you need a job done in your home or you run a professional trade business, Loqelo gives you speed, clarity, and control.
          </p>
        </motion.div>

        {/* 2-Card Grid matching Figma 01 Home.png exactly */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: For Customers */}
          <motion.div
            id="for-customers"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl bg-[#EFF7F6] border border-[#D5EBE7] p-8 sm:p-10 shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Background decorative concentric mint rings with subtle pulse */}
            <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full border border-[#077E88]/15 animate-pulse-glow pointer-events-none" />
            <div className="absolute -right-4 -bottom-4 w-64 h-64 rounded-full border border-[#077E88]/20 pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
              {/* Text content */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-bold text-[#077E88] uppercase tracking-wider block">
                  {t.dualAudience.customerCard.kicker}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0C2229] leading-tight">
                  {t.dualAudience.customerCard.title}
                </h3>
                <p className="text-sm text-[#3D5259] leading-relaxed">
                  {t.dualAudience.customerCard.desc}
                </p>

                {/* Benefits */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-[#3D5259]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E9A77] shrink-0" />
                    <span>{t.dualAudience.customerCard.bullet1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#3D5259]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E9A77] shrink-0" />
                    <span>{t.dualAudience.customerCard.bullet2}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectRole('customer')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-sm font-semibold tracking-tight shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>{t.dualAudience.customerCard.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Circular Cutout Photo matching Figma */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-md border-4 border-white shrink-0 group">
                  <img
                    src={getAssetUrl('/assets/aistudio/cust_92398b91.jpg')}
                    alt="Customer organizing services on laptop from home"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C2229]/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: For Contractors */}
          <motion.div
            id="for-contractors"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl bg-[#EFF5F7] border border-[#D5E5EB] p-8 sm:p-10 shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Background decorative concentric mint rings */}
            <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full border border-[#0C2229]/5 animate-pulse-glow pointer-events-none" />
            <div className="absolute -right-4 -bottom-4 w-64 h-64 rounded-full border border-[#0C2229]/10 pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
              {/* Text content */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-bold text-[#077E88] uppercase tracking-wider block">
                  {t.dualAudience.contractorCard.kicker}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0C2229] leading-tight">
                  {t.dualAudience.contractorCard.title}
                </h3>
                <p className="text-sm text-[#3D5259] leading-relaxed">
                  {t.dualAudience.contractorCard.desc}
                </p>

                {/* Benefits */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-[#3D5259]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E9A77] shrink-0" />
                    <span>{t.dualAudience.contractorCard.bullet1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#3D5259]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E9A77] shrink-0" />
                    <span>{t.dualAudience.contractorCard.bullet2}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectRole('contractor')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C2229] hover:bg-[#031C26] text-white text-sm font-semibold tracking-tight shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>{t.dualAudience.contractorCard.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Circular Cutout Photo matching Figma */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-md border-4 border-white shrink-0 group">
                  <img
                    src={getAssetUrl('/assets/aistudio/pro_c3584a76.jpg')}
                    alt="Professional technician with testing equipment"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C2229]/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
