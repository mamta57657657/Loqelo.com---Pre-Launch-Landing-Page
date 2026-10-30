/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { CountdownState } from '../utils/launch.ts';
import { HeroLayoutMode, ThemePresetId } from '../utils/theme.ts';
import { 
  Sparkles, 
  MapPin, 
  Mic, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  UserCheck, 
  Briefcase,
  Camera,
  Plus,
  X,
  Layers,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';
import { handleImageError, getAssetUrl } from '../utils/assets.ts';

interface HeroProps {
  t: TranslationDictionary;
  countdown: CountdownState;
  onSelectRole: (role: 'customer' | 'contractor') => void;
  onOpenWaitlist: () => void;
  heroMode?: HeroLayoutMode;
  activeTheme?: ThemePresetId;
}

interface ShowcaseJob {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  proInitials: string;
  proName: string;
  rating: number;
  reviewsCount: number;
  queryText: string;
  tags: string[];
  iconEmoji: string;
  priceEstimate: string;
  turnaroundTime: string;
}

export const Hero: React.FC<HeroProps> = ({
  t,
  countdown,
  onSelectRole,
  onOpenWaitlist,
  heroMode = 'cover-image',
  activeTheme = 'elite-green',
}) => {
  // Showcase job profiles matching Figma 01_Home and real Pixabay licensed photography
  const showcaseJobs: ShowcaseJob[] = [
    {
      id: 'windows',
      title: 'Window cleaning',
      subtitle: '12 windows, both sides',
      category: 'Windows & Glass',
      image: '/assets/aistudio/windows_5cf1f912.jpg',
      proInitials: 'FN',
      proName: 'Fresh Nest Cleaning',
      rating: 5.0,
      reviewsCount: 214,
      queryText: 'I need to clean my house, wash my windows, and wash my car',
      tags: ['Cleaning', 'Window cleaning', 'Car washing'],
      iconEmoji: '🪟',
      priceEstimate: '€160 avg',
      turnaroundTime: 'Today · in 2 hrs',
    },
    {
      id: 'garden',
      title: 'Garden landscaping',
      subtitle: 'Hedge sculpting & 120m² lawn striping',
      category: 'Garden & Lawn',
      image: '/assets/aistudio/garden_14e81227.jpg',
      proInitials: 'GT',
      proName: 'GreenThumb Artisans',
      rating: 4.9,
      reviewsCount: 188,
      queryText: 'Lawn care & hedge trimming for back garden 120 m²',
      tags: ['Lawn care', 'Hedge trimming', 'Green waste removal'],
      iconEmoji: '🌿',
      priceEstimate: '€280 avg',
      turnaroundTime: 'Tomorrow morning',
    },
    {
      id: 'home',
      title: 'House deep clean',
      subtitle: '3-bedroom flat & kitchen sanitizing',
      category: 'Home & Living',
      image: '/assets/aistudio/living_1952c2b8.jpg',
      proInitials: 'PC',
      proName: 'PureClean Amsterdam',
      rating: 5.0,
      reviewsCount: 312,
      queryText: 'Full deep clean for 3-room flat including oven and baseboards',
      tags: ['Deep clean', 'Kitchen degreasing', 'Floor polish'],
      iconEmoji: '🧹',
      priceEstimate: '€195 avg',
      turnaroundTime: 'Sat 10:00 AM',
    },
    {
      id: 'car',
      title: 'Vehicle detailing',
      subtitle: 'Interior steam & ceramic wax coat',
      category: 'Vehicles & Auto',
      image: '/assets/aistudio/car_9b5332fd.jpg',
      proInitials: 'AD',
      proName: 'Apex Mobile Detailing',
      rating: 4.9,
      reviewsCount: 96,
      queryText: 'Complete mobile car wash with interior steam shampoo',
      tags: ['Car washing', 'Interior steam', 'Ceramic shine'],
      iconEmoji: '🚗',
      priceEstimate: '€140 avg',
      turnaroundTime: 'Mobile to your door',
    },
    {
      id: 'plumbing',
      title: 'Plumbing & taps',
      subtitle: 'Mixer tap repair & shower seal',
      category: 'Plumbing & Repairs',
      image: '/assets/aistudio/tap_548ce49d.jpg',
      proInitials: 'MF',
      proName: 'MasterFlow Plumbing',
      rating: 4.8,
      reviewsCount: 142,
      queryText: 'Fix dripping bathroom tap and reseal shower cabin',
      tags: ['Plumbing', 'Tap repair', 'Bathroom sealant'],
      iconEmoji: '🔧',
      priceEstimate: '€115 avg',
      turnaroundTime: 'Emergency or planned',
    },
    {
      id: 'moving',
      title: 'Moving & transport',
      subtitle: '2-room relocation with 2 helpers',
      category: 'Moving & Hauling',
      image: '/assets/aistudio/moving_6b536b0f.jpg',
      proInitials: 'SR',
      proName: 'SwiftRelocate B.V.',
      rating: 4.9,
      reviewsCount: 167,
      queryText: 'Move a 2-room flat to Utrecht with 2 helpers',
      tags: ['Moving & Transport', 'Van with tail-lift', 'Furniture packing'],
      iconEmoji: '🚚',
      priceEstimate: '€320 avg',
      turnaroundTime: 'Tail-lift van included',
    },
  ];

  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);
  const currentShowcase = showcaseJobs[activeShowcaseIdx];

  const [queryInput, setQueryInput] = useState(
    'I need to clean my house, wash my windows, and wash my car'
  );
  const [selectedCity, setSelectedCity] = useState('Amsterdam');
  const [recognizedTags, setRecognizedTags] = useState<string[]>([
    'Cleaning',
    'Window cleaning',
    'Car washing',
  ]);

  // Interactive attached photos drawer
  const [isPhotoDrawerOpen, setIsPhotoDrawerOpen] = useState(false);
  const [attachedPhotos, setAttachedPhotos] = useState<
    Array<{ id: string; label: string; url: string }>
  >([
    {
      id: 'p1',
      label: 'Facade & exterior',
      url: '/assets/aistudio/house_31508b24.jpg',
    },
    {
      id: 'p2',
      label: 'Upper bay windows',
      url: '/assets/aistudio/windows_5cf1f912.jpg',
    },
    {
      id: 'p3',
      label: 'Living room floor',
      url: '/assets/aistudio/living_1952c2b8.jpg',
    },
    {
      id: 'p4',
      label: 'Vehicle valeting space',
      url: '/assets/aistudio/car_9b5332fd.jpg',
    },
  ]);

  const handleSelectShowcase = (idx: number) => {
    setActiveShowcaseIdx(idx);
    const item = showcaseJobs[idx];
    setQueryInput(item.queryText);
    setRecognizedTags(item.tags);
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQueryInput(val);
    const lower = val.toLowerCase();
    const newTags: string[] = [];
    if (lower.includes('clean') || lower.includes('sprząt') || lower.includes('reinigen')) newTags.push('Cleaning');
    if (lower.includes('window') || lower.includes('okn') || lower.includes('fenster') || lower.includes('raam')) newTags.push('Window cleaning');
    if (lower.includes('car') || lower.includes('auto') || lower.includes('samochód')) newTags.push('Car washing');
    if (lower.includes('lawn') || lower.includes('garden') || lower.includes('trawnik') || lower.includes('garten') || lower.includes('tuin')) newTags.push('Garden & Lawn');
    if (lower.includes('tap') || lower.includes('leak') || lower.includes('kran') || lower.includes('plumb')) newTags.push('Plumbing');
    if (lower.includes('move') || lower.includes('przeprowadz') || lower.includes('umzug') || lower.includes('verhuiz')) newTags.push('Moving & Transport');
    
    setRecognizedTags(newTags.length > 0 ? newTags : ['General Home Service']);

    // Match showcase image if keywords match
    if (lower.includes('garden') || lower.includes('lawn')) setActiveShowcaseIdx(1);
    else if (lower.includes('window')) setActiveShowcaseIdx(0);
    else if (lower.includes('deep clean') || lower.includes('living')) setActiveShowcaseIdx(2);
    else if (lower.includes('car')) setActiveShowcaseIdx(3);
    else if (lower.includes('tap') || lower.includes('plumb')) setActiveShowcaseIdx(4);
    else if (lower.includes('move') || lower.includes('van')) setActiveShowcaseIdx(5);
  };

  const handleRemovePhoto = (id: string) => {
    setAttachedPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddSamplePhoto = () => {
    const samples = [
      { id: `p-${Date.now()}`, label: 'Back garden lawn', url: '/assets/aistudio/lawn_53235d3c.jpg' },
      { id: `p-${Date.now()}`, label: 'Hedge design', url: '/assets/aistudio/hedge_ce00d38c.jpg' },
      { id: `p-${Date.now()}`, label: 'Bathroom tap fixture', url: '/assets/aistudio/tap_548ce49d.jpg' },
      { id: `p-${Date.now()}`, label: 'Moving boxes packed', url: '/assets/aistudio/boxes_b6189e69.jpg' },
    ];
    const nextSample = samples[attachedPhotos.length % samples.length];
    setAttachedPhotos((prev) => [...prev, nextSample]);
  };

  const handleScrollToWaitlist = (role: 'customer' | 'contractor') => {
    onSelectRole(role);
    const form = document.getElementById('waitlist-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenWaitlist();
    }
  };

  // =========================================================================
  // COVER-IMAGE HERO: Full-bleed Animated Photographic Cover with Scrim
  // =========================================================================
  if (heroMode === 'cover-image') {
    return (
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden py-10 lg:py-16">
        {/* Full-bleed Photographic Cover Image Background with Motion Transition */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            key={currentShowcase.image}
            initial={{ opacity: 0.6, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            src={getAssetUrl(currentShowcase.image)}
            alt={currentShowcase.title}
            className="w-full h-full object-cover object-center"
            onError={handleImageError}
          />
          {/* Gradients to guarantee WCAG AA contrast and elegant scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/45 pointer-events-none" />
          <div className="absolute inset-0 bg-[#0F3E20]/25 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Floating Top Right Tag on Cover with Continuous Gentle Floating Animation */}
        <div className="hidden md:flex absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl py-2 px-4 shadow-xl border border-white/80 items-center gap-3 z-20 animate-float">
          <div className="w-8 h-8 rounded-xl bg-[#077E88]/10 text-[#077E88] flex items-center justify-center font-bold text-sm shrink-0">
            {currentShowcase.iconEmoji}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-[#0C2229] leading-tight">
              {currentShowcase.title}
            </p>
            <p className="text-[11px] text-[#76898E] font-medium leading-tight">
              {currentShowcase.subtitle}
            </p>
          </div>
        </div>

        {/* Floating Bottom Left Verified Pro Badge on Cover with Delayed Float Animation */}
        <div className="hidden lg:flex absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-white/80 items-center gap-3 z-20 max-w-xs text-left animate-float-delayed">
          <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
            {currentShowcase.proInitials}
          </div>
          <div className="min-w-0">
            <p className="text-[9px] text-[#76898E] font-medium uppercase tracking-wider">
              Verified local contractor
            </p>
            <p className="text-xs font-bold text-[#0C2229] flex items-center gap-1 truncate">
              <span>{currentShowcase.proName}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E9A77] shrink-0" />
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-[#76898E]">Job rating</span>
              <div className="flex text-amber-400 text-xs">
                {'★'.repeat(Math.round(currentShowcase.rating))}
              </div>
              <span className="text-xs font-bold text-[#0C2229]">
                {currentShowcase.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Container Overlaid on Cover with Motion Stagger */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Top Launch Pill + Countdown Glassmorphism Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-5 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A3E635]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                Planned Launch: Feb 2027
              </span>
            </div>

            <span className="text-white/30 hidden sm:inline">|</span>

            <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-white/95">
              <span>{countdown.months}m</span>:
              <span>{countdown.days}d</span>:
              <span>{String(countdown.hours).padStart(2, '0')}h</span>:
              <span>{String(countdown.minutes).padStart(2, '0')}m</span>:
              <span className="text-[#A3E635] font-bold">{String(countdown.seconds).padStart(2, '0')}s</span>
            </div>
          </motion.div>

          {/* Eyebrow Script Kicker */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl text-[#A3E635] tracking-wide mb-2 drop-shadow-md"
          >
            Everything your place needs
          </motion.p>

          {/* Condensed Impact Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-[1.04] mb-4 drop-shadow-xl text-balance"
          >
            WHAT DO YOU NEED? <br />
            <span className="text-[#A3E635] underline decoration-[#84CC16] decoration-4 underline-offset-8">
              DESCRIBE IT.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed mb-6 font-normal drop-shadow"
          >
            Write it in your own words. Loqelo identifies the services your home, garden, and office need and delivers verified quotes from rated local pros in minutes.
          </motion.p>

          {/* Customer & Contractor Social Proof Avatar Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs mb-6 shadow-md"
          >
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shadow-2xs"
                src={getAssetUrl('/assets/aistudio/cust_92398b91.jpg')}
                alt="Verified homeowner"
                onError={handleImageError}
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shadow-2xs"
                src={getAssetUrl('/assets/aistudio/pro_c3584a76.jpg')}
                alt="Certified pro contractor"
                onError={handleImageError}
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shadow-2xs"
                src={getAssetUrl('/assets/aistudio/windows_5cf1f912.jpg')}
                alt="Window specialist"
                onError={handleImageError}
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shadow-2xs"
                src={getAssetUrl('/assets/aistudio/garden_14e81227.jpg')}
                alt="Gardener"
                onError={handleImageError}
              />
            </div>
            <div className="flex items-center gap-1 font-semibold text-white">
              <div className="flex text-amber-300">
                {'★'.repeat(5)}
              </div>
              <span>4.9/5</span>
              <span className="text-white/70 font-normal">(3,480+ users & contractors registered)</span>
            </div>
          </motion.div>

          {/* Central Natural Language Search Box matching Figma 01_Home */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/90 w-full text-left text-[#0C2229] mb-6"
          >
            <div className="flex items-center justify-between text-xs text-[#76898E] mb-2">
              <span className="font-semibold text-[#0C2229]">What do you need?</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F4F7F6] text-[#76898E] font-medium text-[11px]">
                Any language · AI-assisted recognition
              </span>
            </div>

            {/* Natural language input */}
            <div className="relative rounded-2xl border-2 border-[#16572E]/30 focus-within:border-[#16572E] focus-within:ring-2 focus-within:ring-[#16572E]/10 bg-[#FAFCFB] p-3 transition-all mb-3">
              <input
                type="text"
                value={queryInput}
                onChange={handleCustomInput}
                className="w-full text-sm sm:text-base text-[#0C2229] placeholder:text-[#76898E] bg-transparent focus:outline-hidden font-normal"
                placeholder={t.hero.queryPlaceholder}
              />

              {/* Visual phrase highlight hints */}
              {queryInput === 'I need to clean my house, wash my windows, and wash my car' && (
                <div className="mt-2 pt-2 border-t border-[#EEF3F2] flex flex-wrap items-center gap-1.5 text-xs text-[#5E7379]">
                  <span className="text-[11px] text-[#76898E]">Identified:</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#D1F2EB] text-[#0E6251] font-medium">clean my house</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#D4E6F1] text-[#1B4F72] font-medium">wash my windows</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#FADBD8] text-[#78281F] font-medium">wash my car</span>
                </div>
              )}
            </div>

            {/* Controls: Photos attached, Speak, City & Preview Quotes Button */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-0.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#3D5259]">
                <button
                  type="button"
                  onClick={() => setIsPhotoDrawerOpen(!isPhotoDrawerOpen)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all font-medium text-xs cursor-pointer ${
                    isPhotoDrawerOpen
                      ? 'border-[#16572E] bg-[#F2F7EE] text-[#16572E] font-semibold'
                      : 'border-[#DCE4E3] hover:bg-[#F4F7F6] text-[#0C2229]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-[#16572E]" />
                  <span>{isPhotoDrawerOpen ? 'Hide attached photos' : `Photos attached (${attachedPhotos.length})`}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setQueryInput('Lawn care & hedge trimming for back garden 120 m²');
                    setRecognizedTags(['Lawn care', 'Hedge trimming', 'Green waste removal']);
                    setActiveShowcaseIdx(1);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#DCE4E3] hover:bg-[#F4F7F6] text-[#0C2229] transition-colors font-medium text-xs cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5 text-[#16572E]" />
                  <span>Speak</span>
                </button>

                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#DCE4E3] bg-white text-[#0C2229]">
                  <MapPin className="w-3.5 h-3.5 text-[#16572E]" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent text-xs font-semibold focus:outline-hidden cursor-pointer"
                  >
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Paris">Paris</option>
                    <option value="Madrid">Madrid</option>
                    <option value="Warsaw">Warsaw</option>
                    <option value="Brussels">Brussels</option>
                    <option value="London">London</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => handleScrollToWaitlist('customer')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#16572E] hover:bg-[#0F3E20] text-white text-xs sm:text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>{t.hero.getQuotesBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Attached Task Photos Drawer with AnimatePresence */}
            <AnimatePresence>
              {isPhotoDrawerOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 p-3 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] space-y-2 overflow-hidden"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0C2229] flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#16572E]" />
                      <span>Task photos attached to this request ({attachedPhotos.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAddSamplePhoto}
                      className="text-[11px] font-semibold text-[#16572E] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {attachedPhotos.map((photo) => (
                      <div key={photo.id} className="relative group rounded-xl overflow-hidden aspect-4/3 border border-[#DCE4E3] bg-slate-100 shadow-2xs">
                        <img
                          src={getAssetUrl(photo.url)}
                          alt={photo.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        <span className="absolute bottom-1 left-1 right-1 text-[9px] text-white font-medium truncate px-0.5">
                          {photo.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center text-[10px] hover:bg-red-500 transition-colors cursor-pointer"
                          title="Remove photo"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Service Recognition Indicator Bar */}
            <div className="mt-3 pt-2.5 border-t border-[#E4EAE9] flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#16572E] font-bold flex items-center gap-1 mr-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E9A77]" />
                  <span>We found {recognizedTags.length} services:</span>
                </span>
                {recognizedTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#E8F8F5] text-[#0E6251] border border-[#A3E4D7] shadow-2xs"
                  >
                    <span>✓ {tag}</span>
                    <button
                      type="button"
                      onClick={() => setRecognizedTags(prev => prev.filter((_, i) => i !== idx))}
                      className="hover:text-red-500 text-[10px] ml-0.5 cursor-pointer"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setRecognizedTags(prev => [...prev, 'General Handyman'])}
                  className="text-xs px-2.5 py-1 rounded-full border border-dashed border-[#16572E]/40 text-[#16572E] font-medium hover:bg-[#F2F7EE] cursor-pointer"
                >
                  + Add
                </button>
              </div>

              <span className="text-xs font-semibold text-[#2E9A77] hidden sm:inline-flex items-center gap-1">
                <span>Looks right</span>
                <span>✓</span>
              </span>
            </div>
          </motion.div>

          {/* Photographic Service Switcher Chips with Spring Hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-full max-w-3xl mb-6"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-2 drop-shadow">
              Switch Cover Image & Explore Services:
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {showcaseJobs.map((job, idx) => {
                const isActive = activeShowcaseIdx === idx;
                return (
                  <motion.button
                    key={job.id}
                    type="button"
                    aria-label={`Switch cover to ${job.title}`}
                    onClick={() => handleSelectShowcase(idx)}
                    whileHover={{ y: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`flex flex-col items-center p-2 rounded-2xl border text-center transition-all cursor-pointer backdrop-blur-md group ${
                      isActive
                        ? 'bg-white/95 text-[#0C2229] border-white ring-2 ring-[#84CC16] shadow-lg'
                        : 'bg-black/40 hover:bg-black/60 text-white border-white/20'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-slate-900 relative mb-1">
                      <img
                        src={getAssetUrl(job.image)}
                        alt={job.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={handleImageError}
                      />
                      <span className="absolute bottom-0 right-0 text-[10px] bg-black/60 px-0.5 rounded-tl">
                        {job.iconEmoji}
                      </span>
                    </div>
                    <p className={`text-xs font-bold truncate w-full ${isActive ? 'text-[#16572E]' : 'text-white'}`}>
                      {job.title.split(' ')[0]}
                    </p>
                    <p className={`text-[10px] truncate w-full ${isActive ? 'text-[#5E7379]' : 'text-white/70'}`}>
                      {job.priceEstimate}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Dual Action Buttons on Cover with Hover Lift */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScrollToWaitlist('customer')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#84CC16] hover:bg-[#65A30D] text-[#0C2229] font-['Oswald'] font-bold text-base tracking-wider uppercase rounded-xs transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.hero.joinCustomerBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScrollToWaitlist('contractor')}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white hover:text-[#16572E] text-white border-2 border-white font-['Oswald'] font-bold text-base tracking-wider uppercase rounded-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.hero.joinContractorBtn}</span>
            </motion.button>
          </motion.div>

          {/* Carousel dots at the very bottom of the cover */}
          <div className="flex items-center gap-2.5 mt-8" aria-label="Cover image carousel pagination">
            {showcaseJobs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectShowcase(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeShowcaseIdx === idx
                    ? 'w-7 bg-[#84CC16]'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

        </div>
      </section>
    );
  }

  // =========================================================================
  // OTHER HERO LAYOUT MODES: STUDIO, VIDEO SPOTLIGHT, MINIMAL SPLIT
  // =========================================================================
  return (
    <section className="relative overflow-hidden pt-4 pb-12 lg:pt-8 lg:pb-20">
      {/* Background soft ambient glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#077E88]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 w-80 h-80 bg-[#65C8A6]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Launch Countdown Banner Bar */}
        <div className="mb-6 p-3 sm:p-3.5 rounded-2xl bg-white border border-[#E4EAE9] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#077E88] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#077E88]"></span>
            </span>
            <div>
              <p className="text-xs font-semibold text-[#077E88] uppercase tracking-wider">
                {t.hero.launchBadge}
              </p>
              <p className="text-xs text-[#76898E]">
                Target launch: February 1, 2027 · Accepting early customer & contractor registrations
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 sm:gap-2.5 text-center">
            <div className="px-2.5 py-1 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-11">
              <div className="font-display font-bold text-base text-[#0C2229] tabular-nums leading-tight">
                {countdown.months}
              </div>
              <div className="text-[9px] text-[#76898E] font-medium uppercase">{t.hero.months}</div>
            </div>
            <span className="font-display font-semibold text-[#76898E]">:</span>
            <div className="px-2.5 py-1 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-11">
              <div className="font-display font-bold text-base text-[#0C2229] tabular-nums leading-tight">
                {countdown.days}
              </div>
              <div className="text-[9px] text-[#76898E] font-medium uppercase">{t.hero.days}</div>
            </div>
            <span className="font-display font-semibold text-[#76898E]">:</span>
            <div className="px-2.5 py-1 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-11">
              <div className="font-display font-bold text-base text-[#0C2229] tabular-nums leading-tight">
                {String(countdown.hours).padStart(2, '0')}
              </div>
              <div className="text-[9px] text-[#76898E] font-medium uppercase">{t.hero.hours}</div>
            </div>
            <span className="font-display font-semibold text-[#76898E]">:</span>
            <div className="px-2.5 py-1 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-11">
              <div className="font-display font-bold text-base text-[#0C2229] tabular-nums leading-tight">
                {String(countdown.minutes).padStart(2, '0')}
              </div>
              <div className="text-[9px] text-[#76898E] font-medium uppercase">{t.hero.minutes}</div>
            </div>
            <span className="font-display font-semibold text-[#76898E]">:</span>
            <div className="px-2.5 py-1 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-11">
              <div className="font-display font-bold text-base text-[#077E88] tabular-nums leading-tight">
                {String(countdown.seconds).padStart(2, '0')}
              </div>
              <div className="text-[9px] text-[#077E88] font-medium uppercase">{t.hero.seconds}</div>
            </div>
          </div>
        </div>

        {/* VARIATION 1: INTERACTIVE STUDIO LAYOUT */}
        {heroMode === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Headlines & Interaction */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Trust Badge + Real Avatars Stack */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F3F3] text-[#05626A] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#077E88]" />
                  <span>{t.hero.tagline}</span>
                </div>

                {/* Overlapping customer & pro image avatars */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-2xs"
                      src={getAssetUrl('/assets/aistudio/cust_92398b91.jpg')}
                      alt="Verified homeowner"
                      onError={handleImageError}
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-2xs"
                      src={getAssetUrl('/assets/aistudio/pro_c3584a76.jpg')}
                      alt="Certified pro contractor"
                      onError={handleImageError}
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-2xs"
                      src={getAssetUrl('/assets/aistudio/windows_5cf1f912.jpg')}
                      alt="Window specialist"
                      onError={handleImageError}
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-2xs"
                      src={getAssetUrl('/assets/aistudio/garden_14e81227.jpg')}
                      alt="Gardener"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0C2229]">
                    <div className="flex text-amber-400">
                      {'★'.repeat(5)}
                    </div>
                    <span>4.9/5</span>
                    <span className="text-[#76898E] font-normal">(3,480+ users & pros)</span>
                  </div>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-2.5">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#0C2229] leading-[1.08] text-balance">
                  What do you need? <br />
                  <span className="text-[#077E88] underline decoration-[#65C8A6] decoration-4 underline-offset-8">
                    Describe it.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-[#3D5259] leading-relaxed max-w-xl font-normal">
                  Write it in your own words. Loqelo recognizes the services your place needs and brings transparent bids from rated local pros in minutes.
                </p>
              </div>

              {/* Interactive Search Box */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E4EAE9] shadow-md space-y-3.5">
                <div className="flex items-center justify-between text-xs text-[#76898E]">
                  <span className="font-semibold text-[#0C2229]">What do you need?</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F4F7F6] text-[#76898E] font-medium text-[11px]">Any language</span>
                </div>

                <div className="relative rounded-2xl border-2 border-[#077E88]/30 focus-within:border-[#077E88] focus-within:ring-2 focus-within:ring-[#077E88]/10 bg-[#FAFCFB] p-3 transition-all">
                  <input
                    type="text"
                    value={queryInput}
                    onChange={handleCustomInput}
                    className="w-full text-sm sm:text-base text-[#0C2229] placeholder:text-[#76898E] bg-transparent focus:outline-hidden font-normal"
                    placeholder={t.hero.queryPlaceholder}
                  />

                  {queryInput === 'I need to clean my house, wash my windows, and wash my car' && (
                    <div className="mt-2 pt-2 border-t border-[#EEF3F2] flex flex-wrap items-center gap-1.5 text-xs text-[#5E7379]">
                      <span className="text-[11px] text-[#76898E]">Identified:</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#D1F2EB] text-[#0E6251] font-medium">clean my house</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#D4E6F1] text-[#1B4F72] font-medium">wash my windows</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#FADBD8] text-[#78281F] font-medium">wash my car</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#3D5259]">
                    <button
                      type="button"
                      onClick={() => setIsPhotoDrawerOpen(!isPhotoDrawerOpen)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all font-medium text-xs cursor-pointer ${
                        isPhotoDrawerOpen
                          ? 'border-[#077E88] bg-[#E7F6F8] text-[#077E88] font-semibold'
                          : 'border-[#DCE4E3] hover:bg-[#F4F7F6] text-[#0C2229]'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5 text-[#077E88]" />
                      <span>{isPhotoDrawerOpen ? 'Hide attached photos' : `Photos attached (${attachedPhotos.length})`}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setQueryInput('Lawn care & hedge trimming for back garden 120 m²');
                        setRecognizedTags(['Lawn care', 'Hedge trimming', 'Green waste removal']);
                        setActiveShowcaseIdx(1);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#DCE4E3] hover:bg-[#F4F7F6] text-[#0C2229] transition-colors font-medium text-xs cursor-pointer"
                    >
                      <Mic className="w-3.5 h-3.5 text-[#077E88]" />
                      <span>Speak</span>
                    </button>

                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#DCE4E3] bg-white text-[#0C2229]">
                      <MapPin className="w-3.5 h-3.5 text-[#077E88]" />
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="bg-transparent text-xs font-semibold focus:outline-hidden cursor-pointer"
                      >
                        <option value="Amsterdam">Amsterdam</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Paris">Paris</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Warsaw">Warsaw</option>
                        <option value="Brussels">Brussels</option>
                        <option value="London">London</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleScrollToWaitlist('customer')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs sm:text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{t.hero.getQuotesBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {isPhotoDrawerOpen && (
                  <div className="p-3 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0C2229] flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#077E88]" />
                        <span>Task photos attached to this request ({attachedPhotos.length})</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleAddSamplePhoto}
                        className="text-[11px] font-semibold text-[#077E88] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add photo</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {attachedPhotos.map((photo) => (
                        <div key={photo.id} className="relative group rounded-xl overflow-hidden aspect-4/3 border border-[#DCE4E3] bg-slate-100 shadow-2xs">
                          <img
                            src={getAssetUrl(photo.url)}
                            alt={photo.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                          <span className="absolute bottom-1 left-1 right-1 text-[9px] text-white font-medium truncate px-0.5">
                            {photo.label}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(photo.id)}
                            className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center text-[10px] hover:bg-red-500 transition-colors cursor-pointer"
                            title="Remove photo"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2.5 border-t border-[#E4EAE9] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-[#077E88] font-bold flex items-center gap-1 mr-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E9A77]" />
                      <span>We found {recognizedTags.length} services:</span>
                    </span>
                    {recognizedTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#E8F8F5] text-[#0E6251] border border-[#A3E4D7] shadow-2xs"
                      >
                        <span>✓ {tag}</span>
                        <button
                          type="button"
                          onClick={() => setRecognizedTags(prev => prev.filter((_, i) => i !== idx))}
                          className="hover:text-red-500 text-[10px] ml-0.5 cursor-pointer"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => setRecognizedTags(prev => [...prev, 'General Handyman'])}
                      className="text-xs px-2.5 py-1 rounded-full border border-dashed border-[#077E88]/40 text-[#077E88] font-medium hover:bg-[#E7F6F8] cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>

                  <span className="text-xs font-semibold text-[#2E9A77] hidden sm:inline-flex items-center gap-1">
                    <span>Looks right</span>
                    <span>✓</span>
                  </span>
                </div>
              </div>

              {/* Service Selector Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#76898E]">
                  Click to switch live project & see verified offers:
                </span>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {showcaseJobs.map((job, idx) => {
                    const isActive = activeShowcaseIdx === idx;
                    return (
                      <button
                        key={job.id}
                        type="button"
                        aria-label={`Select ${job.title}`}
                        onClick={() => handleSelectShowcase(idx)}
                        className={`flex flex-col items-center p-1.5 rounded-xl border text-center transition-all cursor-pointer group ${
                          isActive
                            ? 'bg-[#E7F6F8] border-[#077E88] ring-2 ring-[#077E88]/20 shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-[#E4EAE9] text-[#3D5259]'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#E2ECE9] bg-slate-100 relative mb-1">
                          <img
                            src={getAssetUrl(job.image)}
                            alt={job.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={handleImageError}
                          />
                          <span className="absolute bottom-0 right-0 text-[10px] bg-black/60 px-0.5 rounded-tl">
                            {job.iconEmoji}
                          </span>
                        </div>
                        <p className={`text-[11px] font-bold truncate w-full ${isActive ? 'text-[#077E88]' : 'text-[#0C2229]'}`}>
                          {job.title.split(' ')[0]}
                        </p>
                        <p className="text-[9px] text-[#76898E] truncate w-full">
                          {job.priceEstimate}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => handleScrollToWaitlist('customer')}
                  className="px-6 py-3 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.hero.joinCustomerBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScrollToWaitlist('contractor')}
                  className="px-6 py-3 rounded-full bg-[#0C2229] hover:bg-[#031C26] text-white text-sm font-semibold shadow-sm hover:shadow transition-all text-center cursor-pointer"
                >
                  {t.hero.joinContractorBtn}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-5 text-xs text-[#76898E]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#077E88]" />
                  <span>{t.hero.trustPoint1}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E9A77]" />
                  <span>{t.hero.trustPoint2}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E8912C]" />
                  <span>{t.hero.trustPoint3}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tall Hero Image Showcase with float animation */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                <div className="relative w-full h-[480px] sm:h-[530px] lg:h-[560px] rounded-[36px] overflow-hidden shadow-2xl border border-[#DCE4E3] bg-[#E8F3F1] group transition-all">
                  
                  <img
                    key={currentShowcase.image}
                    src={getAssetUrl(currentShowcase.image)}
                    alt={currentShowcase.title}
                    onError={handleImageError}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C2229]/80 via-transparent to-black/25 pointer-events-none" />

                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#077E88] shadow-md flex items-center gap-2 border border-white/80 z-20 animate-float">
                    <span className="w-2 h-2 rounded-full bg-[#2E9A77] animate-pulse"></span>
                    <span>Live Job Request</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl py-2 px-3.5 shadow-xl border border-white/80 flex items-center gap-2.5 z-20 animate-float-delayed">
                    <div className="w-8 h-8 rounded-xl bg-[#077E88]/10 text-[#077E88] flex items-center justify-center font-bold text-sm shrink-0">
                      {currentShowcase.iconEmoji}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0C2229] leading-tight">
                        {currentShowcase.title}
                      </p>
                      <p className="text-[11px] text-[#76898E] font-medium leading-tight">
                        {currentShowcase.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-white/80 flex items-center gap-3.5 z-20 max-w-xs animate-float">
                    <div className="w-11 h-11 rounded-full bg-[#077E88] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                      {currentShowcase.proInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#76898E] font-medium uppercase tracking-wider">
                        Job done by
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-[#0C2229] flex items-center gap-1 truncate">
                        <span>{currentShowcase.proName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E9A77] shrink-0" />
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-[#76898E]">Job rating</span>
                        <div className="flex text-amber-400 text-xs">
                          {'★'.repeat(Math.round(currentShowcase.rating))}
                        </div>
                        <span className="text-xs font-bold text-[#0C2229]">
                          {currentShowcase.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-1.5 z-20 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/20">
                    {showcaseJobs.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectShowcase(idx)}
                        className={`w-2 rounded-full transition-all cursor-pointer ${
                          activeShowcaseIdx === idx
                            ? 'h-6 bg-[#65C8A6]'
                            : 'h-2 bg-white/60 hover:bg-white'
                        }`}
                        aria-label={`View showcase photo ${idx + 1}`}
                      />
                    ))}
                  </div>

                </div>

                <div className="mt-2.5 flex items-center justify-between px-2 text-xs text-[#76898E]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#2E9A77]"></span>
                    <span>34 verified pros available in Amsterdam</span>
                  </span>
                  <span className="font-semibold text-[#077E88]">
                    Launch: Feb 2027
                  </span>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* VARIATION 2: CINEMATIC VIDEO SPOTLIGHT HERO */}
        {heroMode === 'video-spotlight' && (
          <div className="space-y-8 max-w-5xl mx-auto text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E7F3F3] text-[#05626A] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#077E88]" />
                <span>Everything your place needs</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[#0C2229] tracking-tight leading-[1.05]">
                Connecting homeowners & businesses with <br className="hidden sm:inline" />
                <span className="text-[#077E88]">rated local service pros</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5E7379] max-w-2xl mx-auto">
                Watch how Loqelo turns any service request into 5 transparent, verified bids in under 2 hours. Launching February 2027.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-white/80 aspect-16/9 max-w-4xl mx-auto group">
              <video
                src={getAssetUrl('/assets/aistudio/Loqelo_final_video_compressed_fafd7b79.mp4')}
                poster={getAssetUrl('/assets/aistudio/hero_4b5d798a.jpg')}
                className="w-full h-full object-cover"
                controls
                muted
                autoPlay={false}
              />
            </div>

            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#76898E] mb-3">
                Real jobs completed across home, garden, and office
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
                <div className="rounded-2xl overflow-hidden border border-[#E4EAE9] bg-white shadow-xs group">
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={getAssetUrl('/assets/aistudio/windows_5cf1f912.jpg')}
                      alt="Window cleaning"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-2.5 text-left">
                    <p className="text-xs font-bold text-[#0C2229]">Window cleaning</p>
                    <p className="text-[10px] text-[#2E9A77] font-semibold">★ 5.0 · 214 reviews</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#E4EAE9] bg-white shadow-xs group">
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={getAssetUrl('/assets/aistudio/garden_14e81227.jpg')}
                      alt="Garden landscaping"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-2.5 text-left">
                    <p className="text-xs font-bold text-[#0C2229]">Garden & Hedge</p>
                    <p className="text-[10px] text-[#2E9A77] font-semibold">★ 4.9 · 188 reviews</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#E4EAE9] bg-white shadow-xs group">
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={getAssetUrl('/assets/aistudio/living_1952c2b8.jpg')}
                      alt="Apartment cleaning"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-2.5 text-left">
                    <p className="text-xs font-bold text-[#0C2229]">Home deep clean</p>
                    <p className="text-[10px] text-[#2E9A77] font-semibold">★ 5.0 · 312 reviews</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#E4EAE9] bg-white shadow-xs group">
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={getAssetUrl('/assets/aistudio/car_9b5332fd.jpg')}
                      alt="Vehicle detailing"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-2.5 text-left">
                    <p className="text-xs font-bold text-[#0C2229]">Car detailing</p>
                    <p className="text-[10px] text-[#2E9A77] font-semibold">★ 4.9 · 96 reviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleScrollToWaitlist('customer')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Join Customer Waiting List</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleScrollToWaitlist('contractor')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0C2229] hover:bg-[#031C26] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#65C8A6]" />
                <span>Register as Service Provider (0% Fee)</span>
              </button>
            </div>
          </div>
        )}

        {/* VARIATION 3: MINIMALIST SPLIT */}
        {heroMode === 'minimal-split' && (
          <div className="space-y-10 max-w-6xl mx-auto">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#077E88] uppercase block">
                Loqelo Marketplace · February 2027
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0C2229] tracking-tight leading-[1.08]">
                Everything your home, garden, and office needs.
              </h1>
              <p className="text-base sm:text-lg text-[#5E7379] leading-relaxed">
                Describe your project once. Receive up to 5 verified local quotes with transparent prices and zero obligation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              <div className="rounded-3xl bg-white border border-[#E4EAE9] shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
                  <img
                    src={getAssetUrl('/assets/aistudio/cust_92398b91.jpg')}
                    alt="Homeowner requesting service on laptop"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#077E88] shadow-sm flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>For Homeowners & Clients</span>
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-bold text-[#0C2229]">
                      Stop Calling Contractors One by One
                    </h3>
                    <p className="text-sm text-[#5E7379] leading-relaxed">
                      Post your task in plain words. Compare up to 5 clear quotes from insured, rated specialists without making endless phone calls.
                    </p>
                    
                    <ul className="space-y-2 text-xs text-[#3D5259] pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E9A77]" />
                        <span>100% Free with zero booking commissions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E9A77]" />
                        <span>First bids arrive in ~2 hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E9A77]" />
                        <span>Phone & address hidden until you choose</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleScrollToWaitlist('customer')}
                    className="w-full py-3.5 px-6 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white font-bold text-xs sm:text-sm tracking-tight shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Join as Customer (Early Access)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-3xl bg-[#0C2229] text-white shadow-xl flex flex-col justify-between overflow-hidden group">
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-800">
                  <img
                    src={getAssetUrl('/assets/aistudio/pro_c3584a76.jpg')}
                    alt="Verified professional technician"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C2229] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-[#65C8A6] shadow-sm flex items-center gap-1.5 border border-white/20">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>For Trades & Service Providers</span>
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-bold text-white">
                      Receive High-Intent Local Job Inquiries
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Set your operating radius. Get notified when qualified jobs appear near you without paying extortionate lead fees.
                    </p>

                    <ul className="space-y-2 text-xs text-slate-300 pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#65C8A6]" />
                        <span>0% commission for first 6 months</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#65C8A6]" />
                        <span>Work only within your chosen kilometer radius</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#65C8A6]" />
                        <span>Verified client budgets and direct chat</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleScrollToWaitlist('contractor')}
                    className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-slate-100 text-[#0C2229] font-bold text-xs sm:text-sm tracking-tight shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Apply for Verified Contractor Badge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
