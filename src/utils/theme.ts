/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Theme and Style configurations for Loqelo Pre-Launch Website.
 * Enables live switching between different design aesthetic directions:
 * 1. Figma Clean (Default Loqelo Brand)
 * 2. Nordic Warm Editorial (Contest Design #37726396)
 * 3. Vivid Emerald Tech (Contest Design #37722757)
 * 4. Dark Executive Stealth (Modern Dark Tech Mode)
 */

export type ThemePresetId = 'elite-green' | 'figma-clean' | 'nordic-warm' | 'emerald-tech' | 'dark-stealth';
export type HeroLayoutMode = 'cover-image' | 'studio' | 'video-spotlight' | 'minimal-split';
export type CategoryCardStyle = 'blend' | 'mosaic' | 'minimal';
export type CornerRadius = 'rounded-full' | 'rounded-xl' | 'rounded-2xl';

export interface ThemeConfig {
  id: ThemePresetId;
  name: string;
  tagline: string;
  badge: string;
  bgMain: string;
  bgCard: string;
  bgSubtle: string;
  textColor: string;
  textMuted: string;
  primaryTeal: string;
  primaryHover: string;
  primaryLight: string;
  accentSecondary: string;
  borderColor: string;
  headingFont: string;
  bodyFont: string;
  pillRadius: string;
  cardRadius: string;
  shadowLevel: string;
  isDark: boolean;
}

export const THEME_PRESETS: Record<ThemePresetId, ThemeConfig> = {
  'elite-green': {
    id: 'elite-green',
    name: 'Elite Forest & Lime (Design Match)',
    tagline: 'Deep Forest Green & Grass Lime with Organic Silhouettes (Reference Style)',
    badge: 'Design Match',
    bgMain: 'bg-[#FAFDF7]',
    bgCard: 'bg-white',
    bgSubtle: 'bg-[#F2F7EE]',
    textColor: 'text-[#1C2A20]',
    textMuted: 'text-[#5D7163]',
    primaryTeal: '#16572E',
    primaryHover: '#0F3E20',
    primaryLight: '#F2F7EE',
    accentSecondary: '#84CC16',
    borderColor: 'border-[#E2ECE0]',
    headingFont: "font-['Oswald'] uppercase tracking-wider",
    bodyFont: 'font-sans',
    pillRadius: 'rounded-sm',
    cardRadius: 'rounded-sm',
    shadowLevel: 'shadow-md',
    isDark: false,
  },
  'figma-clean': {
    id: 'figma-clean',
    name: 'Figma Clean (Official)',
    tagline: 'Fresh Mint & Deep Teal from Loqelo Brand Identity',
    badge: 'Official Kit',
    bgMain: 'bg-[#F4F7F6]',
    bgCard: 'bg-white',
    bgSubtle: 'bg-[#E7F3F3]',
    textColor: 'text-[#0C2229]',
    textMuted: 'text-[#5E7379]',
    primaryTeal: '#077E88',
    primaryHover: '#05626A',
    primaryLight: '#E7F6F8',
    accentSecondary: '#65C8A6',
    borderColor: 'border-[#E4EAE9]',
    headingFont: 'font-display',
    bodyFont: 'font-sans',
    pillRadius: 'rounded-full',
    cardRadius: 'rounded-2xl',
    shadowLevel: 'shadow-xs',
    isDark: false
  },
  'nordic-warm': {
    id: 'nordic-warm',
    name: 'Nordic Warm Editorial',
    tagline: 'Warm Cream & Amber Gold with Classic Serif Typography (Design #37726396)',
    badge: 'Editorial Chic',
    bgMain: 'bg-[#FAF8F5]',
    bgCard: 'bg-[#FFFFFF]',
    bgSubtle: 'bg-[#FDF4E7]',
    textColor: 'text-[#142328]',
    textMuted: 'text-[#6C7A80]',
    primaryTeal: '#D97706',
    primaryHover: '#B45309',
    primaryLight: '#FEF3C7',
    accentSecondary: '#05626A',
    borderColor: 'border-[#EBE4DC]',
    headingFont: 'font-serif',
    bodyFont: 'font-sans',
    pillRadius: 'rounded-xl',
    cardRadius: 'rounded-2xl',
    shadowLevel: 'shadow-md',
    isDark: false
  },
  'emerald-tech': {
    id: 'emerald-tech',
    name: 'Vivid Emerald Tech',
    tagline: 'High-contrast Modern SaaS with Energetic Emerald Accents (Design #37722757)',
    badge: 'Modern SaaS',
    bgMain: 'bg-[#F1F6F5]',
    bgCard: 'bg-white',
    bgSubtle: 'bg-[#D1FAE5]',
    textColor: 'text-[#0B171B]',
    textMuted: 'text-[#4D656D]',
    primaryTeal: '#059669',
    primaryHover: '#047857',
    primaryLight: '#ECFDF5',
    accentSecondary: '#10B981',
    borderColor: 'border-[#D1DFDC]',
    headingFont: 'font-sans font-bold',
    bodyFont: 'font-sans',
    pillRadius: 'rounded-full',
    cardRadius: 'rounded-3xl',
    shadowLevel: 'shadow-sm',
    isDark: false
  },
  'dark-stealth': {
    id: 'dark-stealth',
    name: 'Executive Dark Mode',
    tagline: 'Deep Obsidian & Neon Cyan with Glassmorphic Accents',
    badge: 'Pro Dark',
    bgMain: 'bg-[#071317]',
    bgCard: 'bg-[#0D2228]',
    bgSubtle: 'bg-[#122F37]',
    textColor: 'text-[#E6F3F5]',
    textMuted: 'text-[#8AA4AC]',
    primaryTeal: '#14B8A6',
    primaryHover: '#0D9488',
    primaryLight: '#0E363E',
    accentSecondary: '#2DD4BF',
    borderColor: 'border-[#1A3842]',
    headingFont: 'font-display',
    bodyFont: 'font-sans',
    pillRadius: 'rounded-full',
    cardRadius: 'rounded-2xl',
    shadowLevel: 'shadow-2xl',
    isDark: true
  }
};
