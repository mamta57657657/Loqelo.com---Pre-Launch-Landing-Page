/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Interactive Quote Request & Calculator Modal.
 * Allows homeowners to configure property size, select services, view instant price
 * estimate range, and submit their quote request.
 */

import React, { useState } from 'react';
import { X, Check, Calculator, Sparkles, Phone, ShieldCheck, Clock } from 'lucide-react';

interface EliteQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export function EliteQuoteModal({ isOpen, onClose, preSelectedService }: EliteQuoteModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preSelectedService ? [preSelectedService] : ['hedge-trimming', 'grass-cutting']
  );
  const [lotSize, setLotSize] = useState<'small' | 'medium' | 'large' | 'estate'>('medium');
  const [frequency, setFrequency] = useState<'onetime' | 'biweekly' | 'weekly'>('biweekly');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Calculate instant ballpark estimate
  const calculateEstimate = () => {
    let base = 50;
    if (lotSize === 'small') base += 25;
    if (lotSize === 'medium') base += 55;
    if (lotSize === 'large') base += 95;
    if (lotSize === 'estate') base += 180;

    let serviceMultiplier = 1;
    if (selectedServices.includes('lawn-design')) base += 140;
    if (selectedServices.includes('hedge-trimming')) base += 65;
    if (selectedServices.includes('grass-cutting')) base += 40;
    if (selectedServices.includes('garden-maintenance')) base += 60;
    if (selectedServices.includes('seasonal-cleanup')) base += 85;

    let low = Math.round(base * 0.9);
    let high = Math.round(base * 1.25);

    return { low, high };
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-xs border-2 border-[#16572E] shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#16572E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#84CC16] text-[#0F3E20] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Oswald'] text-xl font-bold uppercase tracking-wider text-white">
                REQUEST A FREE TRANSPARENT QUOTE
              </h3>
              <p className="text-xs text-[#A3E635]">
                Customized for your property in Courtice & Durham Region
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F2F7EE] text-[#16572E] border-2 border-[#84CC16] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="font-['Oswald'] text-2xl font-bold uppercase text-[#16572E]">
                ESTIMATE REQUEST CONFIRMED!
              </h4>
              <p className="text-sm text-[#5D7163] max-w-md mx-auto">
                Thank you, <strong className="text-[#1C2A20]">{customerName || 'Valued Customer'}</strong>. We have logged your request. Our field estimator will review your property and call you at <strong className="text-[#1C2A20]">{customerPhone}</strong> within 1 business day.
              </p>
              <div className="p-4 bg-[#F2F7EE] border border-[#E2ECE0] rounded-xs inline-block text-left text-xs text-[#1C2A20] space-y-1">
                <p><strong>Estimated Ballpark:</strong> ${estimate.low} – ${estimate.high} CAD</p>
                <p><strong>Selected Frequency:</strong> {frequency.toUpperCase()}</p>
                <p><strong>Property Size:</strong> {lotSize.toUpperCase()}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-4 px-8 py-2.5 bg-[#16572E] text-white font-['Oswald'] font-bold text-xs uppercase tracking-wider rounded-xs"
                >
                  CLOSE WINDOW
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Select Services */}
              <div>
                <label className="block font-['Oswald'] text-sm font-bold uppercase text-[#16572E] tracking-wider mb-2.5">
                  1. SELECT SERVICES NEEDED (CHOOSE ALL THAT APPLY)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'lawn-design', label: 'Lawn Designing & Sodding' },
                    { id: 'hedge-trimming', label: 'Hedge Trimming & Pruning' },
                    { id: 'grass-cutting', label: 'Grass Cutting & Striping' },
                    { id: 'garden-maintenance', label: 'Garden Maintenance & Mulch' },
                    { id: 'seasonal-cleanup', label: 'Seasonal Spring / Fall Cleanup' },
                  ].map((srv) => {
                    const checked = selectedServices.includes(srv.id);
                    return (
                      <button
                        type="button"
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`p-3 rounded-xs border text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          checked
                            ? 'bg-[#F2F7EE] border-[#84CC16] text-[#16572E]'
                            : 'bg-white border-[#DCE8D8] text-[#5D7163] hover:border-[#16572E]'
                        }`}
                      >
                        <span>{srv.label}</span>
                        {checked && <Check className="w-4 h-4 text-[#84CC16] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Property Size */}
              <div>
                <label className="block font-['Oswald'] text-sm font-bold uppercase text-[#16572E] tracking-wider mb-2.5">
                  2. APPROXIMATE LOT SIZE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'small', label: 'Small', desc: '< 3,000 sq ft' },
                    { id: 'medium', label: 'Medium', desc: '3,000–8,000 sq ft' },
                    { id: 'large', label: 'Large', desc: '8,000–15,000 sq ft' },
                    { id: 'estate', label: 'Estate', desc: '1/2+ Acre' },
                  ].map((size) => (
                    <button
                      type="button"
                      key={size.id}
                      onClick={() => setLotSize(size.id as any)}
                      className={`p-2.5 rounded-xs border text-center transition-colors cursor-pointer ${
                        lotSize === size.id
                          ? 'bg-[#16572E] text-white border-[#16572E]'
                          : 'bg-white text-[#1C2A20] border-[#DCE8D8] hover:border-[#16572E]'
                      }`}
                    >
                      <div className="font-['Oswald'] text-xs uppercase font-bold">{size.label}</div>
                      <div className="text-[10px] opacity-80">{size.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Frequency */}
              <div>
                <label className="block font-['Oswald'] text-sm font-bold uppercase text-[#16572E] tracking-wider mb-2.5">
                  3. SERVICE FREQUENCY
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'onetime', label: 'One-Time Project' },
                    { id: 'biweekly', label: 'Bi-Weekly Maintenance' },
                    { id: 'weekly', label: 'Weekly Precision Care' },
                  ].map((f) => (
                    <button
                      type="button"
                      key={f.id}
                      onClick={() => setFrequency(f.id as any)}
                      className={`p-2.5 rounded-xs border text-center text-xs font-semibold transition-colors cursor-pointer ${
                        frequency === f.id
                          ? 'bg-[#84CC16] text-[#0F3E20] border-[#84CC16] font-bold'
                          : 'bg-white text-[#5D7163] border-[#DCE8D8] hover:border-[#16572E]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Banner */}
              <div className="p-4 bg-[#F2F7EE] border border-[#84CC16] rounded-xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#65A30D]">
                    INSTANT PRELIMINARY ESTIMATE
                  </span>
                  <div className="font-['Oswald'] text-2xl font-bold text-[#16572E] mt-0.5">
                    ${estimate.low} – ${estimate.high} CAD
                  </div>
                  <span className="text-[11px] text-[#5D7163]">
                    Includes all labor, commercial fuel, disposal & cleanup
                  </span>
                </div>
                <div className="hidden sm:flex flex-col items-end text-xs text-[#16572E] font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#84CC16]" /> 100% Insured
                  </span>
                  <span className="flex items-center gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5 text-[#84CC16]" /> Prompt Response
                  </span>
                </div>
              </div>

              {/* Step 4: Contact Details */}
              <div className="space-y-3 pt-2">
                <label className="block font-['Oswald'] text-sm font-bold uppercase text-[#16572E] tracking-wider">
                  4. YOUR CONTACT & PROPERTY DETAILS
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-xs rounded-xs text-[#1C2A20]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-xs rounded-xs text-[#1C2A20]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-xs rounded-xs text-[#1C2A20]"
                  />
                  <input
                    type="text"
                    placeholder="Property Address / Postal Code (Courtice / Durham)"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-xs rounded-xs text-[#1C2A20]"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Additional notes, gate codes, or specific requests"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFDF7] border border-[#DCE8D8] focus:border-[#16572E] focus:outline-hidden text-xs rounded-xs text-[#1C2A20]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-bold text-[#5D7163] hover:text-[#1C2A20] uppercase"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#84CC16] hover:bg-[#74B32A] text-[#0F3E20] font-['Oswald'] font-bold text-sm uppercase tracking-wider rounded-xs shadow-md cursor-pointer transition-colors"
                >
                  SUBMIT QUOTE REQUEST
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
