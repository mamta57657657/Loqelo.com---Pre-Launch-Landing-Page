/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { Sparkles, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { LoqeloLogo } from './LoqeloLogo.tsx';

interface FooterProps {
  t: TranslationDictionary;
  onOpenManual: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onOpenManual, onOpenAdmin }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C2229] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Loqelo return to top" className="inline-block transition-transform hover:opacity-95">
                <LoqeloLogo
                  height="2.1rem"
                  themeMode="dark"
                  className="text-white"
                />
              </a>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-[#65C8A6]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Target Launch: February 2027</span>
            </div>
          </div>

          {/* Nav links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Platform & Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">
                  {t.nav.howItWorks}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('video-demo')} className="hover:text-white transition-colors">
                  {t.nav.videoDemo}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('platform-preview')} className="hover:text-white transition-colors">
                  {t.nav.screenshots}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('for-customers')} className="hover:text-white transition-colors">
                  {t.nav.forCustomers}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('for-contractors')} className="hover:text-white transition-colors">
                  {t.nav.forPros}
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Resources Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Project Handover & Governance
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={onOpenManual} className="hover:text-white text-[#65C8A6] font-semibold flex items-center gap-1.5">
                  <span>{t.footer.manual}</span>
                  <span>↗</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-white transition-colors">
                  Admin Lead Console & CSV Export
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('analytics-section')} className="hover:text-white transition-colors">
                  Real-time Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('waitlist-form')} className="hover:text-white transition-colors">
                  {t.nav.joinWaitlist}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            {t.footer.rights}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenManual} className="hover:text-white transition-colors">
              {t.footer.privacyPolicy}
            </button>
            <span>·</span>
            <button onClick={onOpenManual} className="hover:text-white transition-colors">
              {t.footer.terms}
            </button>
            <span>·</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">
              Back to top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
