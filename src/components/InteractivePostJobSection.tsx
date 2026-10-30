/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Interactive "Post a job" section matching Figma "02 Post a job.png"
 * Full working simulation with live glance card, tag editor, media preview, and launch waitlist link.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TranslationDictionary } from '../utils/i18n.ts';
import {
  Mic,
  Plus,
  X,
  FileText,
  Play,
  Calendar,
  MapPin,
  Lock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Bell,
  Layers,
  Check,
  Sparkles,
  Camera
} from 'lucide-react';
import { handleImageError, getAssetUrl } from '../utils/assets.ts';

interface InteractivePostJobSectionProps {
  t: TranslationDictionary;
  onPostSuccess?: (jobDetails: { title: string; category: string; city: string }) => void;
  onScrollToWaitlist?: () => void;
}

export const InteractivePostJobSection: React.FC<InteractivePostJobSectionProps> = ({
  t,
  onPostSuccess,
  onScrollToWaitlist
}) => {
  // Job Form State matching Figma 02 Post a job.png
  const [description, setDescription] = useState(
    "I need to clean my house, wash my windows, and wash my car. It's a 3-bedroom house, 14 windows (6 on the first floor). The car is a family SUV, inside and out."
  );
  
  const [recognizedServices, setRecognizedServices] = useState<string[]>([
    'Cleaning',
    'Window cleaning',
    'Car washing'
  ]);

  const [newServiceInput, setNewServiceInput] = useState('');
  const [isAddingService, setIsAddingService] = useState(false);

  const [city, setCity] = useState('Amsterdam');
  const [zipCode, setZipCode] = useState('1077 AB');

  const [preferredDate, setPreferredDate] = useState('Saturday, 10 October 2026');
  const [flexibility, setFlexibility] = useState<'exact' | 'plusMinus2' | 'any'>('plusMinus2');

  const [files, setFiles] = useState<Array<{ name: string; type: 'image' | 'video' | 'pdf'; src?: string; duration?: string }>>([
    { name: 'front-of-house.jpg', type: 'image', src: '/assets/aistudio/house_31508b24.jpg' },
    { name: 'living-room.jpg', type: 'image', src: '/assets/aistudio/living_1952c2b8.jpg' },
    { name: 'suv.mp4', type: 'video', src: '/assets/aistudio/car_9b5332fd.jpg', duration: '0:24' },
    { name: 'floor-plan.pdf', type: 'pdf' }
  ]);

  const [isDictating, setIsDictating] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRemoveService = (service: string) => {
    setRecognizedServices(prev => prev.filter(s => s !== service));
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (newServiceInput.trim() && !recognizedServices.includes(newServiceInput.trim())) {
      setRecognizedServices(prev => [...prev, newServiceInput.trim()]);
      setNewServiceInput('');
      setIsAddingService(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAddSampleFile = () => {
    const extraPhotos = [
      { name: 'garden-view.jpg', type: 'image' as const, src: '/assets/aistudio/garden_14e81227.jpg' },
      { name: 'driveway.jpg', type: 'image' as const, src: '/assets/aistudio/tap_548ce49d.jpg' }
    ];
    const nextPhoto = extraPhotos.find(p => !files.some(f => f.name === p.name));
    if (nextPhoto) {
      setFiles(prev => [...prev, nextPhoto]);
    } else {
      setFiles(prev => [...prev, { name: `photo-${prev.length + 1}.jpg`, type: 'image', src: '/assets/aistudio/living_1952c2b8.jpg' }]);
    }
  };

  const toggleDictation = () => {
    if (!isDictating) {
      setIsDictating(true);
      setTimeout(() => {
        setDescription(prev => prev + " Also need gutter clearance if possible.");
        if (!recognizedServices.includes('Gutter clearance')) {
          setRecognizedServices(prev => [...prev, 'Gutter clearance']);
        }
        setIsDictating(false);
      }, 1500);
    }
  };

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2500);
  };

  const handlePostJob = () => {
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#077E88', '#2E9A77', '#A3E635', '#16572E']
      });
    } catch {}
    if (onPostSuccess) {
      onPostSuccess({
        title: 'House, window & car cleaning',
        category: recognizedServices[0] || 'General Services',
        city: `${city}, ${zipCode}`
      });
    }
  };

  return (
    <section id="post-a-job" className="py-16 sm:py-24 bg-[#F4F7F6] border-b border-[#E4EAE9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header badge */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F6F8] text-[#077E88] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Platform Demo</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0C2229] tracking-tight">
            Try posting a job now
          </h2>
          <p className="text-sm sm:text-base text-[#5E7379] mt-2">
            Experience how fast and effortless hiring on Loqelo will be when we launch in February 2027.
          </p>
        </div>

        {/* Post a Job Frame matching Figma 02 Post a job.png */}
        <div className="bg-[#FAFBFB] rounded-3xl border border-[#DCE4E3] p-4 sm:p-8 lg:p-10 shadow-sm relative">
          
          {/* Header Bar */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#76898E] font-medium mb-2 hover:text-[#0C2229] cursor-pointer">
              <span>‹</span>
              <span>My jobs</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0C2229]">
              Post a job
            </h1>
            <p className="text-xs sm:text-sm text-[#5E7379] mt-1">
              Takes about 2 minutes. It's free, and you only choose a provider if you like a quote.
            </p>
          </div>

          {/* Main Grid: Left 4-step wizard + Right Glance sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Steps Column (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Step 1: Describe the job */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E4EAE9] shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#E7F6F8] text-[#077E88] font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#0C2229]">
                    Describe the job
                  </h3>
                </div>

                {/* Textarea with Highlight Preview */}
                <div className="relative rounded-xl border border-[#077E88]/40 focus-within:ring-2 focus-within:ring-[#077E88]/20 bg-white p-3.5 transition-all">
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you need done..."
                    className="w-full text-xs sm:text-sm text-[#0C2229] placeholder-[#9BAEAE] bg-transparent resize-none focus:outline-hidden leading-relaxed font-normal"
                  />
                  
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0F4F3] mt-2">
                    <button
                      type="button"
                      onClick={toggleDictation}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                        isDictating
                          ? 'bg-[#E7F6F8] text-[#077E88] animate-pulse'
                          : 'text-[#5E7379] hover:bg-[#F4F7F6] hover:text-[#0C2229]'
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5 text-[#077E88]" />
                      <span>{isDictating ? 'Listening...' : 'Or dictate'}</span>
                    </button>
                    <span className="text-[11px] text-[#76898E]">
                      {description.length} / 1000
                    </span>
                  </div>
                </div>

                {/* Recognized Services Card matching Figma */}
                <div className="p-3.5 rounded-xl bg-[#F0F9FA] border border-[#CDEEF1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#077E88]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>We recognised these services</span>
                      </div>
                      <span className="text-[10px] text-[#76898E] hidden sm:inline">
                        Remove any that don't fit, or add more
                      </span>
                    </div>

                    {/* Service Chips */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <AnimatePresence>
                        {recognizedServices.map((svc) => (
                          <motion.span
                            key={svc}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#077E88] text-white text-xs font-medium shadow-2xs group"
                          >
                            <span>{svc}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveService(svc)}
                              className="w-3.5 h-3.5 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>

                      {isAddingService ? (
                        <form onSubmit={handleAddService} className="inline-flex items-center gap-1">
                          <input
                            type="text"
                            autoFocus
                            placeholder="Service name..."
                            value={newServiceInput}
                            onChange={(e) => setNewServiceInput(e.target.value)}
                            className="text-xs px-2.5 py-1 rounded-full border border-[#077E88] focus:outline-hidden bg-white text-[#0C2229] w-32"
                          />
                          <button
                            type="submit"
                            className="text-xs px-2 py-1 rounded-full bg-[#077E88] text-white font-medium"
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsAddingService(false)}
                            className="text-xs text-[#76898E] hover:text-[#0C2229]"
                          >
                            ✕
                          </button>
                        </form>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsAddingService(true)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#077E88]/40 text-[#077E88] text-xs font-medium hover:bg-[#E7F6F8] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add service</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Step 2: Photos and videos */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E4EAE9] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#E7F6F8] text-[#077E88] font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#0C2229]">
                      Photos and videos
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#76898E] hidden sm:inline">
                    Optional, but providers quote faster with them
                  </span>
                </div>

                {/* Uploaded Files Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl border border-[#E4EAE9] overflow-hidden bg-[#FBFDFC] aspect-4/3 flex flex-col items-center justify-center text-center p-2"
                    >
                      {file.type === 'image' && file.src && (
                        <img
                          src={getAssetUrl(file.src)}
                          alt={file.name}
                          onError={handleImageError}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}

                      {file.type === 'video' && file.src && (
                        <>
                          <img
                            src={getAssetUrl(file.src)}
                            alt={file.name}
                            onError={handleImageError}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/90 text-[#0C2229] flex items-center justify-center shadow-xs">
                              <Play className="w-3.5 h-3.5 fill-[#0C2229] ml-0.5" />
                            </div>
                          </div>
                          {file.duration && (
                            <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[9px] px-1 py-0.5 rounded font-mono">
                              {file.duration}
                            </span>
                          )}
                        </>
                      )}

                      {file.type === 'pdf' && (
                        <div className="flex flex-col items-center justify-center gap-1.5 text-[#5E7379]">
                          <FileText className="w-7 h-7 text-[#077E88]" />
                          <span className="text-[10px] font-bold text-[#0C2229]">PDF</span>
                        </div>
                      )}

                      {/* File Label overlay */}
                      <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 text-[10px] text-white truncate text-center">
                        {file.name}
                      </span>

                      {/* Delete File Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Add Files Action Tile */}
                  <button
                    type="button"
                    onClick={handleAddSampleFile}
                    className="rounded-xl border-2 border-dashed border-[#CDEEF1] hover:border-[#077E88] bg-[#F7FBFB] hover:bg-[#E7F6F8]/50 transition-colors aspect-4/3 flex flex-col items-center justify-center gap-1 text-[#077E88] p-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-[11px] font-semibold">Add files</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Where? */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E4EAE9] shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#E7F6F8] text-[#077E88] font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#0C2229]">
                    Where?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5E7379] mb-1.5">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#76898E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Amsterdam"
                        className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-[#DCE4E3] focus:border-[#077E88] focus:outline-hidden bg-white text-[#0C2229]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5E7379] mb-1.5">
                      Zip code
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="e.g. 1077 AB"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#DCE4E3] focus:border-[#077E88] focus:outline-hidden bg-white text-[#0C2229]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#76898E] pt-1">
                  <Lock className="w-3.5 h-3.5 text-[#077E88] shrink-0" />
                  <span>Providers only see the general area. Your exact address is shared only after you accept an offer.</span>
                </div>
              </div>

              {/* Step 4: When? */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E4EAE9] shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#E7F6F8] text-[#077E88] font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#0C2229]">
                    When?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div>
                    <label className="block text-xs font-semibold text-[#5E7379] mb-1.5">
                      Preferred date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#76898E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-[#DCE4E3] focus:border-[#077E88] focus:outline-hidden bg-white text-[#0C2229]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5E7379] mb-1.5">
                      Flexibility
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFlexibility('exact')}
                        className={`text-xs py-2 px-2 rounded-xl font-medium border text-center transition-all ${
                          flexibility === 'exact'
                            ? 'bg-[#077E88] text-white border-[#077E88]'
                            : 'bg-white text-[#5E7379] border-[#DCE4E3] hover:bg-[#F4F7F6]'
                        }`}
                      >
                        Exact day
                      </button>
                      <button
                        type="button"
                        onClick={() => setFlexibility('plusMinus2')}
                        className={`text-xs py-2 px-2 rounded-xl font-medium border text-center transition-all ${
                          flexibility === 'plusMinus2'
                            ? 'bg-[#077E88] text-white border-[#077E88] shadow-xs'
                            : 'bg-white text-[#5E7379] border-[#DCE4E3] hover:bg-[#F4F7F6]'
                        }`}
                      >
                        ± 2 days
                      </button>
                      <button
                        type="button"
                        onClick={() => setFlexibility('any')}
                        className={`text-xs py-2 px-2 rounded-xl font-medium border text-center transition-all ${
                          flexibility === 'any'
                            ? 'bg-[#077E88] text-white border-[#077E88]'
                            : 'bg-white text-[#5E7379] border-[#DCE4E3] hover:bg-[#F4F7F6]'
                        }`}
                      >
                        Any time
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar matching Figma 02 Post a job */}
              <div className="p-4 rounded-2xl bg-white border border-[#E4EAE9] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-[#5E7379]">
                  <ShieldCheck className="w-4 h-4 text-[#077E88] shrink-0" />
                  <span>Contact details stay private until you choose a provider.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-full border border-[#DCE4E3] hover:bg-[#F4F7F6] text-xs font-semibold text-[#0C2229] transition-colors"
                  >
                    {isDraftSaved ? '✓ Draft saved' : 'Save draft'}
                  </button>

                  <button
                    type="button"
                    onClick={handlePostJob}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs font-bold tracking-tight shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <span>Post the job</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky "Your job at a glance" + "What happens next" (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              
              {/* "Your job at a glance" Card matching Figma */}
              <div className="bg-white rounded-2xl border border-[#E4EAE9] overflow-hidden shadow-2xs">
                <div className="p-4 border-b border-[#F0F4F3]">
                  <span className="text-[11px] font-bold text-[#76898E] uppercase tracking-wider block">
                    Your job at a glance
                  </span>
                </div>

                {/* Hero preview image */}
                <div className="aspect-16/9 overflow-hidden bg-slate-100 relative">
                  <img
                    src={getAssetUrl('/assets/aistudio/windows_5cf1f912.jpg')}
                    alt="House, window & car cleaning preview"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {files.length} attachments
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h4 className="font-display text-base font-bold text-[#0C2229]">
                    House, window & car cleaning
                  </h4>

                  <div className="space-y-2 text-xs text-[#5E7379]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#E7F6F8] flex items-center justify-center shrink-0">
                        <Sparkles className="w-3 h-3 text-[#077E88]" />
                      </div>
                      <span className="truncate">
                        {recognizedServices.length > 0
                          ? recognizedServices.join(' · ')
                          : 'General service'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#E7F6F8] flex items-center justify-center shrink-0">
                        <MapPin className="w-3 h-3 text-[#077E88]" />
                      </div>
                      <span>{city}, {zipCode}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#E7F6F8] flex items-center justify-center shrink-0">
                        <Calendar className="w-3 h-3 text-[#077E88]" />
                      </div>
                      <span>
                        {preferredDate.split(',')[0] || preferredDate}, {flexibility === 'plusMinus2' ? '± 2 days' : flexibility === 'exact' ? 'Exact day' : 'Flexible'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#E7F6F8] flex items-center justify-center shrink-0">
                        <Camera className="w-3 h-3 text-[#077E88]" />
                      </div>
                      <span>
                        {files.filter(f => f.type === 'image').length} photos · {files.filter(f => f.type === 'video').length} video · {files.filter(f => f.type === 'pdf').length} file
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* "What happens next" Dark Slate Box matching Figma */}
              <div className="rounded-2xl bg-[#083232] text-white p-5 space-y-4 shadow-sm">
                <h4 className="font-display text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  <span>What happens next</span>
                </h4>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-3.5 h-3.5 text-[#59D4DC]" />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">34 matching providers nearby</span>
                      <span className="text-[#A2C4C6] text-[11px]">get notified in the Amsterdam area</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="w-3.5 h-3.5 text-[#59D4DC]" />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Quotes arrive within 2 hours</span>
                      <span className="text-[#A2C4C6] text-[11px]">transparent pricing, no hidden markups</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#59D4DC]" />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">You compare & choose</span>
                      <span className="text-[#A2C4C6] text-[11px]">completely free with zero obligation</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={onScrollToWaitlist}
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#59D4DC] hover:text-white text-xs font-medium transition-colors text-center block"
                  >
                    Join waiting list for launch perks →
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Submission Feedback Modal/Overlay matching Figma 02b_Job_posted_81f05b8e.png */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 bg-[#0C2229]/60 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="bg-white rounded-[28px] max-w-md w-full p-8 text-center space-y-6 shadow-2xl border border-[#E4EAE9] relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Green circular house outline badge matching 02b */}
                  <div className="w-16 h-16 rounded-full bg-[#EBF7F2] border border-[#C6EAD9] text-[#2E9A77] mx-auto flex items-center justify-center shadow-xs animate-bounce">
                    <svg className="w-8 h-8 text-[#2E9A77]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-[26px] font-bold text-[#0C2229] tracking-tight">
                      Your job has been added.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5E7379] leading-relaxed max-w-sm mx-auto">
                      We've told 34 matching providers in {city}. We'll let you know as soon as the first quote arrives.
                    </p>
                  </div>

                  {/* Two buttons matching 02b Job posted: Post another & View my job */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setDescription('');
                        setRecognizedServices([]);
                      }}
                      className="flex-1 py-3 px-5 rounded-full border border-[#DCE4E3] hover:bg-[#F4F7F6] text-xs font-semibold text-[#0C2229] transition-colors cursor-pointer"
                    >
                      Post another
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        const target = document.getElementById('quote-comparison') || document.getElementById('platform-preview');
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' });
                        } else if (onScrollToWaitlist) {
                          onScrollToWaitlist();
                        }
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span>View my job</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
