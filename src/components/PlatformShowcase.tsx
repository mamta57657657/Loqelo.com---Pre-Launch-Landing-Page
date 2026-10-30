/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { Eye, ExternalLink, X, ZoomIn, CheckCircle2, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { handleImageError, getAssetUrl } from '../utils/assets.ts';

interface PlatformShowcaseProps {
  t: TranslationDictionary;
}

interface ScreenItem {
  id: string;
  category: 'client' | 'contractor' | 'mobile';
  tabLabel: string;
  screenNumber: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  badge: string;
  highlights: string[];
  isMobile?: boolean;
}

export const PlatformShowcase: React.FC<PlatformShowcaseProps> = ({ t }) => {
  const [activeTab, setActiveTab] = useState<string>('job_details');
  const [filterCategory, setFilterCategory] = useState<'all' | 'client' | 'contractor' | 'mobile'>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const screens: ScreenItem[] = [
    {
      id: 'job_details',
      category: 'client',
      screenNumber: '04',
      tabLabel: '04 Quote Comparison',
      title: 'Compare transparent price spreads & ratings',
      subtitle: 'See all received bids on a visual price spectrum (lowest, average, highest). Review verified completed jobs, completion speed, and contractor messages without phone spam.',
      imageSrc: '/assets/aistudio/04_Job_details___quotes_d468b4c3.png',
      badge: 'Client Feature · Screen 04',
      highlights: [
        'Visual price spread bar (e.g. €295 lowest to €410 highest)',
        'Detailed provider metrics: 4.9 rating, 126 jobs done, 97% completion rate',
        'Direct public Q&A without sharing private telephone numbers',
        'Sort by: Best match, Price, Fastest, or Highest rated',
      ],
    },
    {
      id: 'home',
      category: 'client',
      screenNumber: '01',
      tabLabel: '01 Smart Search',
      title: 'Natural language search & service recognition',
      subtitle: 'Users describe tasks in normal sentences. Loqelo’s AI engine automatically tags services (cleaning, window washing, car wash) and identifies category tags.',
      imageSrc: '/assets/aistudio/01_Home_d6b1243b.png',
      badge: 'Client Feature · Screen 01',
      highlights: [
        'Speak or type in any European language (multilingual AI recognition)',
        'Instant multi-service recognition chips with one-click adjustments',
        '8 core categories: Home, Garden, Construction, Installations, Pets, Vehicles, Personal, Moving',
        'Zero registration barrier to start typing and discovering quotes',
      ],
    },
    {
      id: 'post_flow',
      category: 'client',
      screenNumber: '02',
      tabLabel: '02 Post a Job',
      title: '2-minute request submission flow',
      subtitle: 'Simple step-by-step form with media attachments, postal area specification, and date flexibility (exact day, ±2 days, anytime).',
      imageSrc: '/assets/aistudio/02_Post_a_job_4944fdf6.png',
      badge: 'Client Feature · Screen 02',
      highlights: [
        'Photo, video, and floor plan PDF upload preview',
        'Privacy protection: address only revealed after hiring',
        'Live summary preview card on right side updating in real-time',
        'Immediate broadcast notification to 30+ local providers',
      ],
    },
    {
      id: 'job_posted',
      category: 'client',
      screenNumber: '02b',
      tabLabel: '02b Job Posted',
      title: 'Broadcast confirmation & instant matching',
      subtitle: 'Confirmation modal showing how many matching local providers have received your job notification in Amsterdam, with direct links to view incoming quotes.',
      imageSrc: '/assets/aistudio/02b_Job_posted_81f05b8e.png',
      badge: 'Client Feature · Screen 02b',
      highlights: [
        '34 matching verified providers notified within minutes',
        'Instant link to view live job overview or post additional tasks',
        'Zero spam guarantee: client contact details stay strictly confidential',
        'SMS/Email notification alerts when new bids arrive',
      ],
    },
    {
      id: 'client_dashboard',
      category: 'client',
      screenNumber: '03',
      tabLabel: '03 Client Dashboard',
      title: 'Central job command center & active requests',
      subtitle: 'Track active, completed, and in-progress jobs with real-time notifications when new quotes or questions arrive from pros.',
      imageSrc: '/assets/aistudio/03_Client_panel_33c4618e.png',
      badge: 'Client Feature · Screen 03',
      highlights: [
        'Track multiple jobs: Cleaning, Lawn care, Tap repair, Moving',
        'Real-time activity feed with quote alerts and new messages',
        'Status pills: "Bids received", "Waiting for bids", "Contractor selected", "In progress"',
        'One-click detail view and provider communication',
      ],
    },
    {
      id: 'contractor_radar',
      category: 'contractor',
      screenNumber: '05',
      tabLabel: '05 Contractor Radar Map',
      title: 'Interactive job radius & €6,420 earning potential',
      subtitle: 'Service providers view incoming jobs on an interactive map matching their designated trade skills and geographical kilometer radius.',
      imageSrc: '/assets/aistudio/05_Contractor_panel_5996a4f2.png',
      badge: 'Contractor Feature · Screen 05',
      highlights: [
        'Customizable radius filter (10, 25, 50, 100 km of Amstelveen)',
        'Earning potential counter (€6,420 in 12 open jobs matching you)',
        'Interactive map pins with job previews and countdown timer',
        'Switch between list view and aerial map view',
      ],
    },
    {
      id: 'contractor_bid',
      category: 'contractor',
      screenNumber: '06',
      tabLabel: '06 1-Minute Bidding',
      title: 'Fast, competitive contractor offer submission',
      subtitle: 'Contractors send clear fixed-price proposals in under a minute with starting date, completion timeframe, and included services.',
      imageSrc: '/assets/aistudio/06_Contractor_job___bid_5a63f884.png',
      badge: 'Contractor Feature · Screen 06',
      highlights: [
        'Price comparison guidance (e.g. similar jobs nearby: €180–€320)',
        'Pre-configured tags: Green waste removal, Own equipment, Insured',
        'Direct personal message to customer',
        'Live competition benchmark (lowest €190, average €245, your rank #2)',
      ],
    },
    {
      id: 'mobile_home',
      category: 'mobile',
      screenNumber: 'M1',
      tabLabel: 'M1 Mobile App Home',
      title: 'Mobile-first design for on-the-go homeowners',
      subtitle: 'Ultra-fast mobile UI featuring natural language search, parsed service chips (Cleaning, Window cleaning, Car washing), and 8 quick category icons.',
      imageSrc: '/assets/aistudio/01_Home_d6b1243b.png',
      badge: 'Mobile App · Screen M1',
      highlights: [
        'One-thumb natural language job description input',
        'Instant multi-service recognition chips with quick remove',
        'Full-width primary action button for maximum conversion',
        '8 rounded touch-friendly service category icons',
      ],
      isMobile: true,
    },
  ];

  const currentScreen = screens.find((s) => s.id === activeTab) || screens[0];

  return (
    <section id="platform-preview" className="py-16 sm:py-24 bg-white border-b border-[#E4EAE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <p className="text-xs font-bold text-[#077E88] tracking-widest uppercase">
            {t.screenshotsSection.kicker}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0C2229]">
            {t.screenshotsSection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#3D5259]">
            {t.screenshotsSection.subtitle}
          </p>
        </div>

        {/* Category Journey Filters */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filterCategory === 'all'
                ? 'bg-[#0C2229] text-white shadow-2xs'
                : 'bg-white text-[#76898E] hover:text-[#0C2229] border border-[#E4EAE9]'
            }`}
          >
            All Screens ({screens.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('client');
              setActiveTab('home');
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filterCategory === 'client'
                ? 'bg-[#077E88] text-white shadow-2xs'
                : 'bg-white text-[#76898E] hover:text-[#077E88] border border-[#E4EAE9]'
            }`}
          >
            Client Experience (4)
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('contractor');
              setActiveTab('contractor_radar');
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filterCategory === 'contractor'
                ? 'bg-[#077E88] text-white shadow-2xs'
                : 'bg-white text-[#76898E] hover:text-[#077E88] border border-[#E4EAE9]'
            }`}
          >
            Contractor Radar & Bids (2)
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('mobile');
              setActiveTab('mobile_home');
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filterCategory === 'mobile'
                ? 'bg-[#077E88] text-white shadow-2xs'
                : 'bg-white text-[#76898E] hover:text-[#077E88] border border-[#E4EAE9]'
            }`}
          >
            Mobile UI (M1)
          </button>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {screens
            .filter((s) => filterCategory === 'all' || s.category === filterCategory)
            .map((screen) => {
              const isActive = activeTab === screen.id;
              return (
                <motion.button
                  key={screen.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveTab(screen.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#077E88] text-white shadow-md'
                      : 'bg-[#F4F7F6] text-[#3D5259] hover:text-[#0C2229] hover:bg-[#E7F3F3]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${isActive ? 'bg-white/20 text-white' : 'bg-[#E4EAE9] text-[#76898E]'}`}>
                    {screen.screenNumber}
                  </span>
                  <span>{screen.tabLabel}</span>
                </motion.button>
              );
            })}
        </div>

        {/* Main Showcase Stage */}
        <div className="bg-[#F4F7F6] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E4EAE9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
            
            {/* Left: Explanatory Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#077E88] border border-[#E4EAE9]">
                  {currentScreen.badge}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0C2229] leading-tight">
                  {currentScreen.title}
                </h3>
                <p className="text-sm text-[#3D5259] leading-relaxed">
                  {currentScreen.subtitle}
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold text-[#0C2229] uppercase tracking-wider">
                  Key UX Features:
                </p>
                {currentScreen.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3D5259]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E9A77] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Zoom & Inspect Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setLightboxImage(currentScreen.imageSrc)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0C2229] border border-[#E4EAE9] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all"
                >
                  <ZoomIn className="w-4 h-4 text-[#077E88]" />
                  <span>Click to view full-resolution screen</span>
                </button>
              </div>
            </div>

            {/* Right: Screenshot Mockup Container */}
            <div className="lg:col-span-7">
              {currentScreen.isMobile ? (
                /* Mobile Phone Bezel Mockup matching Figma M1 Mobile Home */
                <div className="flex justify-center py-2">
                  <div className="w-[320px] sm:w-[350px] bg-black p-3 rounded-[44px] shadow-2xl border-4 border-slate-700/80 ring-1 ring-white/10">
                    <div className="relative bg-white rounded-[36px] overflow-hidden p-4 pt-3 flex flex-col space-y-4">
                      {/* Status bar */}
                      <div className="flex items-center justify-between text-xs font-bold text-[#0C2229] px-2 pt-1">
                        <span>9:41</span>
                        <div className="w-20 h-4 bg-black rounded-full mx-auto" />
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span>5G</span>
                          <span className="w-4 h-2 rounded-xs border border-current inline-block relative after:content-[''] after:absolute after:inset-0.5 after:bg-current"></span>
                        </div>
                      </div>

                      {/* Mobile Header */}
                      <div className="flex items-center justify-between pt-1 px-1">
                        <div className="flex items-center gap-1.5">
                          <img src={getAssetUrl('/assets/aistudio/Loqelo_ICON_8b99d0e1.png')} alt="Loqelo" onError={handleImageError} className="w-6 h-6 object-contain" />
                          <span className="font-display font-bold text-base text-[#0C2229]">Loqelo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" className="p-1 rounded-full text-[#76898E]">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                          </button>
                          <span className="text-[11px] font-bold bg-[#0C2229] text-white px-3 py-1 rounded-full">Log In</span>
                        </div>
                      </div>

                      {/* Mobile Headline */}
                      <div className="px-1 pt-1">
                        <h4 className="font-display text-2xl font-black text-[#0C2229] leading-tight">
                          What do you need?<br />
                          <span className="text-[#077E88]">Describe it.</span>
                        </h4>
                      </div>

                      {/* Mobile Search Card */}
                      <div className="bg-[#FAFBFB] rounded-2xl p-3.5 border border-[#E4EAE9] space-y-3">
                        <span className="text-[11px] font-bold text-[#76898E] block">What do you need?</span>
                        <div className="text-xs text-[#0C2229] leading-relaxed">
                          I need to <span className="bg-[#D1F2EB] text-[#0E6251] px-1 py-0.5 rounded font-medium">clean my house</span>, <span className="bg-[#D4E6F1] text-[#1B4F72] px-1 py-0.5 rounded font-medium">wash my windows</span>, and <span className="bg-[#FADBD8] text-[#78281F] px-1 py-0.5 rounded font-medium">wash my car</span>.
                        </div>

                        <div className="pt-2 border-t border-[#E4EAE9] space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-[#077E88] font-bold">
                            <span>✓ We found 3 services</span>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="inline-flex items-center justify-between px-2.5 py-1 rounded-full bg-[#E8F8F5] text-[#0E6251] text-[11px] font-medium border border-[#A3E4D7]">
                              <span>🏠 Cleaning</span>
                              <span>✕</span>
                            </span>
                            <span className="inline-flex items-center justify-between px-2.5 py-1 rounded-full bg-[#EBF5FB] text-[#1B4F72] text-[11px] font-medium border border-[#AED6F1]">
                              <span>🪟 Window cleaning</span>
                              <span>✕</span>
                            </span>
                            <span className="inline-flex items-center justify-between px-2.5 py-1 rounded-full bg-[#FDEDEC] text-[#78281F] text-[11px] font-medium border border-[#F5B7B1]">
                              <span>🚗 Car washing</span>
                              <span>✕</span>
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="w-full py-2.5 rounded-full bg-[#077E88] text-white font-bold text-xs shadow-xs text-center flex items-center justify-center gap-1.5"
                        >
                          <span>Get quotes</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Browse categories */}
                      <div className="px-1 pt-1 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-[#0C2229]">
                          <span>Browse categories</span>
                          <span className="text-[#077E88] text-[11px]">All</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] text-[#0C2229] font-medium">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-xs">🏠</div>
                            <span>Home</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-xs">🌱</div>
                            <span>Garden</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-xs">👷</div>
                            <span>Build</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-xs">🔧</div>
                            <span>Install</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-xs">🐾</div>
                            <span>Pets</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-xs">🚗</div>
                            <span>Vehicles</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-xs">🤝</div>
                            <span>Personal</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-xs">🚚</div>
                            <span>Moving</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setLightboxImage(currentScreen.imageSrc)}
                  className="group relative rounded-2xl overflow-hidden bg-white shadow-xl border border-[#E4EAE9] cursor-zoom-in transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Browser-style Top Bar */}
                  <div className="bg-[#E7F3F3]/60 px-4 py-2.5 border-b border-[#E4EAE9] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    </div>
                    <span className="text-[11px] font-mono text-[#76898E]">
                      app.loqelo.com/{currentScreen.id}
                    </span>
                    <Eye className="w-3.5 h-3.5 text-[#76898E] group-hover:text-[#077E88] transition-colors" />
                  </div>

                  {/* Screenshot Image */}
                  <div className="max-h-[500px] overflow-hidden bg-white">
                    <img
                      src={getAssetUrl(currentScreen.imageSrc)}
                      alt={currentScreen.title}
                      onError={handleImageError}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>

                  {/* Hover Click-to-Zoom badge */}
                  <div className="absolute inset-0 bg-[#0C2229]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="px-4 py-2 rounded-full bg-white text-[#0C2229] text-xs font-bold shadow-lg flex items-center gap-2">
                      <ZoomIn className="w-4 h-4 text-[#077E88]" />
                      <span>View Fullscreen</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#0C2229] text-white px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-mono">Loqelo High-Resolution Design Asset</span>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-auto p-2 bg-[#F4F7F6]">
                <img
                  src={getAssetUrl(lightboxImage)}
                  alt="Enlarged screenshot"
                  onError={handleImageError}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
