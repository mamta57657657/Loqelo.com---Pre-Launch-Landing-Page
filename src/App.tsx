/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Loqelo Pre-Launch Website (Planned Launch: February 2027)
 * "Everything your place needs"
 * Connecting customers with verified service providers for home, garden, and office.
 * Recreated with the rich visual identity, video player, Figma platform showcases,
 * dual waitlist signups, and the requested modern green & landscape aesthetic.
 */

import React, { useState, useEffect } from 'react';
import {
  SupportedLanguage,
  TRANSLATIONS,
  detectInitialLanguage,
} from './utils/i18n.ts';
import {
  UserRole,
  WaitlistSubmission,
  loadWaitlistEntries,
  saveWaitlistEntries,
  getAndIncrementVisitorCount,
  calculateWaitlistStats,
  SEED_WAITLIST_ENTRIES,
} from './utils/waitlist.ts';
import { calculateCountdown, CountdownState } from './utils/launch.ts';
import {
  ThemePresetId,
  HeroLayoutMode,
  CategoryCardStyle,
  THEME_PRESETS,
} from './utils/theme.ts';
import { Palette, Sparkles, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

// Loqelo Components
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { VideoSection } from './components/VideoSection.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { PlatformShowcase } from './components/PlatformShowcase.tsx';
import { CategoriesGrid } from './components/CategoriesGrid.tsx';
import { InteractivePostJobSection } from './components/InteractivePostJobSection.tsx';
import { LiveQuoteComparisonSection } from './components/LiveQuoteComparisonSection.tsx';
import { ContractorRadarBanner } from './components/ContractorRadarBanner.tsx';
import { DualAudienceCards } from './components/DualAudienceCards.tsx';
import { WaitlistSection } from './components/WaitlistSection.tsx';
import { AnalyticsSection } from './components/AnalyticsSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminConsoleModal } from './components/AdminConsoleModal.tsx';
import { UserManualModal } from './components/UserManualModal.tsx';
import { StyleSwitcherModal } from './components/StyleSwitcherModal.tsx';
import { CookieBanner } from './components/CookieBanner.tsx';
import { GrassSilhouetteDivider } from './components/GrassSilhouetteDivider.tsx';

export default function App() {
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [entries, setEntries] = useState<WaitlistSubmission[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(3480);
  const [activeRole, setActiveRole] = useState<UserRole>('customer');
  const [countdown, setCountdown] = useState<CountdownState>(calculateCountdown());
  const [selectedCategoryInterest, setSelectedCategoryInterest] = useState<string>('');

  // Styles & Themes Customization State - Defaulting to 'elite-green' (Reference Style)
  const [theme, setTheme] = useState<ThemePresetId>('elite-green');
  const [heroMode, setHeroMode] = useState<HeroLayoutMode>('cover-image');
  const [cardStyle, setCardStyle] = useState<CategoryCardStyle>('blend');
  const [isStylesOpen, setIsStylesOpen] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);

  // Initialize language, entries, theme, and visitor count
  useEffect(() => {
    const initialLang = detectInitialLanguage();
    setLang(initialLang);

    const loadedEntries = loadWaitlistEntries();
    setEntries(loadedEntries);

    const count = getAndIncrementVisitorCount();
    setVisitorCount(count);

    try {
      const savedTheme = localStorage.getItem('loqelo_theme') as ThemePresetId;
      if (savedTheme && THEME_PRESETS[savedTheme]) {
        setTheme(savedTheme);
      } else {
        setTheme('elite-green');
      }

      const savedHeroMode = localStorage.getItem('loqelo_hero_mode') as HeroLayoutMode;
      if (savedHeroMode && (savedHeroMode === 'cover-image' || savedHeroMode === 'studio' || savedHeroMode === 'video-spotlight' || savedHeroMode === 'minimal-split')) {
        setHeroMode(savedHeroMode);
      } else {
        setHeroMode('cover-image');
      }

      const savedCardStyle = localStorage.getItem('loqelo_card_style') as CategoryCardStyle;
      if (savedCardStyle) setCardStyle(savedCardStyle);
    } catch {}
  }, []);

  // Update countdown clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const stats = calculateWaitlistStats(entries, visitorCount);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    try {
      localStorage.setItem('loqelo_user_lang', newLang);
    } catch {}
  };

  const handleSelectTheme = (newTheme: ThemePresetId) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('loqelo_theme', newTheme);
    } catch {}
  };

  const handleSelectHeroMode = (mode: HeroLayoutMode) => {
    setHeroMode(mode);
    try {
      localStorage.setItem('loqelo_hero_mode', mode);
    } catch {}
  };

  const handleSelectCardStyle = (style: CategoryCardStyle) => {
    setCardStyle(style);
    try {
      localStorage.setItem('loqelo_card_style', style);
    } catch {}
  };

  const handleNewSubmission = (newEntry: WaitlistSubmission) => {
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveWaitlistEntries(updated);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveWaitlistEntries(updated);
  };

  const handleResetSeedData = () => {
    setEntries(SEED_WAITLIST_ENTRIES);
    saveWaitlistEntries(SEED_WAITLIST_ENTRIES);
  };

  const handleSelectRole = (role: UserRole) => {
    setActiveRole(role);
    const el = document.getElementById('waitlist-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName: string) => {
    if (categoryName.toLowerCase().includes('contractor')) {
      setActiveRole('contractor');
    }
    setSelectedCategoryInterest(categoryName);
    const el = document.getElementById('waitlist-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToWaitlist = () => {
    const el = document.getElementById('waitlist-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 theme-${theme} bg-[#FAFDF7] text-[#1C2A20]`}>
      
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#16572E] text-white/95 text-xs py-2 px-4 border-b border-white/10 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="font-['Oswald'] tracking-wider uppercase font-semibold text-[#A3E635]">
              LOQELO PRE-LAUNCH:
            </span>
            <span>
              Everything your place needs · Planned Launch February 2027 · Early Access Waitlist Open
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/80 shrink-0">
            <span className="font-semibold text-white">
              {entries.length + 3480} Potential Users & Pros Registered
            </span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <button
              onClick={() => setIsManualOpen(true)}
              className="text-[#A3E635] hover:underline hidden sm:inline cursor-pointer"
            >
              Contest Guide & User Manual
            </button>
          </div>
        </div>
      </div>

      {/* 2. Header / Navbar with Loqelo branding & i18n switcher */}
      <Navbar
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        t={t}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        totalSignups={entries.length}
        onOpenStyles={() => setIsStylesOpen(true)}
        activeTheme={theme}
      />

      {/* 2.5 Animated Live Marquee Activity Ticker */}
      <div className="bg-[#0F3E20] text-white py-2 overflow-hidden border-b border-white/10 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-medium">
          <span className="flex items-center gap-2 text-[#A3E635]">
            <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
            <span>⚡ LIVE RADAR ACTIVE: 48 Contractors Online in Amsterdam</span>
          </span>
          <span className="text-white/40">·</span>
          <span>🏡 14 New Tasks Posted in the last hour</span>
          <span className="text-white/40">·</span>
          <span className="text-[#65C8A6]">💰 0% Commission for Registered Contractors (First 3 Months)</span>
          <span className="text-white/40">·</span>
          <span>🛡️ Verified Identity & Liability Insurance Checked</span>
          <span className="text-white/40">·</span>
          <span className="text-[#A3E635]">🚀 Planned Official Launch: February 2027</span>
          <span className="text-white/40">·</span>
          <span>⭐ 4.9/5 Rating from 3,480+ Early Signups</span>
          <span className="text-white/40">·</span>
          {/* Duplicate for seamless infinite loop */}
          <span className="flex items-center gap-2 text-[#A3E635]">
            <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
            <span>⚡ LIVE RADAR ACTIVE: 48 Contractors Online in Amsterdam</span>
          </span>
          <span className="text-white/40">·</span>
          <span>🏡 14 New Tasks Posted in the last hour</span>
          <span className="text-white/40">·</span>
          <span className="text-[#65C8A6]">💰 0% Commission for Registered Contractors (First 3 Months)</span>
          <span className="text-white/40">·</span>
          <span>🛡️ Verified Identity & Liability Insurance Checked</span>
          <span className="text-white/40">·</span>
          <span className="text-[#A3E635]">🚀 Planned Official Launch: February 2027</span>
        </div>
      </div>

      {/* 3. Main Hero Section with Countdown & Selected Layout Mode */}
      <main className="flex-1">
        <Hero
          t={t}
          countdown={countdown}
          onSelectRole={handleSelectRole}
          onOpenWaitlist={handleScrollToWaitlist}
          heroMode={heroMode}
          activeTheme={theme}
        />

        {/* 4. Popular Service Categories with Chosen Card Presentation Style */}
        <CategoriesGrid
          t={t}
          onSelectCategory={handleSelectCategory}
          cardStyle={cardStyle}
        />

        {/* 5. Interactive "Post a job" Wizard from Figma Screen 02 */}
        <InteractivePostJobSection
          t={t}
          onScrollToWaitlist={handleScrollToWaitlist}
          onPostSuccess={(job) => {
            setSelectedCategoryInterest(job.category);
            handleScrollToWaitlist();
          }}
        />

        {/* 6. Promotional Video Section with Interactive Chapters */}
        <VideoSection t={t} />

        {/* Grass Silhouette Transition into How It Works */}
        <GrassSilhouetteDivider fillColor="#F4F7F6" height={48} />

        {/* 7. How Loqelo Works: 4-Step Process */}
        <HowItWorks t={t} onPostJobClick={handleScrollToWaitlist} />

        {/* 8. Platform UI Screenshots Showcase */}
        <PlatformShowcase t={t} />

        {/* 9. Live 5-Offers Quote Comparison & Interactive Q&A */}
        <LiveQuoteComparisonSection
          t={t}
          onPostJobClick={handleScrollToWaitlist}
        />

        {/* 10. Dual Audience Cards: For Customers & For Contractors */}
        <DualAudienceCards t={t} onSelectRole={handleSelectRole} />

        {/* 11. Jobs inside your radius radar banner for service providers */}
        <ContractorRadarBanner
          t={t}
          onStartCollaboration={() => handleSelectRole('contractor')}
          onExploreRadar={() => {
            const el = document.getElementById('platform-preview');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Grass Silhouette Transition into Waitlist Section */}
        <GrassSilhouetteDivider fillColor="#FAFDF7" height={48} />

        {/* 12. Dual Waitlist Sign-up Forms */}
        <WaitlistSection
          t={t}
          activeRole={activeRole}
          onRoleChange={setActiveRole}
          onNewSubmission={handleNewSubmission}
          totalSignups={entries.length}
          selectedCategoryInterest={selectedCategoryInterest}
          onClearCategoryInterest={() => setSelectedCategoryInterest('')}
        />

        {/* 13. Live Statistics, Conversion & CSV Export */}
        <AnalyticsSection
          t={t}
          stats={stats}
          entries={entries}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 14. Testimonials & Clarity Proof Section */}
        <TestimonialsSection t={t} onPostJobClick={handleScrollToWaitlist} />

        {/* Grass Silhouette Transition into Footer */}
        <GrassSilhouetteDivider fillColor="#0C2229" height={44} />
      </main>

      {/* 15. Footer */}
      <Footer
        t={t}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Theme & Style Switcher Action Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsStylesOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#16572E] hover:bg-[#0F3E20] text-white shadow-xl hover:shadow-2xl border border-white/20 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
          title="Open Website Style & Theme Explorer"
        >
          <Palette className="w-4 h-4 text-[#84CC16] group-hover:text-white transition-colors" />
          <span className="text-xs font-bold tracking-tight">Theme Styles</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono text-[#A3E635]">
            {THEME_PRESETS[theme].badge}
          </span>
        </button>
      </div>

      {/* Modals & Overlays */}
      <StyleSwitcherModal
        isOpen={isStylesOpen}
        onClose={() => setIsStylesOpen(false)}
        activeTheme={theme}
        onSelectTheme={handleSelectTheme}
        activeHeroMode={heroMode}
        onSelectHeroMode={handleSelectHeroMode}
        activeCardStyle={cardStyle}
        onSelectCardStyle={handleSelectCardStyle}
      />

      <AdminConsoleModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        entries={entries}
        onDeleteEntry={handleDeleteEntry}
        onResetSeedData={handleResetSeedData}
      />

      <UserManualModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
      />

      <CookieBanner />
    </div>
  );
}
