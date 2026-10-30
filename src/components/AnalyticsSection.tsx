/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { WaitlistStats, WaitlistSubmission, generateWaitlistCSV } from '../utils/waitlist.ts';
import { Download, Users, TrendingUp, Globe2, Shield, Settings, SlidersHorizontal } from 'lucide-react';

interface AnalyticsSectionProps {
  t: TranslationDictionary;
  stats: WaitlistStats;
  entries: WaitlistSubmission[];
  onOpenAdmin: () => void;
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  t,
  stats,
  entries,
  onOpenAdmin,
}) => {
  const handleExportCSV = () => {
    const csvData = generateWaitlistCSV(entries);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.setAttribute('download', `loqelo-waitlist-contacts-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const countriesList = Object.entries(stats.countryBreakdown).sort((a, b) => b[1] - a[1]);
  const totalInCountries = countriesList.reduce((acc, curr) => acc + curr[1], 0) || 1;

  return (
    <section id="analytics-section" className="py-16 sm:py-24 bg-[#F4F7F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <p className="text-xs font-bold text-[#077E88] tracking-widest uppercase">
            {t.analytics.kicker}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0C2229]">
            {t.analytics.title}
          </h2>
          <p className="text-sm sm:text-base text-[#3D5259]">
            {t.analytics.subtitle}
          </p>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* Card 1: Visitors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-3xl p-6 border border-[#E4EAE9] shadow-xs space-y-3 cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#76898E] uppercase tracking-wider">
                {t.analytics.totalVisitors}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#E7F3F3] text-[#077E88] flex items-center justify-center">
                <Globe2 className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-[#0C2229] tabular-nums">
              {stats.totalVisitors.toLocaleString()}
            </div>
            <span className="text-xs text-[#2E9A77] font-semibold flex items-center gap-1">
              <span>↑ Live visitor tracking</span>
            </span>
          </motion.div>

          {/* Card 2: Total Signups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-3xl p-6 border border-[#E4EAE9] shadow-xs space-y-3 cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#76898E] uppercase tracking-wider">
                {t.analytics.totalSignups}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#E9F7F1] text-[#2E9A77] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-[#077E88] tabular-nums">
              {stats.totalSignups.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#76898E]">
              <span>{stats.customersCount} Customers</span>
              <span>·</span>
              <span>{stats.contractorsCount} Pros</span>
            </div>
          </motion.div>

          {/* Card 3: Conversion Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-3xl p-6 border border-[#E4EAE9] shadow-xs space-y-3 cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#76898E] uppercase tracking-wider">
                {t.analytics.conversionRate}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#FDF1E2] text-[#E8912C] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-[#0C2229] tabular-nums">
              {stats.conversionRate}%
            </div>
            <span className="text-xs text-[#76898E]">Form signups / unique visitors</span>
          </motion.div>

          {/* Card 4: Role Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.24 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-3xl p-6 border border-[#E4EAE9] shadow-xs space-y-3 cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#76898E] uppercase tracking-wider">
                Audience Ratio
              </span>
              <div className="w-8 h-8 rounded-full bg-[#E6F1F8] text-[#0677BA] flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
            
            {/* Visual ratio bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#077E88]">
                  {Math.round((stats.customersCount / (stats.totalSignups || 1)) * 100)}% Cust
                </span>
                <span className="text-[#0C2229]">
                  {Math.round((stats.contractorsCount / (stats.totalSignups || 1)) * 100)}% Pros
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#E4EAE9] overflow-hidden flex">
                <motion.div
                  className="bg-[#077E88] h-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(stats.customersCount / (stats.totalSignups || 1)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <motion.div
                  className="bg-[#0C2229] h-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(stats.contractorsCount / (stats.totalSignups || 1)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            <span className="text-[11px] text-[#76898E] block">
              Healthy balance across supply & demand
            </span>
          </motion.div>

        </div>

        {/* Detailed Country Breakdown & Action Console */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#E4EAE9] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Country Distribution */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-[#0C2229]">
                Geographic Breakdown of Signups
              </h3>
              <span className="text-xs text-[#76898E]">Across European & International Markets</span>
            </div>

            <div className="space-y-3">
              {countriesList.slice(0, 5).map(([cName, count]) => {
                const pct = Math.round((count / totalInCountries) * 100);
                return (
                  <div key={cName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium text-[#3D5259]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#077E88]"></span>
                        <span>{cName}</span>
                      </span>
                      <span className="tabular-nums font-semibold text-[#0C2229]">
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#F4F7F6] overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#077E88] to-[#65C8A6] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Export & Administration Controls */}
          <div className="lg:col-span-5 bg-[#F4F7F6] p-6 rounded-2xl border border-[#E4EAE9] space-y-5">
            <div className="space-y-1">
              <h4 className="font-display text-base font-bold text-[#0C2229]">
                Contact Management & Data Export
              </h4>
              <p className="text-xs text-[#76898E]">
                Distinguish customers from contractors, inspect registrations, and export data in standard CSV format.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleExportCSV}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t.analytics.exportCSVBtn}</span>
              </button>

              <button
                type="button"
                onClick={onOpenAdmin}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-[#0C2229] border border-[#E4EAE9] text-xs sm:text-sm font-semibold transition-all shadow-2xs"
              >
                <Settings className="w-4 h-4 text-[#76898E]" />
                <span>{t.analytics.manageContactsBtn}</span>
              </button>
            </div>

            {/* GDPR Insulated Privacy Notice */}
            <div className="flex items-start gap-2 text-[11px] text-[#76898E] pt-2 border-t border-[#E4EAE9]">
              <Shield className="w-4 h-4 text-[#2E9A77] shrink-0 mt-0.5" />
              <span>{t.analytics.privacyNote}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
