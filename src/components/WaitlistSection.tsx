/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TranslationDictionary } from '../utils/i18n.ts';
import {
  UserRole,
  EntityType,
  WaitlistSubmission,
  validateEmail,
  validateCountry,
  checkSpamTrap,
  generateReferralCode,
} from '../utils/waitlist.ts';
import { generateLaunchCalendarICS, getGoogleCalendarLink } from '../utils/launch.ts';
import {
  Mail,
  MapPin,
  Building,
  User,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Share2,
  Copy,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface WaitlistSectionProps {
  t: TranslationDictionary;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onNewSubmission: (entry: WaitlistSubmission) => void;
  totalSignups: number;
  selectedCategoryInterest?: string;
  onClearCategoryInterest?: () => void;
}

const COUNTRIES = [
  'Netherlands',
  'Germany',
  'Poland',
  'Belgium',
  'France',
  'Spain',
  'United Kingdom',
  'Italy',
  'Austria',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Portugal',
  'Ireland',
  'Czech Republic',
  'Hungary',
  'Romania',
  'Greece',
  'United States',
  'Canada',
  'Australia',
  'Other Country'
];

export const WaitlistSection: React.FC<WaitlistSectionProps> = ({
  t,
  activeRole,
  onRoleChange,
  onNewSubmission,
  totalSignups,
  selectedCategoryInterest,
  onClearCategoryInterest,
}) => {
  const [renderTime] = useState(Date.now());
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Netherlands');
  const [entityType, setEntityType] = useState<EntityType>('individual');
  const [city, setCity] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [consentGiven, setConsentGiven] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState<WaitlistSubmission | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const customerServices = [
    'House cleaning',
    'Window washing',
    'Garden & Lawn care',
    'Plumbing & Electrics',
    'Handyman & Assembly',
    'Moving & Transport',
    'Painting & Decorating',
    'Renovation & Remodeling',
  ];

  const contractorTrades = [
    'Cleaning & Janitorial',
    'Gardening & Landscaping',
    'Plumbing & Heating',
    'Electrical Installations',
    'Carpentry & Flooring',
    'Painting & Facade',
    'Moving & Logistics',
    'General Contractor / Renovation',
  ];

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Anti-spam check
    if (checkSpamTrap(honeypot, renderTime)) {
      setErrorMsg('Submission rejected by spam protection filter.');
      return;
    }

    // 2. Email validation
    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMsg(emailCheck.error || 'Please enter a valid email.');
      return;
    }

    // 3. Country validation
    const countryCheck = validateCountry(country);
    if (!countryCheck.isValid) {
      setErrorMsg(countryCheck.error || 'Please select your country.');
      return;
    }

    // 4. Consent validation
    if (!consentGiven) {
      setErrorMsg('Please confirm your consent to receive launch updates.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newPos = totalSignups + 1;
      const refCode = generateReferralCode(email);

      const entry: WaitlistSubmission = {
        id: `waitlist-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        role: activeRole,
        email: email.trim().toLowerCase(),
        country,
        entityType,
        servicesOfInterest: selectedServices.length > 0 ? selectedServices : undefined,
        city: city.trim() || undefined,
        consentReceived: true,
        marketingConsent: true,
        createdAt: new Date().toISOString(),
        referralCode: refCode,
        position: newPos,
      };

      onNewSubmission(entry);
      setSubmittedEntry(entry);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#077E88', '#2E9A77', '#84CC16', '#16572E', '#A3E635']
        });
      } catch {}
    }, 400);
  };

  const handleDownloadICS = () => {
    const icsContent = generateLaunchCalendarICS();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'loqelo-launch-february-2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyReferral = () => {
    if (!submittedEntry) return;
    const shareUrl = `https://loqelo.com?ref=${submittedEntry.referralCode}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  return (
    <section id="waitlist-form" className="py-16 sm:py-24 bg-white border-b border-[#E4EAE9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs font-bold text-[#077E88] tracking-widest uppercase">
            {t.waitlist.kicker}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0C2229]">
            {t.waitlist.title}
          </h2>
          <p className="text-sm sm:text-base text-[#3D5259] max-w-2xl mx-auto">
            {t.waitlist.subtitle}
          </p>
        </div>

        {/* Confirmation State if already submitted */}
        <AnimatePresence mode="wait">
          {submittedEntry ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="bg-[#E7F3F3] rounded-3xl p-8 sm:p-10 border border-[#077E88]/30 shadow-xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#077E88] text-white flex items-center justify-center mx-auto shadow-md animate-bounce">
                <CheckCircle className="w-9 h-9" />
              </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2E9A77] text-white">
                Early Access Verified
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0C2229]">
                {t.waitlist.successTitle}
              </h3>
              <p className="text-sm text-[#3D5259] max-w-lg mx-auto">
                {t.waitlist.successDesc}
              </p>
            </div>

            {/* Position Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
              <div className="bg-white p-4 rounded-2xl border border-[#E4EAE9]">
                <span className="text-xs text-[#76898E] font-medium">{t.waitlist.positionLabel}</span>
                <div className="font-display text-2xl font-bold text-[#077E88] tabular-nums mt-1">
                  #{submittedEntry.position}
                </div>
                <span className="text-[11px] text-[#2E9A77] font-semibold">Priority tier locked in</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E4EAE9]">
                <span className="text-xs text-[#76898E] font-medium">{t.waitlist.perkLabel}</span>
                <div className="font-display text-base font-bold text-[#0C2229] mt-1">
                  {submittedEntry.role === 'customer'
                    ? '€25 Off First Booking'
                    : '0% Commission for 3 Months'}
                </div>
                <span className="text-[11px] text-[#077E88] font-semibold">Automatic launch bonus</span>
              </div>
            </div>

            {/* Launch Reminder CTA buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDownloadICS}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0C2229] border border-[#E4EAE9] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all"
              >
                <Calendar className="w-4 h-4 text-[#077E88]" />
                <span>{t.waitlist.addToCalendar}</span>
              </button>

              <a
                href={getGoogleCalendarLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0C2229] border border-[#E4EAE9] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all"
              >
                <span>Add to Google Calendar</span>
              </a>
            </div>

            {/* Share Referral Link Box */}
            <div className="pt-4 border-t border-[#077E88]/20 max-w-md mx-auto space-y-2">
              <span className="text-xs font-medium text-[#3D5259]">
                {t.waitlist.shareLink}
              </span>
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#E4EAE9]">
                <input
                  type="text"
                  readOnly
                  value={`https://loqelo.com?ref=${submittedEntry.referralCode}`}
                  className="w-full text-xs font-mono text-[#0C2229] px-2 focus:outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  className="px-3 py-1.5 rounded-lg bg-[#077E88] text-white text-xs font-medium hover:bg-[#05626A] transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubmittedEntry(null)}
                className="text-xs text-[#077E88] hover:underline cursor-pointer"
              >
                Register another email address
              </button>
            </div>
          </motion.div>
        ) : (
          /* Form Card */
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="bg-[#F4F7F6] rounded-3xl p-6 sm:p-10 border border-[#E4EAE9] shadow-sm"
          >
            
            {/* Category Interest Badge if selected from CategoriesGrid */}
            {selectedCategoryInterest && (
              <div className="mb-6 p-3 px-4 rounded-2xl bg-white border border-[#077E88]/30 flex items-center justify-between shadow-2xs max-w-md mx-auto">
                <div className="flex items-center gap-2 text-xs text-[#0C2229]">
                  <span className="w-2 h-2 rounded-full bg-[#077E88] animate-pulse"></span>
                  <span>Category interest: <strong className="text-[#077E88]">{selectedCategoryInterest}</strong></span>
                </div>
                {onClearCategoryInterest && (
                  <button
                    type="button"
                    onClick={onClearCategoryInterest}
                    className="text-[11px] text-[#76898E] hover:text-[#0C2229] underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* Role Switcher Tabs */}
            <div className="flex items-center justify-center p-1.5 bg-white rounded-2xl border border-[#E4EAE9] max-w-md mx-auto mb-8 shadow-2xs">
              <button
                type="button"
                onClick={() => onRoleChange('customer')}
                className={`w-1/2 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                  activeRole === 'customer'
                    ? 'bg-[#077E88] text-white shadow-xs'
                    : 'text-[#3D5259] hover:text-[#0C2229]'
                }`}
              >
                {t.waitlist.customerTab}
              </button>

              <button
                type="button"
                onClick={() => onRoleChange('contractor')}
                className={`w-1/2 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                  activeRole === 'contractor'
                    ? 'bg-[#0C2229] text-white shadow-xs'
                    : 'text-[#3D5259] hover:text-[#0C2229]'
                }`}
              >
                {t.waitlist.contractorTab}
              </button>
            </div>

            {/* Error Notification */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Invisible Honeypot Spam Trap */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website-hp">Leave this empty</label>
                <input
                  id="website-hp"
                  type="text"
                  name="website-hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* 2-Column Inputs: Email & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="waitlist-email" className="block text-xs font-semibold text-[#0C2229]">
                    {t.waitlist.emailLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.waitlist.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4EAE9] bg-white text-sm text-[#0C2229] placeholder:text-[#76898E] focus:outline-none focus:ring-2 focus:ring-[#077E88]"
                    />
                    <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-[#76898E]" />
                  </div>
                </div>

                {/* Country of Residence / Service */}
                <div className="space-y-1.5">
                  <label htmlFor="waitlist-country" className="block text-xs font-semibold text-[#0C2229]">
                    {activeRole === 'customer'
                      ? 'Country of residence'
                      : 'Country where you provide services'}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="waitlist-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4EAE9] bg-white text-sm text-[#0C2229] focus:outline-none focus:ring-2 focus:ring-[#077E88] appearance-none cursor-pointer"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute right-3.5 top-3.5 w-4 h-4 text-[#76898E] pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Account / Entity Type & City Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Entity Type Toggle */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#0C2229]">
                    {t.waitlist.entityLabel} <span className="text-[#76898E] font-normal">(optional)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEntityType('individual')}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                        entityType === 'individual'
                          ? 'bg-white border-[#077E88] text-[#077E88] font-bold shadow-2xs'
                          : 'bg-white/60 border-[#E4EAE9] text-[#3D5259] hover:bg-white'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{t.waitlist.entityIndividual}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEntityType('business')}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                        entityType === 'business'
                          ? 'bg-white border-[#077E88] text-[#077E88] font-bold shadow-2xs'
                          : 'bg-white/60 border-[#E4EAE9] text-[#3D5259] hover:bg-white'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5" />
                      <span>{t.waitlist.entityBusiness}</span>
                    </button>
                  </div>
                </div>

                {/* City or Region */}
                <div className="space-y-1.5">
                  <label htmlFor="waitlist-city" className="block text-xs font-semibold text-[#0C2229]">
                    {t.waitlist.radiusLabel} <span className="text-[#76898E] font-normal">(optional)</span>
                  </label>
                  <input
                    id="waitlist-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Amsterdam, Berlin, Paris, Madrid..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E4EAE9] bg-white text-sm text-[#0C2229] placeholder:text-[#76898E] focus:outline-none focus:ring-2 focus:ring-[#077E88]"
                  />
                </div>

              </div>

              {/* Service Categories of Interest */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#0C2229]">
                  {t.waitlist.servicesLabel} <span className="text-[#76898E] font-normal">(Select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {(activeRole === 'customer' ? customerServices : contractorTrades).map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => toggleService(srv)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          isSelected
                            ? 'bg-[#E7F3F3] border-[#077E88] text-[#05626A] font-semibold'
                            : 'bg-white border-[#E4EAE9] text-[#3D5259] hover:bg-slate-50'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mandatory Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#E4EAE9] text-[#077E88] focus:ring-[#077E88] cursor-pointer"
                  />
                  <span className="text-xs text-[#3D5259] group-hover:text-[#0C2229] leading-relaxed">
                    {t.waitlist.consentText}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-10 py-4 rounded-full text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.99] ${
                    activeRole === 'customer'
                      ? 'bg-[#077E88] hover:bg-[#05626A]'
                      : 'bg-[#0C2229] hover:bg-[#031C26]'
                  } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting
                    ? 'Registering early access...'
                    : activeRole === 'customer'
                    ? t.waitlist.submitCustomerBtn
                    : t.waitlist.submitContractorBtn}
                </button>
                <p className="text-[11px] text-[#76898E] mt-3">
                  No credit card required · Free to join · Zero spam promise
                </p>
              </div>

            </form>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </section>
  );
};
