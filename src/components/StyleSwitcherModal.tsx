/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Interactive Style Switcher Modal & Quick Floating Widget:
 * Allows instantaneous live switching between:
 * - 4 Brand Themes (Figma Clean, Nordic Warm Editorial, Vivid Emerald Tech, Executive Dark Mode)
 * - 3 Hero Layouts (Interactive Studio, Video Spotlight, Minimalist Split)
 * - 3 Category Card Styles (Photo Blend, Visual Mosaic, Minimalist Modern)
 */

import React from 'react';
import { 
  Palette, 
  X, 
  Check, 
  Layout, 
  Sparkles, 
  Layers, 
  Eye, 
  Sun, 
  Moon,
  Brush,
  Zap,
  BookOpen
} from 'lucide-react';
import { 
  ThemePresetId, 
  HeroLayoutMode, 
  CategoryCardStyle, 
  THEME_PRESETS 
} from '../utils/theme.ts';

interface StyleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemePresetId;
  onSelectTheme: (theme: ThemePresetId) => void;
  activeHeroMode: HeroLayoutMode;
  onSelectHeroMode: (mode: HeroLayoutMode) => void;
  activeCardStyle: CategoryCardStyle;
  onSelectCardStyle: (style: CategoryCardStyle) => void;
}

export const StyleSwitcherModal: React.FC<StyleSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onSelectTheme,
  activeHeroMode,
  onSelectHeroMode,
  activeCardStyle,
  onSelectCardStyle,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0C2229]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-[#E4EAE9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E4EAE9] flex items-center justify-between bg-[#FBFDFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E7F6F8] flex items-center justify-center text-[#077E88]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-[#0C2229]">
                  Website Style & Theme Explorer
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#E7F6F8] text-[#077E88] text-[10px] font-bold uppercase">
                  Live Preview
                </span>
              </div>
              <p className="text-xs text-[#5E7379] mt-0.5">
                Switch between contest design entries, typography styles, and layout presentations in real time.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4F7F6] hover:bg-[#E4EAE9] text-[#0C2229] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-left">
          
          {/* Section 1: Visual Theme Presets */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#76898E] flex items-center gap-1.5">
                <Brush className="w-3.5 h-3.5 text-[#077E88]" />
                <span>1. Color Palette & Brand Style Preset</span>
              </label>
              <span className="text-[11px] text-[#077E88] font-semibold">
                Instant site-wide update
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(THEME_PRESETS).map((preset) => {
                const isSelected = activeTheme === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => onSelectTheme(preset.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left relative ${
                      isSelected
                        ? 'border-[#077E88] bg-[#F3FAFA] shadow-sm ring-2 ring-[#077E88]/10'
                        : 'border-[#E4EAE9] hover:border-[#CAD7D6] bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#0C2229]">
                          {preset.badge}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#077E88] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <h4 className="font-display text-sm font-bold text-[#0C2229]">
                        {preset.name}
                      </h4>
                      <p className="text-[11px] text-[#5E7379] mt-1 leading-relaxed">
                        {preset.tagline}
                      </p>
                    </div>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-100">
                      <div
                        className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: preset.primaryTeal }}
                        title="Primary Color"
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: preset.accentSecondary }}
                        title="Secondary Color"
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: preset.primaryLight }}
                        title="Tint Color"
                      />
                      <span className="text-[10px] text-[#76898E] ml-auto font-mono">
                        {preset.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Hero Section Layout Style */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#76898E] flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-[#077E88]" />
                <span>2. Hero Section Layout Presentation</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => onSelectHeroMode('cover-image')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  activeHeroMode === 'cover-image'
                    ? 'border-[#077E88] bg-[#F3FAFA] ring-2 ring-[#077E88]/10'
                    : 'border-[#E4EAE9] hover:bg-[#F9FCFC] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#0C2229]">Full Cover Image</span>
                  {activeHeroMode === 'cover-image' && <Check className="w-3.5 h-3.5 text-[#077E88]" />}
                </div>
                <p className="text-[11px] text-[#5E7379]">
                  Immersive full-bleed cover photography with glassmorphic prompt and verified pro badges.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onSelectHeroMode('studio')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  activeHeroMode === 'studio'
                    ? 'border-[#077E88] bg-[#F3FAFA] ring-2 ring-[#077E88]/10'
                    : 'border-[#E4EAE9] hover:bg-[#F9FCFC] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#0C2229]">Interactive Studio</span>
                  {activeHeroMode === 'studio' && <Check className="w-3.5 h-3.5 text-[#077E88]" />}
                </div>
                <p className="text-[11px] text-[#5E7379]">
                  Side-by-side prompt with tall photography showcase and live bid preview.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onSelectHeroMode('video-spotlight')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  activeHeroMode === 'video-spotlight'
                    ? 'border-[#077E88] bg-[#F3FAFA] ring-2 ring-[#077E88]/10'
                    : 'border-[#E4EAE9] hover:bg-[#F9FCFC] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#0C2229]">Video Spotlight</span>
                  {activeHeroMode === 'video-spotlight' && <Check className="w-3.5 h-3.5 text-[#077E88]" />}
                </div>
                <p className="text-[11px] text-[#5E7379]">
                  Promotional video player front and center with project photo strip.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onSelectHeroMode('minimal-split')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  activeHeroMode === 'minimal-split'
                    ? 'border-[#077E88] bg-[#F3FAFA] ring-2 ring-[#077E88]/10'
                    : 'border-[#E4EAE9] hover:bg-[#F9FCFC] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#0C2229]">Minimalist Split</span>
                  {activeHeroMode === 'minimal-split' && <Check className="w-3.5 h-3.5 text-[#077E88]" />}
                </div>
                <p className="text-[11px] text-[#5E7379]">
                  Side-by-side homeowner and contractor photo cards with fast-track signup.
                </p>
              </button>
            </div>
          </div>

          {/* Section 3: Categories Presentation Style */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#76898E] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#077E88]" />
                <span>3. Category Cards Presentation Style</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => onSelectCardStyle('blend')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  activeCardStyle === 'blend'
                    ? 'border-[#077E88] bg-[#F3FAFA] ring-2 ring-[#077E88]/10'
                    : 'border-[#E4EAE9] hover:bg-[#F9FCFC] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#0C2229]">Figma Photo Blend</span>
                  {activeCardStyle === 'blend' && <Check className="w-3.5 h-3.5 text-[#077E88]" />}
                </div>
                <p className="text-[11px] text-[#5E7379]">
                  Image 6 style with top-right feathered photo gradient and top-left icon badge.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onSelectCardStyle('mosaic')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  activeCardStyle === 'mosaic'
                    ? 'border-[#077E88] bg-[#F3FAFA] ring-2 ring-[#077E88]/10'
                    : 'border-[#E4EAE9] hover:bg-[#F9FCFC] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#0C2229]">Visual Mosaic</span>
                  {activeCardStyle === 'mosaic' && <Check className="w-3.5 h-3.5 text-[#077E88]" />}
                </div>
                <p className="text-[11px] text-[#5E7379]">
                  Large vivid photography cover cards with instant subservice pills.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onSelectCardStyle('minimal')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  activeCardStyle === 'minimal'
                    ? 'border-[#077E88] bg-[#F3FAFA] ring-2 ring-[#077E88]/10'
                    : 'border-[#E4EAE9] hover:bg-[#F9FCFC] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#0C2229]">Minimalist Modern</span>
                  {activeCardStyle === 'minimal' && <Check className="w-3.5 h-3.5 text-[#077E88]" />}
                </div>
                <p className="text-[11px] text-[#5E7379]">
                  Clean monochrome icons, thin line borders, and compact service lists.
                </p>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E4EAE9] bg-[#FBFDFC] flex items-center justify-between">
          <div className="text-[11px] text-[#76898E]">
            Selected: <strong className="text-[#0C2229]">{THEME_PRESETS[activeTheme].name}</strong> · {activeHeroMode} · {activeCardStyle}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs font-bold shadow-xs transition-all"
          >
            Apply & View Website
          </button>
        </div>
      </div>
    </div>
  );
};
