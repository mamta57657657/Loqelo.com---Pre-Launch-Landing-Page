/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, DollarSign, Globe, FileText, Code2, Copy, Check } from 'lucide-react';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#E4EAE9] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#0C2229] text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#077E88] flex items-center justify-center text-white font-bold text-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Loqelo Pre-Launch Website — User Manual & Handover Guide
              </h3>
              <p className="text-xs text-slate-300">
                Prepared for the Loqelo Executive Team & Contest Jury
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close user manual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-auto p-6 sm:p-8 space-y-8 text-sm text-[#3D5259]">
          
          {/* Executive Overview & $0 Cost Certification */}
          <div className="p-5 rounded-2xl bg-[#E9F7F1] border border-[#2E9A77]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#2E9A77] font-bold text-base">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>100% Free & Open-Source Stack — Zero Recurring License Costs</span>
            </div>
            <p className="text-xs text-[#0C2229] leading-relaxed">
              As requested in <strong>Contest Requirement 7</strong>, this solution does <strong>NOT</strong> require any paid CMS subscriptions, Webflow/Framer monthly fees, or database charges. The pre-launch website runs as a blazing-fast, static/lightweight React 19 + Vite bundle ready for zero-cost hosting on Vercel, Netlify, Cloudflare Pages, or Google Cloud Run.
            </p>
          </div>

          {/* Section 1: Contest Requirements Checklist */}
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#0C2229] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#077E88] text-white text-xs flex items-center justify-center">1</span>
              <span>Delivered Scope & Contest Checklist</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2E9A77] shrink-0 mt-0.5" />
                <div>
                  <strong>Official Visual Identity:</strong> Exact colors (Teal #077E88, Mint #65C8A6, Ink #0C2229), Outfit & DM Sans typography, official SVG logo and icon mark.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2E9A77] shrink-0 mt-0.5" />
                <div>
                  <strong>Promotional Video:</strong> Full embedded HD player for the official Loqelo MP4 video with chapter navigation and playback controls.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2E9A77] shrink-0 mt-0.5" />
                <div>
                  <strong>Figma UI Screenshots:</strong> Interactive showcase displaying all 6 core platform views with full-resolution zoom.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2E9A77] shrink-0 mt-0.5" />
                <div>
                  <strong>Dual Waitlist Forms:</strong> Distinct fields for Customers (homeowners/businesses) and Contractors (pros/companies) with anti-spam honeypot.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2E9A77] shrink-0 mt-0.5" />
                <div>
                  <strong>Multi-Language (i18n):</strong> Instant switching for 6 languages: English (EN), Polish (PL), German (DE), Dutch (NL), French (FR), Spanish (ES).
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2E9A77] shrink-0 mt-0.5" />
                <div>
                  <strong>CSV Contact Export:</strong> RFC 4180 compliant CSV export engine for importing into Mailchimp, MailerLite, Brevo, or Excel.
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Management & CSV Export Workflow */}
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#0C2229] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#077E88] text-white text-xs flex items-center justify-center">2</span>
              <span>Managing Contacts & Exporting to CSV</span>
            </h4>
            <div className="p-4 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] space-y-2 text-xs">
              <p>
                All submissions are securely stored in the client-side state and browser persistent storage. To manage or export leads:
              </p>
              <ol className="list-decimal list-inside space-y-1 pl-1 text-[#3D5259]">
                <li>Click <strong>"Export Contacts to CSV"</strong> in the Analytics section or the Admin Console.</li>
                <li>The browser immediately saves <code>loqelo-waitlist-contacts-YYYY-MM-DD.csv</code> with properly escaped fields, roles, countries, and timestamps.</li>
                <li>You can import this CSV directly into free marketing tools (e.g. <strong>Brevo</strong> [free 300 emails/day] or <strong>MailerLite</strong> [free up to 1,000 subscribers]).</li>
              </ol>
            </div>
          </div>

          {/* Section 3: Google Analytics 4 (GA4) Integration */}
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#0C2229] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#077E88] text-white text-xs flex items-center justify-center">3</span>
              <span>Google Analytics 4 Setup</span>
            </h4>
            <div className="p-4 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] space-y-3 text-xs">
              <p>
                To connect your official Google Analytics 4 property for <code>loqelo.com</code>, add the following snippet inside <code>index.html</code> right before the closing <code>&lt;/head&gt;</code> tag:
              </p>
              <div className="relative bg-[#0C2229] text-slate-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
                <pre>{`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', { 'anonymize_ip': true });
</script>`}</pre>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyCode(
                      `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-XXXXXXXXXX', { 'anonymize_ip': true });\n</script>`,
                      'ga4'
                    )
                  }
                  className="absolute right-2 top-2 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1"
                >
                  {copiedKey === 'ga4' ? <Check className="w-3 h-3 text-[#65C8A6]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'ga4' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[#76898E]">
                * Our privacy engine respects GDPR: personal email addresses are never sent to GA4 events.
              </p>
            </div>
          </div>

          {/* Section 4: Domain & Hosting Setup for loqelo.com */}
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#0C2229] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#077E88] text-white text-xs flex items-center justify-center">4</span>
              <span>Domain DNS Configuration for loqelo.com</span>
            </h4>
            <div className="p-4 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] space-y-2 text-xs">
              <p>
                When connecting your purchased domain <strong>loqelo.com</strong> to your free web hosting provider (e.g. Cloudflare Pages or Vercel):
              </p>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] bg-white p-3 rounded-lg border border-[#E4EAE9]">
                <div><strong>Type</strong>: A / CNAME</div>
                <div><strong>Name</strong>: @ / www</div>
                <div><strong>Target</strong>: Host IP / CNAME Record</div>
              </div>
              <p className="text-[#76898E]">
                SSL / HTTPS certificates are issued automatically and renewed for free by the hosting provider.
              </p>
            </div>
          </div>

          {/* Section 5: Content Editing */}
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#0C2229] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#077E88] text-white text-xs flex items-center justify-center">5</span>
              <span>How to Edit Content & Translations</span>
            </h4>
            <div className="p-4 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] space-y-2 text-xs">
              <p>
                All marketing copy, taglines, and language variations are organized cleanly in <code>src/utils/i18n.ts</code>. You can easily add or update texts in any language without touching complex UI code.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F4F7F6] px-6 py-4 border-t border-[#E4EAE9] flex items-center justify-between">
          <span className="text-xs text-[#76898E]">
            Loqelo Pre-Launch Handover Package · Ready for Production Live Deployment
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#077E88] text-white text-xs font-semibold hover:bg-[#05626A] transition-colors"
          >
            Close Manual
          </button>
        </div>

      </div>
    </div>
  );
};
