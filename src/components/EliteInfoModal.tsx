/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Informational Modal for Terms & Conditions, Privacy Policy, FAQs, and Brochure.
 */

import React from 'react';
import { X, ShieldCheck, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export type InfoModalType = 'terms' | 'privacy' | 'faq' | 'brochure' | null;

interface EliteInfoModalProps {
  type: InfoModalType;
  onClose: () => void;
  onOpenQuote: () => void;
}

export function EliteInfoModal({ type, onClose, onOpenQuote }: EliteInfoModalProps) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-xs border-2 border-[#16572E] shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#16572E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {type === 'faq' && <HelpCircle className="w-6 h-6 text-[#84CC16]" />}
            {type === 'privacy' && <ShieldCheck className="w-6 h-6 text-[#84CC16]" />}
            {type === 'terms' && <FileText className="w-6 h-6 text-[#84CC16]" />}
            {type === 'brochure' && <CheckCircle2 className="w-6 h-6 text-[#84CC16]" />}
            <div>
              <h3 className="font-['Oswald'] text-xl font-bold uppercase tracking-wider text-white">
                {type === 'faq' && "FREQUENTLY ASKED QUESTIONS"}
                {type === 'privacy' && "PRIVACY POLICY"}
                {type === 'terms' && "TERMS & CONDITIONS"}
                {type === 'brochure' && "ELITE OUTDOOR SOLUTIONS BROCHURE"}
              </h3>
              <p className="text-xs text-[#A3E635]">Elite Outdoor Solution · Courtice, Ontario</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-[#5D7163] space-y-4 leading-relaxed">
          {type === 'faq' && (
            <>
              <div>
                <h4 className="font-['Oswald'] text-base uppercase font-bold text-[#16572E] mb-1">
                  How does the quote and scheduling process work?
                </h4>
                <p>
                  Submit your request via our website or give us a call. We conduct a fast, on-site or satellite aerial review of your property to provide a guaranteed written estimate. Once approved, you are assigned a scheduled service day.
                </p>
              </div>

              <div>
                <h4 className="font-['Oswald'] text-base uppercase font-bold text-[#16572E] mb-1">
                  Are you fully insured for residential and commercial properties?
                </h4>
                <p>
                  Yes. Elite Outdoor Solution carries full commercial liability insurance and WSIB clearance for all technicians and equipment.
                </p>
              </div>

              <div>
                <h4 className="font-['Oswald'] text-base uppercase font-bold text-[#16572E] mb-1">
                  What areas in Ontario do you service?
                </h4>
                <p>
                  We primarily service Courtice, Bowmanville, Oshawa, Whitby, and surrounding Durham Region communities.
                </p>
              </div>

              <div>
                <h4 className="font-['Oswald'] text-base uppercase font-bold text-[#16572E] mb-1">
                  Do I need to be home during service visits?
                </h4>
                <p>
                  No. As long as exterior gates are unlocked and pets are secured indoors, our team completes the work and leaves a detailed completion tag on your door.
                </p>
              </div>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p>
                At Elite Outdoor Solution, we are dedicated to protecting your privacy. We only collect essential contact information (name, address, email, phone) to fulfill your lawn care estimates, schedule visits, and deliver service updates.
              </p>
              <p>
                We do not sell, rent, or trade your personal data to third parties. All inquiries are securely stored and accessible only by our direct dispatch team.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                All landscaping and lawn maintenance agreements with Elite Outdoor Solution are backed by our satisfaction commitment. Quotes are guaranteed for 30 calendar days from issuance.
              </p>
              <p>
                Weather disruptions (severe rainfall or high winds) are rescheduled to the next immediate clear business day. Clients may pause or cancel recurring service with a 48-hour notice.
              </p>
            </>
          )}

          {type === 'brochure' && (
            <>
              <p>
                <strong>Elite Outdoor Solution</strong> is a premier property care company specializing in:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Rotary grass cutting, lawn striping & perimeter line trimming</li>
                <li>Artistic hedge contouring, cedar privacy shaping & ornamental pruning</li>
                <li>Turf establishment, Kentucky Bluegrass sod installation & grading</li>
                <li>Mulch installation, garden bed design, organic weed eradication</li>
                <li>Spring & Autumn seasonal leaf cleanups and core aeration</li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote();
                  }}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#74B32A] text-[#0F3E20] font-['Oswald'] font-bold text-center uppercase tracking-wider rounded-xs"
                >
                  REQUEST FREE ESTIMATE NOW
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F2F7EE] border-t border-[#E2ECE0] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#16572E] text-white font-['Oswald'] font-bold text-xs uppercase tracking-wider rounded-xs"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
}
