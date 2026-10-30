/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { 
  Sparkles, 
  Coins, 
  Zap, 
  LayoutGrid, 
  Columns3, 
  CheckCircle2, 
  Clock, 
  Eye, 
  MessageSquare, 
  Send,
  HelpCircle
} from 'lucide-react';

interface LiveQuoteComparisonSectionProps {
  t: TranslationDictionary;
  onPostJobClick: () => void;
}

interface QuoteItem {
  id: string;
  provider: string;
  initials: string;
  avatarBg: string;
  badge?: string;
  badgeColor?: string;
  price: number;
  days: string;
  startDate: string;
  rating: number;
  reviewsCount: number;
  jobsDone: number;
  successRate: number;
  proposalNote: string;
}

export const LiveQuoteComparisonSection: React.FC<LiveQuoteComparisonSectionProps> = ({
  onPostJobClick,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'compare'>('cards');
  const [selectedOfferId, setSelectedOfferId] = useState<string>('nc');
  const [newQuestion, setNewQuestion] = useState('');
  
  const [qaList, setQaList] = useState([
    {
      id: 1,
      author: 'Sparkle and Shine',
      authorInitials: 'SS',
      time: '5h ago',
      question: 'How many windows are there, and are any on the upper floor?',
      answer: '14 windows, 5 of them upstairs. All can be opened from the inside.'
    },
    {
      id: 2,
      author: 'Klara Nowak',
      authorInitials: 'KN',
      time: '3h ago',
      question: 'Is there water and a power socket near the driveway for the car wash?',
      answer: 'Yes, an outdoor tap and socket right next to the driveway.'
    }
  ]);

  const quotes: QuoteItem[] = [
    {
      id: 'nc',
      provider: 'Nordic Clean Co.',
      initials: 'NC',
      avatarBg: '#077E88',
      badge: 'Best match',
      badgeColor: 'bg-[#E7F6F8] text-[#077E88]',
      price: 340,
      days: '2 days',
      startDate: 'Mon 5 Oct',
      rating: 4.9,
      reviewsCount: 212,
      jobsDone: 126,
      successRate: 97,
      proposalNote: '“I can start work this coming Monday. Windows inside and out, SUV full valet.”'
    },
    {
      id: 'kn',
      provider: 'Klara Nowak',
      initials: 'KN',
      avatarBg: '#9B51E0',
      badge: 'Lowest price',
      badgeColor: 'bg-[#FFF6EA] text-[#E8912C]',
      price: 295,
      days: '3 days',
      startDate: 'Tue 6 Oct',
      rating: 4.7,
      reviewsCount: 96,
      jobsDone: 88,
      successRate: 94,
      proposalNote: '“Lowest price guarantee, own ladders and water-fed poles for the first floor.”'
    },
    {
      id: 'fn',
      provider: 'Fresh Nest',
      initials: 'FN',
      avatarBg: '#0C2229',
      badge: 'Fastest',
      badgeColor: 'bg-[#EBF6FE] text-[#0A74DA]',
      price: 410,
      days: '1 day',
      startDate: 'Sat 3 Oct',
      rating: 5.0,
      reviewsCount: 301,
      jobsDone: 214,
      successRate: 99,
      proposalNote: '“Team of 3, everything done in one day, eco products and insured coverage.”'
    },
    {
      id: 'bc',
      provider: 'Brightside Cleaning',
      initials: 'BC',
      avatarBg: '#6C5DD3',
      price: 365,
      days: '2 days',
      startDate: 'Wed 7 Oct',
      rating: 4.8,
      reviewsCount: 64,
      jobsDone: 57,
      successRate: 96,
      proposalNote: '“Available on your preferred date, 10 October. Special stain remover included.”'
    },
    {
      id: 'im',
      provider: 'Ivan Mazur',
      initials: 'IM',
      avatarBg: '#D97706',
      price: 320,
      days: '2 days',
      startDate: 'Thu 8 Oct',
      rating: 4.6,
      reviewsCount: 31,
      jobsDone: 34,
      successRate: 91,
      proposalNote: '“Independent contractor, 6 years of experience, references available.”'
    }
  ];

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    
    setQaList(prev => [
      ...prev,
      {
        id: Date.now(),
        author: 'Prospective Client',
        authorInitials: 'PC',
        time: 'Just now',
        question: newQuestion.trim(),
        answer: 'Providers will be notified and can answer publicly on Loqelo.'
      }
    ]);
    setNewQuestion('');
  };

  return (
    <section id="quote-comparison" className="py-16 sm:py-24 bg-[#F4F7F6] border-t border-[#E4EAE9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container matching image34_53bfd2e3.png */}
        <div className="rounded-3xl bg-white border border-[#E4EAE9] p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAE9] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F6F8] text-[#077E88] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Client Experience Preview</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0C2229]">
                5 offers received
              </h2>
              <p className="text-xs sm:text-sm text-[#76898E] mt-0.5">
                Choose now or wait for more offers.
              </p>
            </div>

            {/* Cards vs Compare View Toggle */}
            <div className="flex items-center p-1 bg-[#F4F7F6] rounded-xl border border-[#E4EAE9] self-start sm:self-center">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white text-[#0C2229] shadow-xs'
                    : 'text-[#76898E] hover:text-[#0C2229]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('compare')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'compare'
                    ? 'bg-white text-[#0C2229] shadow-xs'
                    : 'text-[#76898E] hover:text-[#0C2229]'
                }`}
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span>Compare</span>
              </button>
            </div>
          </div>

          {/* Top 3 Highlighting Cards matching image34_53bfd2e3.png */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Best match */}
            <div 
              onClick={() => setSelectedOfferId('nc')}
              className={`rounded-2xl p-4 border transition-all cursor-pointer flex items-center gap-3.5 ${
                selectedOfferId === 'nc'
                  ? 'border-[#077E88] bg-[#E7F6F8]/30 shadow-xs'
                  : 'border-[#E4EAE9] bg-white hover:border-[#077E88]/40'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#077E88] to-[#65C8A6] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#077E88] uppercase tracking-wider block">
                  Best match
                </span>
                <h4 className="font-display font-bold text-sm text-[#0C2229]">
                  Nordic Clean Co.
                </h4>
                <div className="text-xs text-[#5E7379] flex items-center gap-1.5 mt-0.5">
                  <span className="font-bold text-[#0C2229]">€340</span>
                  <span>·</span>
                  <span>2 days</span>
                  <span>·</span>
                  <span>★ 4.9</span>
                </div>
              </div>
            </div>

            {/* Card 2: Lowest price */}
            <div 
              onClick={() => setSelectedOfferId('kn')}
              className={`rounded-2xl p-4 border transition-all cursor-pointer flex items-center gap-3.5 ${
                selectedOfferId === 'kn'
                  ? 'border-[#E8912C] bg-[#FFF8EE] shadow-xs'
                  : 'border-[#E4EAE9] bg-white hover:border-[#E8912C]/40'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-[#F4F7F6] border border-[#E4EAE9] text-[#0C2229] flex items-center justify-center shrink-0 text-base font-bold">
                €
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#E8912C] uppercase tracking-wider block">
                  Lowest price
                </span>
                <h4 className="font-display font-bold text-sm text-[#0C2229]">
                  Klara Nowak
                </h4>
                <div className="text-xs text-[#5E7379] flex items-center gap-1.5 mt-0.5">
                  <span className="font-bold text-[#0C2229]">€295</span>
                  <span>·</span>
                  <span>3 days</span>
                  <span>·</span>
                  <span>★ 4.7</span>
                </div>
              </div>
            </div>

            {/* Card 3: Fastest */}
            <div 
              onClick={() => setSelectedOfferId('fn')}
              className={`rounded-2xl p-4 border transition-all cursor-pointer flex items-center gap-3.5 ${
                selectedOfferId === 'fn'
                  ? 'border-[#0A74DA] bg-[#F0F7FF] shadow-xs'
                  : 'border-[#E4EAE9] bg-white hover:border-[#0A74DA]/40'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-[#F4F7F6] border border-[#E4EAE9] text-[#0A74DA] flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#0A74DA] uppercase tracking-wider block">
                  Fastest
                </span>
                <h4 className="font-display font-bold text-sm text-[#0C2229]">
                  Fresh Nest
                </h4>
                <div className="text-xs text-[#5E7379] flex items-center gap-1.5 mt-0.5">
                  <span className="font-bold text-[#0C2229]">€410</span>
                  <span>·</span>
                  <span>1 day</span>
                  <span>·</span>
                  <span>★ 5.0</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Price Spread Bar matching image34_53bfd2e3.png */}
          <div className="p-5 rounded-2xl bg-[#F4F7F6] border border-[#E4EAE9] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#76898E]">
              <span>€250</span>
              <span className="font-bold text-[#0C2229] bg-white px-2.5 py-0.5 rounded-full border border-[#E4EAE9]">
                avg €346
              </span>
              <span>€500</span>
            </div>

            {/* Spectrum line with provider dots */}
            <div className="relative w-full h-2.5 rounded-full bg-[#E4EAE9] my-6">
              {/* Highlight fill */}
              <div className="absolute top-0 bottom-0 left-[18%] right-[25%] bg-gradient-to-r from-[#2E9A77] via-[#077E88] to-[#0A74DA] rounded-full" />
              
              {/* KN dot (€295) */}
              <div 
                onClick={() => setSelectedOfferId('kn')}
                style={{ left: '18%' }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#9B51E0] text-white flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer hover:scale-110 transition-transform"
                title="Klara Nowak: €295"
              >
                KN
              </div>

              {/* IM dot (€320) */}
              <div 
                onClick={() => setSelectedOfferId('im')}
                style={{ left: '28%' }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer hover:scale-110 transition-transform"
                title="Ivan Mazur: €320"
              >
                IM
              </div>

              {/* Nordic Clean Co. dot (€340) */}
              <div 
                onClick={() => setSelectedOfferId('nc')}
                style={{ left: '38%' }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#077E88] text-white flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer hover:scale-110 transition-transform ring-2 ring-white"
                title="Nordic Clean Co.: €340"
              >
                NC
              </div>

              {/* BC dot (€365) */}
              <div 
                onClick={() => setSelectedOfferId('bc')}
                style={{ left: '48%' }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#6C5DD3] text-white flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer hover:scale-110 transition-transform"
                title="Brightside Cleaning: €365"
              >
                BC
              </div>

              {/* FN dot (€410) */}
              <div 
                onClick={() => setSelectedOfferId('fn')}
                style={{ left: '72%' }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0C2229] text-white flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer hover:scale-110 transition-transform"
                title="Fresh Nest: €410"
              >
                FN
              </div>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-[#76898E]">
                Price spread of all offers · Click any initial dot to inspect provider
              </span>
            </div>
          </div>

          {/* List of Quotes matching image40_6b583f3f.png */}
          <div className="space-y-3 pt-2">
            {quotes.map((q, qIdx) => {
              const isSelected = selectedOfferId === q.id;

              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: qIdx * 0.06 }}
                  whileHover={{ y: -3, scale: 1.008 }}
                  onClick={() => setSelectedOfferId(q.id)}
                  className={`rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#077E88] bg-[#FBFDFC] shadow-md ring-2 ring-[#077E88]/20'
                      : 'border-[#E4EAE9] bg-white hover:border-[#077E88]/40 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Provider Info */}
                    <div className="flex items-center gap-3.5">
                      <div 
                        style={{ backgroundColor: q.avatarBg }}
                        className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                      >
                        {q.initials}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-sm text-[#0C2229]">
                            {q.provider}
                          </h4>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#077E88]" />
                          {q.badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${q.badgeColor}`}>
                              {q.badge}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-[#76898E] flex items-center gap-3 mt-0.5">
                          <span>★ {q.rating} ({q.reviewsCount} reviews)</span>
                          <span>·</span>
                          <span>{q.jobsDone} jobs</span>
                          <span>·</span>
                          <span className="text-[#2E9A77] font-semibold">{q.successRate}% success</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E4EAE9]">
                      <div className="text-left sm:text-right">
                        <div className="font-display font-bold text-lg text-[#0C2229]">
                          €{q.price}
                        </div>
                        <span className="text-[11px] text-[#76898E]">
                          {q.days} · from {q.startDate}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPostJobClick();
                        }}
                        className="px-5 py-2 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                      >
                        Select
                      </button>
                    </div>

                  </div>

                  {/* Proposal Note */}
                  <div className="mt-3 pt-3 border-t border-[#E4EAE9]/70 text-xs text-[#5E7379] italic flex items-center justify-between">
                    <span>{q.proposalNote}</span>
                    <span className="text-[11px] not-italic text-[#077E88] font-semibold hover:underline shrink-0 ml-4">
                      View profile
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Questions and Answers Module matching image35_58931e0f.png */}
          <div className="pt-6 border-t border-[#E4EAE9] space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-[#0C2229]">
                  Questions and answers ({qaList.length})
                </h3>
                <p className="text-xs text-[#76898E] flex items-center gap-1.5 mt-0.5">
                  <Eye className="w-3.5 h-3.5 text-[#077E88]" />
                  <span>Visible to every pro interested in this job. Phone numbers and emails are hidden automatically.</span>
                </p>
              </div>
            </div>

            {/* QA Items */}
            <div className="space-y-3.5">
              {qaList.map((qa) => (
                <div key={qa.id} className="p-4 rounded-2xl bg-[#F4F7F6] border border-[#E4EAE9] space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#0C2229] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {qa.authorInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0C2229]">{qa.author}</span>
                        <span className="text-[10px] text-[#76898E]">{qa.time}</span>
                      </div>
                      <p className="text-xs text-[#3D5259] mt-0.5 font-medium">{qa.question}</p>
                    </div>
                  </div>

                  {/* Customer's Answer */}
                  <div className="ml-10 p-3 rounded-xl bg-white border border-[#E4EAE9] text-xs space-y-0.5">
                    <span className="text-[10px] font-bold text-[#077E88] uppercase tracking-wider block">
                      Your answer
                    </span>
                    <p className="text-[#3D5259]">{qa.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form to ask / post an answer */}
            <form onSubmit={handleSendQuestion} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Ask a clarifying question to service providers..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E4EAE9] text-xs focus:outline-none focus:border-[#077E88] bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#077E88] hover:bg-[#05626A] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
