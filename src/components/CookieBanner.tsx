/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('loqelo_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    try {
      localStorage.setItem('loqelo_cookie_consent', accepted ? 'accepted' : 'declined');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#0C2229] text-white p-5 rounded-2xl shadow-2xl border border-slate-700 space-y-3">
        <div className="flex items-start gap-2.5">
          <Shield className="w-5 h-5 text-[#65C8A6] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Privacy & Cookie Preferences
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We use strictly anonymous, privacy-friendly analytics to count visitors and country interest ahead of our February 2027 launch. We never share emails or personal data with advertising networks.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleConsent(false)}
            className="px-3.5 py-1.5 rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleConsent(true)}
            className="px-4 py-1.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
};
