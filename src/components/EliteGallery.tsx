/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Our Gallery section matching the asymmetric photo collage grid, rich forest green
 * background, VIEW MORE button, and white grass blades silhouette transition.
 */

import React, { useState } from 'react';
import { Eye, X, ZoomIn, ArrowRight } from 'lucide-react';
import { GrassSilhouetteDivider } from './GrassSilhouetteDivider.tsx';
import { getAssetUrl } from '../utils/assets.ts';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Custom Perennial Shrub & Bed Architecture',
    category: 'Garden Design',
    image: '/assets/aistudio/garden_962c46dc.jpg',
    aspect: 'tall',
  },
  {
    id: 'g2',
    title: 'Estate Tree Care & Canopy Thinning',
    category: 'Tree Care',
    image: '/assets/aistudio/trees_8ac2c2ca.jpg',
    aspect: 'wide',
  },
  {
    id: 'g3',
    title: 'Precision Hedge Contour & Shaping',
    category: 'Hedge Care',
    image: '/assets/aistudio/hedge_ce00d38c.jpg',
    aspect: 'wide',
  },
  {
    id: 'g4',
    title: 'Architectural Turf & Stone Borders',
    category: 'Lawn Architecture',
    image: '/assets/aistudio/house_31508b24.jpg',
    aspect: 'square',
  },
  {
    id: 'g5',
    title: 'Formal Boxwood Topiary Pruning',
    category: 'Hedge Care',
    image: '/assets/aistudio/hedge2_0d57def8.jpg',
    aspect: 'square',
  },
];

interface EliteGalleryProps {
  onOpenQuote: () => void;
}

export function EliteGallery({ onOpenQuote }: EliteGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter((item) => item.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="gallery" className="relative bg-[#16572E] text-white pt-20 pb-0 overflow-hidden">
      {/* Background Subtle Leaf Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#84CC16_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl text-[#A3E635] font-bold mb-2">
            Our Gallery
          </p>

          <h2 className="font-['Oswald',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-white leading-tight mb-4">
            TRANSFORMATIONS YOU CAN TRUST
          </h2>

          <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed">
            Explore recent projects showcasing pristine lawns, sculptured privacy hedges, and revitalized garden architecture across Durham Region.
          </p>
        </div>

        {/* Asymmetric Collage Grid matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          
          {/* Left Column: 1 Tall Photo */}
          <div className="md:col-span-4 h-[360px] md:h-[500px]">
            <div
              onClick={() => setSelectedPhoto(GALLERY_ITEMS[0])}
              className="group relative w-full h-full rounded-xs overflow-hidden cursor-pointer shadow-md"
            >
              <img
                src={getAssetUrl(GALLERY_ITEMS[0].image)}
                alt={GALLERY_ITEMS[0].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#A3E635]">
                  {GALLERY_ITEMS[0].category}
                </span>
                <p className="font-['Oswald'] text-lg font-bold uppercase text-white mt-0.5">
                  {GALLERY_ITEMS[0].title}
                </p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Center Column: 2 Stacked Photos */}
          <div className="md:col-span-4 flex flex-col gap-4 lg:gap-5 h-[360px] md:h-[500px]">
            {/* Center Top */}
            <div
              onClick={() => setSelectedPhoto(GALLERY_ITEMS[1])}
              className="group relative flex-1 rounded-xs overflow-hidden cursor-pointer shadow-md"
            >
              <img
                src={getAssetUrl(GALLERY_ITEMS[1].image)}
                alt={GALLERY_ITEMS[1].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">
                  {GALLERY_ITEMS[1].category}
                </span>
                <p className="font-['Oswald'] text-sm sm:text-base font-bold uppercase text-white mt-0.5">
                  {GALLERY_ITEMS[1].title}
                </p>
              </div>
            </div>

            {/* Center Bottom */}
            <div
              onClick={() => setSelectedPhoto(GALLERY_ITEMS[2])}
              className="group relative flex-1 rounded-xs overflow-hidden cursor-pointer shadow-md"
            >
              <img
                src={getAssetUrl(GALLERY_ITEMS[2].image)}
                alt={GALLERY_ITEMS[2].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">
                  {GALLERY_ITEMS[2].category}
                </span>
                <p className="font-['Oswald'] text-sm sm:text-base font-bold uppercase text-white mt-0.5">
                  {GALLERY_ITEMS[2].title}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Stacked Photos */}
          <div className="md:col-span-4 flex flex-col gap-4 lg:gap-5 h-[360px] md:h-[500px]">
            {/* Right Top */}
            <div
              onClick={() => setSelectedPhoto(GALLERY_ITEMS[3])}
              className="group relative flex-1 rounded-xs overflow-hidden cursor-pointer shadow-md"
            >
              <img
                src={getAssetUrl(GALLERY_ITEMS[3].image)}
                alt={GALLERY_ITEMS[3].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">
                  {GALLERY_ITEMS[3].category}
                </span>
                <p className="font-['Oswald'] text-sm sm:text-base font-bold uppercase text-white mt-0.5">
                  {GALLERY_ITEMS[3].title}
                </p>
              </div>
            </div>

            {/* Right Bottom */}
            <div
              onClick={() => setSelectedPhoto(GALLERY_ITEMS[4])}
              className="group relative flex-1 rounded-xs overflow-hidden cursor-pointer shadow-md"
            >
              <img
                src={getAssetUrl(GALLERY_ITEMS[4].image)}
                alt={GALLERY_ITEMS[4].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">
                  {GALLERY_ITEMS[4].category}
                </span>
                <p className="font-['Oswald'] text-sm sm:text-base font-bold uppercase text-white mt-0.5">
                  {GALLERY_ITEMS[4].title}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* View More Button */}
        <div className="text-center mt-12 mb-16">
          <button
            onClick={onOpenQuote}
            className="px-8 py-3 bg-[#84CC16] hover:bg-[#74B32A] active:scale-95 text-[#0F3E20] font-['Oswald'] font-bold text-sm tracking-wider uppercase rounded-xs transition-colors shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            VIEW MORE
          </button>
        </div>

      </div>

      {/* Signature White Grass Blade Silhouette Transition to Contact Us */}
      <GrassSilhouetteDivider fillColor="#FFFFFF" height={58} />

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#0F3E20] rounded-sm overflow-hidden border border-[#84CC16]/40 shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="h-[60vh] sm:h-[70vh]">
              <img
                src={getAssetUrl(selectedPhoto.image)}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-[#16572E] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#A3E635] uppercase tracking-wider">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-['Oswald'] text-xl font-bold uppercase text-white mt-1">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  onOpenQuote();
                }}
                className="px-6 py-2.5 bg-[#84CC16] text-[#0F3E20] font-['Oswald'] font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-[#74B32A]"
              >
                REQUEST SIMILAR SERVICE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
