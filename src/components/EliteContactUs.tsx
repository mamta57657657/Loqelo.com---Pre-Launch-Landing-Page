/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Contact Us Section matching the reference layout:
 * - Left: Script kicker, GET IN TOUCH headline, form with First/Last Name, Email, Phone, Message, SUBMIT NOW button
 * - Right: Landscaper photo in outdoor yard + vertical outlined text CONTACT US
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { getAssetUrl } from '../utils/assets.ts';

export function EliteContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'lawn-mowing',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name, email address, and phone number.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Script Kicker */}
            <p className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl text-[#65A30D] font-bold mb-2">
              Contact Us
            </p>

            {/* Headline */}
            <h2 className="font-['Oswald',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#1C2A20] leading-tight mb-4">
              GET IN TOUCH
            </h2>

            <p className="text-sm sm:text-base text-[#5D7163] leading-relaxed mb-8 max-w-xl">
              Have an upcoming landscaping project or need reliable scheduled lawn care? Fill out the form below or call us directly for a free, transparent estimate.
            </p>

            {submitted ? (
              <div className="w-full p-8 bg-[#F2F7EE] border border-[#84CC16] rounded-xs text-center animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-[#16572E] mx-auto mb-3" />
                <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-[#16572E]">
                  THANK YOU FOR REACHING OUT!
                </h3>
                <p className="text-sm text-[#5D7163] mt-2 max-w-md mx-auto">
                  We have received your request for a consultation. One of our lawn specialists will contact you within 24 hours at <strong className="text-[#1C2A20]">{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ firstName: '', lastName: '', email: '', phone: '', service: 'lawn-mowing', message: '' });
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#16572E] text-white font-['Oswald'] font-bold text-xs uppercase tracking-wider rounded-xs"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xs border border-red-200">
                    {errorMsg}
                  </div>
                )}

                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-sm rounded-xs text-[#1C2A20] placeholder-[#768E7C]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-sm rounded-xs text-[#1C2A20] placeholder-[#768E7C]"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-sm rounded-xs text-[#1C2A20] placeholder-[#768E7C]"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-sm rounded-xs text-[#1C2A20] placeholder-[#768E7C]"
                  />
                </div>

                {/* Service Needed Dropdown */}
                <div>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-sm rounded-xs text-[#1C2A20]"
                  >
                    <option value="lawn-design">Lawn Designing & Sodding</option>
                    <option value="hedge-trimming">Hedge Trimming & Pruning</option>
                    <option value="grass-cutting">Grass Cutting & Mowing</option>
                    <option value="garden-maintenance">Garden Maintenance & Mulch</option>
                    <option value="seasonal-cleanup">Seasonal Spring / Fall Cleanup</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    rows={4}
                    placeholder="Message * (Describe your property size, requirements, and preferred timeline)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-sm rounded-xs text-[#1C2A20] placeholder-[#768E7C]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-9 py-3.5 bg-[#16572E] hover:bg-[#0F3E20] active:scale-95 text-white font-['Oswald'] font-bold text-sm tracking-wider uppercase rounded-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'SENDING...' : 'SUBMIT NOW'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Landscaper Photo + Vertical Outlined Headline */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end gap-4 sm:gap-6">
            {/* Landscaper Portrait Photo */}
            <div className="relative w-full max-w-sm rounded-xs overflow-hidden shadow-lg border border-[#E2ECE0]">
              <img
                src={getAssetUrl('/assets/aistudio/pro_c3584a76.jpg')}
                alt="Elite Outdoor Solutions team member"
                className="w-full h-[480px] sm:h-[540px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Direct call badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-xs border border-[#E2ECE0] shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#16572E] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#84CC16]" />
                </div>
                <div>
                  <p className="text-xs text-[#5D7163]">Direct Consultation Line</p>
                  <a
                    href="tel:6477025682"
                    className="font-['Oswald'] text-base font-bold text-[#16572E] tracking-wide hover:underline"
                  >
                    (647) 702-5682
                  </a>
                </div>
              </div>
            </div>

            {/* Vertical Outlined CONTACT US Text */}
            <div className="shrink-0 select-none flex items-center justify-center" aria-hidden="true">
              <span className="font-['Oswald'] text-4xl sm:text-6xl font-bold uppercase tracking-widest text-outline-lime writing-mode-vertical">
                CONTACT US
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
