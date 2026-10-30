/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Explore Service Categories component matching Figma and uploaded designs:
 * 1. "Explore Service Categories" pill filter with active teal state & dropdown menu (Image 5)
 * 2. 8-card grid with top-left round category badge, top-right faded photo overlay, title, subtitle & arrow (Image 6)
 * 3. High-resolution Pixabay gallery lightbox preview
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { 
  ArrowRight, 
  X, 
  Maximize2,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  iconSvg: string;
  primaryImage: string;
  subServices: string[];
  gallery: { src: string; caption: string }[];
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 'home',
    name: 'Home and Apartment',
    subtitle: 'Cleaning, maintenance, repairs and more.',
    iconSvg: '/assets/aistudio/loqelo-home_6ad5effe.svg',
    primaryImage: '/assets/aistudio/home_aab0574c.jpg',
    subServices: [
      'House cleaning',
      'Window washing',
      'Deep carpet cleaning',
      'Airbnb changeover',
      'End of tenancy clean'
    ],
    gallery: [
      { src: '/assets/aistudio/home_aab0574c.jpg', caption: 'Full home cleaning & deep housekeeping' },
      { src: '/assets/aistudio/windows_5cf1f912.jpg', caption: 'Streak-free window washing & frame care' },
      { src: '/assets/aistudio/living_1952c2b8.jpg', caption: 'Living room refresh & upholstery clean' },
      { src: '/assets/aistudio/house_31508b24.jpg', caption: 'Apartment exterior & facade maintenance' }
    ]
  },
  {
    id: 'garden',
    name: 'Garden and Outdoor Areas',
    subtitle: 'Lawn care, landscaping, planting and more.',
    iconSvg: '/assets/aistudio/loqelo-leaf_e01b4c1f.svg',
    primaryImage: '/assets/aistudio/lawn_53235d3c.jpg',
    subServices: [
      'Lawn mowing & edging',
      'Hedge trimming',
      'Tree pruning & lopping',
      'Patio jet washing',
      'Weeding & flowerbed care'
    ],
    gallery: [
      { src: '/assets/aistudio/lawn_53235d3c.jpg', caption: 'Precision lawn mowing & grass aeration' },
      { src: '/assets/aistudio/garden_14e81227.jpg', caption: 'Artisanal hedge trimming & shears work' },
      { src: '/assets/aistudio/hedge_ce00d38c.jpg', caption: 'Geometric boxwood and privet shaping' },
      { src: '/assets/aistudio/hedge2_0d57def8.jpg', caption: 'Garden terrace & relaxation zone prep' },
      { src: '/assets/aistudio/trees_8ac2c2ca.jpg', caption: 'Mature tree care & crown thinning' },
      { src: '/assets/aistudio/irrigation_48ece42b.jpg', caption: 'Automated irrigation & landscape piping' },
      { src: '/assets/aistudio/garden_962c46dc.jpg', caption: 'Perennial garden beds & seasonal cleanup' }
    ]
  },
  {
    id: 'construction',
    name: 'Construction and Renovation',
    subtitle: 'Building, remodeling, interior and exterior work.',
    iconSvg: '/assets/aistudio/loqelo-house_626eba7c.svg',
    primaryImage: '/assets/aistudio/build_2f14780e.jpg',
    subServices: [
      'Interior painting',
      'Drywall & plastering',
      'Flooring & tiling',
      'Carpentry & woodwork',
      'Roofing & insulation'
    ],
    gallery: [
      { src: '/assets/aistudio/build_2f14780e.jpg', caption: 'Structural remodeling & blueprint execution' },
      { src: '/assets/aistudio/house_31508b24.jpg', caption: 'Architectural exterior facade upgrades' },
      { src: '/assets/aistudio/hero_4b5d798a.jpg', caption: 'Turn-key complete residence makeover' }
    ]
  },
  {
    id: 'installations',
    name: 'Installations and Equipment',
    subtitle: 'Plumbing, electrical, heating, AC and more.',
    iconSvg: '/assets/aistudio/loqelo-plug_4f0bf635.svg',
    primaryImage: '/assets/aistudio/inst_e9767b60.jpg',
    subServices: [
      'Tap & pipe plumbing',
      'Fuseboard & wiring',
      'Boiler & radiator repairs',
      'Appliance fitting',
      'Smart home & lighting'
    ],
    gallery: [
      { src: '/assets/aistudio/inst_e9767b60.jpg', caption: 'Electrician inspecting fuseboard & relays' },
      { src: '/assets/aistudio/tap_548ce49d.jpg', caption: 'Designer faucet installation & seal repair' }
    ]
  },
  {
    id: 'pets',
    name: 'Pets',
    subtitle: 'Pet care, grooming, training and more.',
    iconSvg: '/assets/aistudio/loqelo-paw_ff8cc1a9.svg',
    primaryImage: '/assets/aistudio/pets_0b8d2573.jpg',
    subServices: [
      'Dog walking',
      'Mobile pet grooming',
      'Cat sitting visits',
      'Holiday pet boarding',
      'Puppy training sessions'
    ],
    gallery: [
      { src: '/assets/aistudio/pets_0b8d2573.jpg', caption: 'Gentle, stress-free dog coat grooming' }
    ]
  },
  {
    id: 'vehicles',
    name: 'Cars and Vehicles',
    subtitle: 'Washing, detailing, repairs and more.',
    iconSvg: '/assets/aistudio/loqelo-car_aef7cc63.svg',
    primaryImage: '/assets/aistudio/car_9b5332fd.jpg',
    subServices: [
      'Car washing',
      'Detailing',
      'Car upholstery cleaning',
      'Bodywork and painting'
    ],
    gallery: [
      { src: '/assets/aistudio/car_9b5332fd.jpg', caption: 'Driveway mobile valeting & ceramic shine' },
      { src: '/assets/aistudio/vehicles_83b027e5.jpg', caption: 'Vehicle maintenance & mechanics inspection' }
    ]
  },
  {
    id: 'personal',
    name: 'Personal Care and Services',
    subtitle: 'Wellness, childcare, care and more.',
    iconSvg: '/assets/aistudio/loqelo-care_0ee18545.svg',
    primaryImage: '/assets/aistudio/care_7bce5cd6.jpg',
    subServices: [
      'Elderly companionship',
      'Grocery & pharmacy runs',
      'Meal preparation',
      'Household assistance',
      'Doctor appointment escort'
    ],
    gallery: [
      { src: '/assets/aistudio/care_7bce5cd6.jpg', caption: 'Warm companionship & compassionate home help' }
    ]
  },
  {
    id: 'moving',
    name: 'Transportation and Moving',
    subtitle: 'Moving, delivery, passenger transport and more.',
    iconSvg: '/assets/aistudio/loqelo-truck_f50ab8be.svg',
    primaryImage: '/assets/aistudio/moving_6b536b0f.jpg',
    subServices: [
      'Apartment removals',
      'Two-man van transport',
      'Heavy item & piano lift',
      'Furniture assembly',
      'Packing & materials'
    ],
    gallery: [
      { src: '/assets/aistudio/moving_6b536b0f.jpg', caption: 'Freight van transport & regional delivery' },
      { src: '/assets/aistudio/boxes_b6189e69.jpg', caption: 'Apartment moving & secure packing' }
    ]
  }
];

