import React from 'react';
import { motion } from 'motion/react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { Star, CheckCircle2, ArrowRight } from 'lucide-react';

interface TestimonialsSectionProps {
  t: TranslationDictionary;
  onPostJobClick: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  t,
  onPostJobClick,
}) => {
  const reviews = [
    {
      name: 'Sarah M.',
      role: 'Homeowner, Amsterdam',
      quote: 'Loqelo made finding the right professional incredibly easy. The process was simple, quick, and reliable from start to finish.',
      rating: 5,
    },
    {
      name: 'James T.',
      role: 'Property Owner, Berlin',
      quote: 'Great experience! I received multiple offers, compared everything clearly, and found a professional who delivered exactly what I needed.',
      rating: 5,
    },
    {
      name: 'Emma L.',
      role: 'Apartment Tenant, Paris',
      quote: 'I loved being able to compare different offers in one place. The professionals were responsive, friendly, and easy to work with.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E4EAE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Part: Client Testimonials */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <p className="text-xs font-bold text-[#077E88] uppercase tracking-widest">
              WHAT OUR EARLY USERS SAY
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0C2229]">
              Trusted by homeowners and professionals
            </h2>
            <p className="text-sm text-[#3D5259]">
              Feedback from beta testers and verified early community members across Europe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-[#F4F7F6] rounded-3xl p-6 sm:p-7 border border-[#E4EAE9] flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-lg transition-all cursor-default"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#E8912C]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E8912C]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#3D5259] italic leading-relaxed">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4EAE9] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#077E88] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0C2229]">{rev.name}</div>
                    <div className="text-[11px] text-[#76898E]">{rev.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Part: Choose With Clarity (From Design Mockup) */}
        <div className="bg-[#E7F3F3]/50 rounded-3xl p-8 sm:p-12 border border-[#077E88]/20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#077E88] uppercase tracking-wider">
                MAKE A CONFIDENT CHOICE
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#0C2229] leading-tight">
                See the details. <br />
                Choose with <span className="text-[#077E88]">clarity</span>.
              </h3>
              <p className="text-sm sm:text-base text-[#3D5259] leading-relaxed">
                Every bid brings the essentials together, so you can decide without juggling messy WhatsApp chats, lost emails, or surprise charges.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3D5259]">
                <CheckCircle2 className="w-4 h-4 text-[#2E9A77] shrink-0" />
                <span>Prices and estimated completion date upfront</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3D5259]">
                <CheckCircle2 className="w-4 h-4 text-[#2E9A77] shrink-0" />
                <span>Verified ratings and genuine past customer reviews</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3D5259]">
                <CheckCircle2 className="w-4 h-4 text-[#2E9A77] shrink-0" />
                <span>A direct message and availability note from each professional</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onPostJobClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs sm:text-sm font-semibold tracking-tight shadow-sm transition-all"
              >
                <span>Explore sample bids</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sample Bids Preview Widget */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E4EAE9] shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#E4EAE9] pb-3">
                <span className="font-display text-sm font-bold text-[#0C2229]">
                  Offers for your project
                </span>
                <span className="text-xs text-[#76898E]">3 bids received</span>
              </div>

              {/* Offer 1 */}
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F4F7F6] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0C2229] text-white flex items-center justify-center font-bold text-xs">
                    CP
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0C2229]">CleanPro Services</div>
                    <div className="text-[11px] text-[#76898E]">★ 4.8 · 124 reviews</div>
                  </div>
                </div>
                <div className="font-display font-bold text-base text-[#0C2229] tabular-nums">
                  €250
                </div>
              </div>

              {/* Offer 2 (Highlighted) */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#E9F7F1] border border-[#65C8A6]/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2E9A77] text-white flex items-center justify-center font-bold text-xs">
                    BH
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0C2229] flex items-center gap-1">
                      BrightHome Co.
                      <span className="text-[10px] bg-white text-[#2E9A77] px-1.5 py-0.2 rounded-full font-semibold">
                        Best value
                      </span>
                    </div>
                    <div className="text-[11px] text-[#2E9A77] font-medium">★ 4.6 · Available this weekend</div>
                  </div>
                </div>
                <div className="font-display font-bold text-base text-[#2E9A77] tabular-nums">
                  €200
                </div>
              </div>

              {/* Offer 3 */}
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F4F7F6] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#077E88] text-white flex items-center justify-center font-bold text-xs">
                    SS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0C2229]">Sparkle & Shine</div>
                    <div className="text-[11px] text-[#76898E]">★ 4.9 · 210 reviews</div>
                  </div>
                </div>
                <div className="font-display font-bold text-base text-[#0C2229] tabular-nums">
                  €280
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
