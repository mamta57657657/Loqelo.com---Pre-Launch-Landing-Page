/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WaitlistSubmission, generateWaitlistCSV } from '../utils/waitlist.ts';
import { X, Download, Trash2, Search, Filter, RefreshCw, CheckCircle, Shield } from 'lucide-react';

interface AdminConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: WaitlistSubmission[];
  onDeleteEntry: (id: string) => void;
  onResetSeedData: () => void;
}

export const AdminConsoleModal: React.FC<AdminConsoleModalProps> = ({
  isOpen,
  onClose,
  entries,
  onDeleteEntry,
  onResetSeedData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'contractor'>('all');
  const [countryFilter, setCountryFilter] = useState('all');

  if (!isOpen) return null;

  const filteredEntries = entries.filter((entry) => {
    if (roleFilter !== 'all' && entry.role !== roleFilter) return false;
    if (countryFilter !== 'all' && entry.country !== countryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEmail = entry.email.toLowerCase().includes(q);
      const matchCountry = entry.country.toLowerCase().includes(q);
      const matchCity = (entry.city || '').toLowerCase().includes(q);
      const matchRef = entry.referralCode.toLowerCase().includes(q);
      if (!matchEmail && !matchCountry && !matchCity && !matchRef) return false;
    }
    return true;
  });

  const uniqueCountries = Array.from(new Set(entries.map((e) => e.country))).sort();

  const handleExport = () => {
    const csv = generateWaitlistCSV(filteredEntries);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `loqelo-filtered-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#E4EAE9] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#0C2229] text-white px-6 py-4.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#077E88] flex items-center justify-center text-white font-bold text-xs">
              Q
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Loqelo Waitlist & Contact Management Console
              </h3>
              <p className="text-xs text-slate-300">
                Administrative view for reviewing and exporting verified pre-launch signups
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV ({filteredEntries.length})</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 sm:p-5 bg-[#F4F7F6] border-b border-[#E4EAE9] flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search email, country, city..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E4EAE9] bg-white text-xs text-[#0C2229] focus:outline-none focus:ring-1 focus:ring-[#077E88]"
              />
              <Search className="w-3.5 h-3.5 text-[#76898E] absolute left-2.5 top-2.5" />
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E4EAE9]">
              <button
                type="button"
                onClick={() => setRoleFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                  roleFilter === 'all'
                    ? 'bg-[#0C2229] text-white'
                    : 'text-[#3D5259] hover:bg-[#F4F7F6]'
                }`}
              >
                All ({entries.length})
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('customer')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                  roleFilter === 'customer'
                    ? 'bg-[#077E88] text-white'
                    : 'text-[#3D5259] hover:bg-[#F4F7F6]'
                }`}
              >
                Customers ({entries.filter((e) => e.role === 'customer').length})
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('contractor')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                  roleFilter === 'contractor'
                    ? 'bg-[#0C2229] text-white'
                    : 'text-[#3D5259] hover:bg-[#F4F7F6]'
                }`}
              >
                Pros ({entries.filter((e) => e.role === 'contractor').length})
              </button>
            </div>

            {/* Country Filter */}
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#E4EAE9] bg-white text-xs text-[#0C2229] focus:outline-none focus:ring-1 focus:ring-[#077E88]"
            >
              <option value="all">All Countries ({uniqueCountries.length})</option>
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Reset / Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetSeedData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[#3D5259] hover:text-[#0C2229] bg-white border border-[#E4EAE9] hover:bg-slate-50 transition-colors"
              title="Reset seed records"
            >
              <RefreshCw className="w-3 h-3 text-[#76898E]" />
              <span>Reset Sample Leads</span>
            </button>
          </div>
        </div>

        {/* Entries Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-[#76898E] space-y-2">
              <Search className="w-8 h-8 mx-auto text-[#76898E]/50" />
              <p className="text-sm font-medium">No registrations match current search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setRoleFilter('all');
                  setCountryFilter('all');
                }}
                className="text-xs text-[#077E88] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="border border-[#E4EAE9] rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4F7F6] text-[#76898E] font-semibold border-b border-[#E4EAE9]">
                  <tr>
                    <th className="py-3 px-3.5">#</th>
                    <th className="py-3 px-3.5">Role</th>
                    <th className="py-3 px-3.5">Email</th>
                    <th className="py-3 px-3.5">Country / City</th>
                    <th className="py-3 px-3.5">Entity</th>
                    <th className="py-3 px-3.5">Interests / Category</th>
                    <th className="py-3 px-3.5">Consent</th>
                    <th className="py-3 px-3.5">Date</th>
                    <th className="py-3 px-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4EAE9]">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-[#F4F7F6]/60 transition-colors">
                      <td className="py-3 px-3.5 font-bold text-[#077E88] tabular-nums">
                        #{entry.position}
                      </td>
                      <td className="py-3 px-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            entry.role === 'customer'
                              ? 'bg-[#E7F3F3] text-[#05626A]'
                              : 'bg-slate-200 text-[#0C2229]'
                          }`}
                        >
                          {entry.role}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 font-medium text-[#0C2229]">
                        {entry.email}
                      </td>
                      <td className="py-3 px-3.5 text-[#3D5259]">
                        {entry.country}
                        {entry.city ? ` · ${entry.city}` : ''}
                      </td>
                      <td className="py-3 px-3.5 text-[#76898E] capitalize">
                        {entry.entityType || 'unspecified'}
                      </td>
                      <td className="py-3 px-3.5 text-[#3D5259] max-w-xs truncate">
                        {(entry.servicesOfInterest || ['General']).join(', ')}
                      </td>
                      <td className="py-3 px-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#2E9A77] font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          <span>Yes</span>
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-[#76898E] font-mono tabular-nums text-[11px]">
                        {entry.createdAt.slice(0, 10)}
                      </td>
                      <td className="py-3 px-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => onDeleteEntry(entry.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F4F7F6] px-6 py-4 border-t border-[#E4EAE9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#76898E]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#077E88]" />
            <span>
              RFC 4180 compliant CSV export ready · Filtered {filteredEntries.length} of {entries.length} records
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-full bg-[#077E88] text-white text-xs font-semibold hover:bg-[#05626A] transition-colors"
            >
              Export This View (.csv)
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white text-[#0C2229] border border-[#E4EAE9] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Close Console
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
