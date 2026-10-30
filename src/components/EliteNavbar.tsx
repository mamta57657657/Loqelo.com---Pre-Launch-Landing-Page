/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Header Navigation matching the clean, white top navigation bar from the reference design.
 */

import React, { useState } from 'react';
import { Search, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface EliteNavbarProps {
  onOpenQuote: () => void;
  onOpenSearch: () => void;
}

export function EliteNavbar({ onOpenQuote, onOpenSearch }: EliteNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2ECE0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo Zone */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
            {/* Circular Stepping Stone & Plant Emblem */}
            <div className="w-11 h-11 rounded-full bg-[#16572E] border-2 border-[#84CC16] flex items-center justify-center p-1.5 shadow-sm text-white relative overflow-hidden group">
              <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-current" strokeWidth="2">
                <circle cx="20" cy="20" r="16" stroke="#84CC16" strokeWidth="1.5" />
                {/* Stepping stones */}
                <path d="M12 25 C14 22 20 22 23 25" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 16 C20 13 26 13 28 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                {/* Sprout leaf */}
                <path d="M20 30 L20 18 C20 12 26 10 26 10 C26 15 22 17 20 18" fill="#84CC16" stroke="#84CC16" />
                <path d="M20 22 C15 17 14 12 14 12 C18 12 20 17 20 22" fill="#A3E635" stroke="#A3E635" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="font-['Oswald'] font-bold text-xl tracking-wider text-[#16572E] uppercase leading-tight">
                ELITE OUTDOOR
              </span>
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#65A30D] uppercase leading-none">
                SOLUTION
              </span>
            </div>
          </div>

          {/* Nav Links Zone (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold uppercase tracking-wider text-[#1C2A20]">
            <button
              onClick={() => scrollToSection('home')}
              className="text-[#16572E] border-b-2 border-[#16572E] py-1 transition-colors hover:text-[#16572E]"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-[#16572E] py-1 transition-colors"
            >
              ABOUT US
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-[#16572E] py-1 transition-colors"
            >
              SERVICES
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-[#16572E] py-1 transition-colors"
            >
              TESTIMONIALS
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-[#16572E] py-1 transition-colors"
            >
              GALLERY
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#16572E] py-1 transition-colors"
            >
              CONTACT US
            </button>
          </nav>

          {/* Action Zone: Search + QUOTE REQUEST Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#1C2A20] hover:text-[#16572E] hover:bg-[#F2F7EE] rounded-full transition-colors cursor-pointer"
              aria-label="Search landscaping services"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenQuote}
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[#84CC16] hover:bg-[#74B32A] active:scale-95 text-[#0F3E20] font-['Oswald'] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-md shadow-sm transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">QUOTE REQUEST</span>
              <span className="sm:hidden">QUOTE</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1C2A20] hover:bg-[#F2F7EE] rounded-md transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2ECE0] px-6 py-5 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider text-[#1C2A20]">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left py-2 hover:text-[#16572E] border-b border-[#F2F7EE]"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 hover:text-[#16572E] border-b border-[#F2F7EE]"
            >
              ABOUT US
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 hover:text-[#16572E] border-b border-[#F2F7EE]"
            >
              SERVICES
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-left py-2 hover:text-[#16572E] border-b border-[#F2F7EE]"
            >
              TESTIMONIALS
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-left py-2 hover:text-[#16572E] border-b border-[#F2F7EE]"
            >
              GALLERY
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 hover:text-[#16572E]"
            >
              CONTACT US
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 bg-[#84CC16] hover:bg-[#74B32A] text-[#0F3E20] font-['Oswald'] font-bold text-center tracking-wider uppercase rounded-md shadow-sm"
              >
                REQUEST A FREE QUOTE
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