import { CategoryCardStyle } from '../utils/theme.ts';
import { handleImageError, getAssetUrl } from '../utils/assets.ts';

interface CategoriesGridProps {
  t: TranslationDictionary;
  onSelectCategory: (categoryName: string) => void;
  cardStyle?: CategoryCardStyle;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ 
  onSelectCategory,
  cardStyle = 'blend'
}) => {
  // Pill bar active selection (Image 5 style) - default 'vehicles'
  const [activePillId, setActivePillId] = useState<string>('vehicles');
  const [activeModalCategory, setActiveModalCategory] = useState<CategoryItem | null>(null);
  const [modalPhotoIndex, setModalPhotoIndex] = useState<number>(0);

  const handlePillClick = (catId: string) => {
    setActivePillId(prev => prev === catId ? '' : catId);
  };

  const handleOpenGallery = (cat: CategoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModalCategory(cat);
    setModalPhotoIndex(0);
  };

  return (
    <section id="categories" className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#F4F8F8] to-white border-b border-[#E4EAE9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title matching Image 5: "Explore Service Categories" with underline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0C2229] tracking-tight">
            Explore Service Categories
          </h2>
          <div className="w-14 h-1 bg-[#077E88] rounded-full mx-auto mt-4 mb-3" />
          <p className="text-sm sm:text-base text-[#5E7379]">
            Browse vetted home, garden, and office services launching in February 2027.
          </p>
        </div>

        {/* 1. Interactive Pill Selector Bar matching Image 5 */}
        <div className="mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-start">
            {CATEGORIES_DATA.map((cat) => {
              const isActive = activePillId === cat.id;

              return (
                <div key={cat.id} className="relative flex flex-col">
                  {/* Pill button */}
                  <button
                    type="button"
                    onClick={() => handlePillClick(cat.id)}
                    className={`w-full py-3.5 px-4 rounded-2xl flex items-center gap-3 transition-all duration-200 text-left shadow-xs ${
                      isActive
                        ? 'bg-[#065A63] text-white shadow-md ring-2 ring-[#065A63]/30'
                        : 'bg-white hover:bg-[#F9FCFC] text-[#0C2229] border border-[#E4EAE9]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/20' : 'bg-[#E7F6F8]'
                    }`}>
                      <img
                        src={getAssetUrl(cat.iconSvg)}
                        alt=""
                        onError={handleImageError}
                        className={`w-4 h-4 ${isActive ? 'brightness-200' : ''}`}
                      />
                    </div>
                    <span className="font-display font-medium text-xs sm:text-sm leading-tight truncate">
                      {cat.name}
                    </span>
                  </button>

                  {/* Dropdown list when active matching Image 5 */}
                  {isActive && (
                    <div className="mt-1.5 p-3 rounded-2xl bg-[#DDF1F2] border border-[#BCE4E6] text-[#0C2229] space-y-1.5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150 z-10">
                      {cat.subServices.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          onClick={() => onSelectCategory(`${cat.name} - ${sub}`)}
                          className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/70 text-xs font-normal text-[#123E45] cursor-pointer transition-colors"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-[#077E88] shrink-0" />
                          <span className="truncate">{sub}</span>
                        </div>
                      ))}

                      <div className="pt-2 border-t border-[#BCE4E6] flex items-center justify-between text-[11px] px-1">
                        <button
                          type="button"
                          onClick={() => onSelectCategory(cat.name)}
                          className="font-bold text-[#077E88] hover:underline flex items-center gap-1"
                        >
                          <span>Explore all</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleOpenGallery(cat, e)}
                          className="text-[#077E88] hover:underline font-medium"
                        >
                          {cat.gallery.length} photos
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Eight Cards Grid supporting multiple design presentation styles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {CATEGORIES_DATA.map((cat, idx) => {
            // Style 1: Visual Mosaic (Full photo cover with dark overlay)
            if (cardStyle === 'mosaic') {
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => onSelectCategory(cat.name)}
                  className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[260px] border border-[#E4EAE9]"
                >
                  <img
                    src={getAssetUrl(cat.primaryImage)}
                    alt={cat.name}
                    onError={handleImageError}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                  <div className="relative z-10 p-5 flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                      <img src={getAssetUrl(cat.iconSvg)} alt="" onError={handleImageError} className="w-5 h-5 brightness-200" />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleOpenGallery(cat, e)}
                      title="View gallery photos"
                      className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="relative z-10 p-5 space-y-2 text-white">
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2">
                      {cat.subtitle}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-[#59D4DC]">
                      <span>{cat.subServices.length} services</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            }

            // Style 2: Minimalist Modern (Clean lines, light card, subservice pill badges)
            if (cardStyle === 'minimal') {
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => onSelectCategory(cat.name)}
                  className="group rounded-2xl bg-white border border-[#E4EAE9] hover:border-[#077E88] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F4F7F6] group-hover:bg-[#E7F6F8] flex items-center justify-center transition-colors">
                      <img src={getAssetUrl(cat.iconSvg)} alt="" onError={handleImageError} className="w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleOpenGallery(cat, e)}
                      className="text-xs text-[#077E88] hover:underline flex items-center gap-1"
                    >
                      <span>Photos</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-[#0C2229] group-hover:text-[#077E88] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#5E7379] mt-1 line-clamp-2">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F0F4F3]">
                    {cat.subServices.slice(0, 3).map((sub, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4F7F6] text-[#3D5259]">
                        {sub}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            }

            // Style 3 (Default): Figma Photo Blend matching Image 6
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                whileHover={{ y: -6, scale: 1.015 }}
                onClick={() => onSelectCategory(cat.name)}
                className="group relative rounded-3xl bg-white border border-[#E4EAE9] hover:border-[#077E88]/40 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer p-6 min-h-[220px]"
              >
                {/* Top-Right Faded Category Photo Overlay - Clear and vibrant presentation */}
                <div className="absolute top-0 right-0 w-48 h-44 overflow-hidden pointer-events-none rounded-tr-3xl">
                  <img
                    src={getAssetUrl(cat.primaryImage)}
                    alt={cat.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-white/95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent" />
                </div>

                {/* Top Left Teal Round Category Badge matching Image 6 */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-[#065A63] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <img
                      src={getAssetUrl(cat.iconSvg)}
                      alt=""
                      onError={handleImageError}
                      className="w-6 h-6 brightness-200"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleOpenGallery(cat, e)}
                    title="View gallery photos"
                    className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#0C2229] flex items-center justify-center shadow-xs transition-transform active:scale-95 opacity-80 group-hover:opacity-100"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#077E88]" />
                  </button>
                </div>

                {/* Content: Title & Subtitle */}
                <div className="relative z-10 pt-8 pb-3">
                  <h3 className="font-display text-lg font-bold text-[#0C2229] leading-snug group-hover:text-[#077E88] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#5E7379] mt-2 leading-relaxed line-clamp-2">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Bottom-Right Arrow */}
                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#F2F6F5]">
                  <span className="text-[11px] font-semibold text-[#76898E] group-hover:text-[#077E88] transition-colors">
                    {cat.subServices.length} popular services
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#E7F6F8] group-hover:bg-[#077E88] text-[#077E88] group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-12 p-6 rounded-3xl bg-[#E7F6F8] border border-[#CDEEF1] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#077E88] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-[#0C2229]">
                Are you a rated contractor in any of these categories?
              </h4>
              <p className="text-xs text-[#5E7379] mt-0.5">
                Join our verified contractor launch directory for zero commission during the first 6 months.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory('Contractor Priority')}
            className="shrink-0 px-6 py-2.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs font-bold tracking-tight shadow-xs transition-all"
          >
            Apply as Contractor
          </button>
        </div>

      </div>

      {/* Lightbox Photo Gallery Modal */}
      <AnimatePresence>
        {activeModalCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-[#0C2229]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveModalCategory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-[#E4EAE9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E7F6F8] flex items-center justify-center shrink-0">
                    <img
                      src={getAssetUrl(activeModalCategory.iconSvg)}
                      alt=""
                      onError={handleImageError}
                      className="w-5 h-5 text-[#077E88]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#077E88] uppercase tracking-wider block">
                      Loqelo Category · {activeModalCategory.gallery.length} Photos
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#0C2229]">
                      {activeModalCategory.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalCategory(null)}
                  className="w-8 h-8 rounded-full bg-[#F4F7F6] hover:bg-[#E4EAE9] text-[#0C2229] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body: Active Large Photo */}
              <div className="p-5 overflow-y-auto space-y-4">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={getAssetUrl(activeModalCategory.gallery[modalPhotoIndex]?.src || activeModalCategory.primaryImage)}
                    alt={activeModalCategory.gallery[modalPhotoIndex]?.caption || activeModalCategory.name}
                    onError={handleImageError}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 text-white">
                    <p className="text-sm font-medium">
                      {activeModalCategory.gallery[modalPhotoIndex]?.caption}
                    </p>
                    <p className="text-[11px] text-white/70">
                      Photo {modalPhotoIndex + 1} of {activeModalCategory.gallery.length} · Licensed Pixabay asset for Loqelo
                    </p>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {activeModalCategory.gallery.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {activeModalCategory.gallery.map((photo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setModalPhotoIndex(idx)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                          modalPhotoIndex === idx
                            ? 'border-[#077E88] scale-105 shadow-xs'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={getAssetUrl(photo.src)}
                          alt={photo.caption}
                          onError={handleImageError}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Service Details & Waitlist CTA */}
                <div className="p-4 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-[#0C2229]">
                      Need or offer {activeModalCategory.name} services in Feb 2027?
                    </div>
                    <div className="text-[11px] text-[#5E7379]">
                      Join the waiting list today to secure priority placement and launch perks.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const name = activeModalCategory.name;
                      setActiveModalCategory(null);
                      onSelectCategory(name);
                    }}
                    className="shrink-0 px-5 py-2.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs font-bold tracking-tight shadow-xs transition-all"
                  >
                    Join Waiting List
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
