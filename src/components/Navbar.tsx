/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TranslationDictionary } from '../utils/i18n.ts';
import { Globe, Menu, X, FileText, BarChart3, Palette } from 'lucide-react';
import { ThemePresetId } from '../utils/theme.ts';

import { LoqeloLogo } from './LoqeloLogo.tsx';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  onOpenManual: () => void;
  onOpenAdmin: () => void;
  totalSignups: number;
  onOpenStyles?: () => void;
  activeTheme?: ThemePresetId;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  t,
  onOpenManual,
  onOpenAdmin,
  totalSignups,
  onOpenStyles,
  activeTheme = 'figma-clean',
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F7F6]/90 backdrop-blur-md border-b border-[#E4EAE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand wordmark & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#077E88] rounded-lg transition-transform hover:opacity-95"
            aria-label="Loqelo - Return to top"
          >
            <LoqeloLogo
              height="2.2rem"
              themeMode={activeTheme === 'dark-stealth' ? 'dark' : 'light'}
              className={activeTheme === 'dark-stealth' ? 'text-white' : 'text-[#0C2229]'}
            />
          </a>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E7F3F3] text-[#05626A] border border-[#077E88]/20">
            Feb 2027
          </span>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean typography) */}
        <nav className="hidden xl:flex items-center gap-5 text-xs xl:text-sm font-medium text-[#3D5259]">
          <button
            onClick={() => scrollToSection('categories')}
            className="hover:text-[#0C2229] transition-colors whitespace-nowrap shrink-0"
          >
            Categories
          </button>
          <button
            onClick={() => scrollToSection('post-a-job')}
            className="hover:text-[#0C2229] transition-colors whitespace-nowrap shrink-0 font-semibold text-[#077E88]"
          >
            Post a job
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-[#0C2229] transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.howItWorks}
          </button>
          <button
            onClick={() => scrollToSection('video-demo')}
            className="hover:text-[#0C2229] transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.videoDemo}
          </button>
          <button
            onClick={() => scrollToSection('platform-preview')}
            className="hover:text-[#0C2229] transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.screenshots}
          </button>
          <button
            onClick={() => scrollToSection('for-customers')}
            className="hover:text-[#0C2229] transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.forCustomers}
          </button>
          <button
            onClick={() => scrollToSection('for-contractors')}
            className="hover:text-[#0C2229] transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.forPros}
          </button>
          <button
            onClick={() => scrollToSection('analytics-section')}
            className="hover:text-[#0C2229] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#077E88]" />
            <span>{t.nav.stats}</span>
            <span className="px-1.5 py-0.2 bg-[#077E88]/10 text-[#077E88] rounded-full text-[11px] font-semibold tabular-nums">
              {totalSignups}
            </span>
          </button>
        </nav>

        {/* Zone 3: Right Controls & Primary Action */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Website Styles & Themes Explorer Trigger */}
          {onOpenStyles && (
            <button
              onClick={onOpenStyles}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E7F6F8] hover:bg-[#D5EEF1] text-[#077E88] border border-[#077E88]/30 transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Explore Different Website Styles & Themes"
            >
              <Palette className="w-3.5 h-3.5 text-[#077E88]" />
              <span className="hidden sm:inline">Styles</span>
            </button>
          )}

          {/* User Manual & Handover Button */}
          <button
            onClick={onOpenManual}
            className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#3D5259] hover:text-[#0C2229] hover:bg-white rounded-full border border-transparent hover:border-[#E4EAE9] transition-all"
            title="Read Developer Handover & User Manual"
          >
            <FileText className="w-3.5 h-3.5 text-[#077E88]" />
            <span>{t.nav.handoverManual}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-slate-50 border border-[#E4EAE9] text-[#0C2229] transition-colors shadow-2xs"
              aria-label="Change language"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#76898E]" />
              <span className="uppercase font-semibold tracking-wider">{selectedLangObj.code}</span>
              <span className="text-[10px] text-[#76898E]">▼</span>
            </button>

            {isLangOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLangOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-[#E4EAE9] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#76898E] border-b border-[#E4EAE9]/60">
                    Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        lang.code === currentLang
                          ? 'bg-[#E7F3F3] text-[#05626A] font-medium'
                          : 'text-[#0C2229] hover:bg-[#F4F7F6]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      <span className="uppercase text-[10px] font-mono text-[#76898E]">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Primary Action Button: Pill-shaped as defined in Loqelo design system */}
          <button
            onClick={() => scrollToSection('waitlist-form')}
            className="hidden sm:inline-flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs sm:text-sm font-semibold tracking-tight shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-[0.98]"
          >
            {t.nav.joinWaitlist}
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#0C2229] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E4EAE9] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col gap-1 text-sm font-medium text-[#3D5259]">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F7F6] text-[#0C2229]"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => scrollToSection('video-demo')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F7F6] text-[#0C2229]"
            >
              {t.nav.videoDemo}
            </button>
            <button
              onClick={() => scrollToSection('platform-preview')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F7F6] text-[#0C2229]"
            >
              {t.nav.screenshots}
            </button>
            <button
              onClick={() => scrollToSection('for-customers')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F7F6] text-[#0C2229]"
            >
              {t.nav.forCustomers}
            </button>
            <button
              onClick={() => scrollToSection('for-contractors')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F7F6] text-[#0C2229]"
            >
              {t.nav.forPros}
            </button>
            <button
              onClick={() => scrollToSection('analytics-section')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F7F6] text-[#0C2229] flex items-center justify-between"
            >
              <span>{t.nav.stats}</span>
              <span className="px-2 py-0.5 bg-[#077E88]/10 text-[#077E88] rounded-full text-xs font-semibold tabular-nums">
                {totalSignups} leads
              </span>
            </button>
            {onOpenStyles && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStyles();
                }}
                className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F7F6] text-[#077E88] font-semibold flex items-center gap-2"
              >
                <Palette className="w-4 h-4" />
                <span>Explore Website Styles & Themes</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManual();
              }}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F7F6] text-[#077E88] font-semibold flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{t.nav.handoverManual}</span>
            </button>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('waitlist-form')}
                className="w-full py-3 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-sm font-bold tracking-tight shadow-md transition-all text-center"
              >
                {t.nav.joinWaitlist}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
