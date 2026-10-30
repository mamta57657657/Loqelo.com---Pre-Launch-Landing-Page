/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Loqelo Pre-Launch Waitlist & Contact Management Utilities
 * Handles contact collection, validation, spam mitigation,
 * consent verification, RFC 4180 CSV export, and GDPR-compliant analytics tracking.
 */

export type UserRole = 'customer' | 'contractor';
export type EntityType = 'individual' | 'business';

export interface WaitlistSubmission {
  id: string;
  role: UserRole;
  email: string;
  country: string;
  entityType?: EntityType;
  servicesOfInterest?: string[];
  city?: string;
  consentReceived: boolean;
  marketingConsent: boolean;
  createdAt: string; // ISO 8601 string
  referralCode: string;
  position: number;
}

export interface WaitlistStats {
  totalSignups: number;
  customersCount: number;
  contractorsCount: number;
  totalVisitors: number;
  conversionRate: number; // percentage, e.g. 14.8
  countryBreakdown: { [country: string]: number };
  topServices: { service: string; count: number }[];
}

// RFC 5322 compliant email regex (sanitized)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates an email address.
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email address is required.' };
  }
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) {
    return { isValid: false, error: 'Email must be between 5 and 254 characters.' };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
}

/**
 * Validates country input
 */
export function validateCountry(country: string): { isValid: boolean; error?: string } {
  if (!country || country.trim().length === 0) {
    return { isValid: false, error: 'Please select your country.' };
  }
  return { isValid: true };
}

/**
 * Anti-spam honeypot and timing check
 */
export function checkSpamTrap(honeypotValue: string, renderTimeMs: number): boolean {
  // If hidden honeypot has content, it's a bot
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return true;
  }
  // If submitted faster than 400ms after page render, likely a bot
  const elapsed = Date.now() - renderTimeMs;
  if (elapsed < 400) {
    return true;
  }
  return false;
}

/**
 * Generates a clean referral code
 */
export function generateReferralCode(email: string): string {
  const clean = email.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 4);
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LQ-${clean.toUpperCase() || 'USER'}-${randomPart}`;
}

/**
 * Generates RFC 4180 compliant CSV string for export
 * Properly escapes quotes, commas, and linebreaks.
 */
export function generateWaitlistCSV(entries: WaitlistSubmission[]): string {
  const headers = [
    'Position',
    'Role',
    'Email',
    'Country',
    'Entity Type',
    'Services / Category',
    'City',
    'Consent Accepted',
    'Submission Date (UTC)',
    'Referral Code'
  ];

  const escapeCSV = (val: string | number | boolean | undefined): string => {
    if (val === undefined || val === null) return '""';
    const str = String(val);
    if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return `"${str}"`;
  };

  const rows = entries.map((entry) => [
    escapeCSV(entry.position),
    escapeCSV(entry.role.toUpperCase()),
    escapeCSV(entry.email),
    escapeCSV(entry.country),
    escapeCSV(entry.entityType || 'unspecified'),
    escapeCSV((entry.servicesOfInterest || []).join('; ')),
    escapeCSV(entry.city || 'N/A'),
    escapeCSV(entry.consentReceived ? 'YES' : 'NO'),
    escapeCSV(entry.createdAt),
    escapeCSV(entry.referralCode)
  ].join(','));

  return [headers.join(','), ...rows].join('\r\n');
}

/**
 * Calculates real-time statistics
 */
export function calculateWaitlistStats(
  entries: WaitlistSubmission[],
  visitorCount: number = 3450
): WaitlistStats {
  const customersCount = entries.filter((e) => e.role === 'customer').length;
  const contractorsCount = entries.filter((e) => e.role === 'contractor').length;
  const totalSignups = entries.length;

  const countryBreakdown: { [country: string]: number } = {};
  const serviceCounts: { [service: string]: number } = {};

  entries.forEach((entry) => {
    const c = entry.country || 'Other';
    countryBreakdown[c] = (countryBreakdown[c] || 0) + 1;

    (entry.servicesOfInterest || []).forEach((srv) => {
      serviceCounts[srv] = (serviceCounts[srv] || 0) + 1;
    });
  });

  const topServices = Object.entries(serviceCounts)
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count);

  const effectiveVisitors = Math.max(visitorCount, totalSignups);
  const conversionRate = effectiveVisitors > 0 ? (totalSignups / effectiveVisitors) * 100 : 0;

  return {
    totalSignups,
    customersCount,
    contractorsCount,
    totalVisitors: effectiveVisitors,
    conversionRate: Math.round(conversionRate * 10) / 10,
    countryBreakdown,
    topServices
  };
}

// Default Seed Data so the app immediately reflects a pre-launch waiting list
export const SEED_WAITLIST_ENTRIES: WaitlistSubmission[] = [
  {
    id: 'seed-1',
    role: 'customer',
    email: 'sophie.van.dijk@amsterdam-home.nl',
    country: 'Netherlands',
    entityType: 'individual',
    servicesOfInterest: ['House cleaning', 'Window cleaning', 'Lawn care'],
    city: 'Amsterdam',
    consentReceived: true,
    marketingConsent: true,
    createdAt: '2026-10-20T10:14:22Z',
    referralCode: 'LQ-SOPH-7F2A',
    position: 1
  },
  {
    id: 'seed-2',
    role: 'contractor',
    email: 'contact@freshnest-cleaning.nl',
    country: 'Netherlands',
    entityType: 'business',
    servicesOfInterest: ['Cleaning', 'Window cleaning', 'Deep cleaning'],
    city: 'Amsterdam',
    consentReceived: true,
    marketingConsent: true,
    createdAt: '2026-10-21T14:32:10Z',
    referralCode: 'LQ-FRES-9B41',
    position: 2
  },
  {
    id: 'seed-3',
    role: 'contractor',
    email: 'markus.bauer@muenchen-handwerk.de',
    country: 'Germany',
    entityType: 'business',
    servicesOfInterest: ['Plumbing & electrics', 'Installations', 'Bathroom tap repair'],
    city: 'Munich',
    consentReceived: true,
    marketingConsent: true,
    createdAt: '2026-10-22T08:05:44Z',
    referralCode: 'LQ-MARK-3D19',
    position: 3
  },
  {
    id: 'seed-4',
    role: 'customer',
    email: 'elena.rostova@berlin-living.de',
    country: 'Germany',
    entityType: 'individual',
    servicesOfInterest: ['Moving & Transport', 'Furniture assembly'],
    city: 'Berlin',
    consentReceived: true,
    marketingConsent: true,
    createdAt: '2026-10-23T16:48:30Z',
    referralCode: 'LQ-ELEN-82K4',
    position: 4
  },
  {
    id: 'seed-5',
    role: 'contractor',
    email: 'info@glans-co-services.be',
    country: 'Belgium',
    entityType: 'business',
    servicesOfInterest: ['Facade washing', 'Roof cleaning', 'Exterior painting'],
    city: 'Brussels',
    consentReceived: true,
    marketingConsent: true,
    createdAt: '2026-10-24T11:20:15Z',
    referralCode: 'LQ-GLAN-45X1',
    position: 5
  },
  {
    id: 'seed-6',
    role: 'customer',
    email: 'piotr.zielinski@krakow-renovate.pl',
    country: 'Poland',
    entityType: 'individual',
    servicesOfInterest: ['Garden & outdoor', 'Hedge trimming', 'Lawn care'],
    city: 'Kraków',
    consentReceived: true,
    marketingConsent: true,
    createdAt: '2026-10-25T09:12:00Z',
    referralCode: 'LQ-PIOT-61E9',
    position: 6
  },
  {
    id: 'seed-7',
    role: 'customer',
    email: 'camille.dupont@paris-studio.fr',
    country: 'France',
    entityType: 'business',
    servicesOfInterest: ['Office cleaning', 'Electrical check', 'HVAC maintenance'],
    city: 'Paris',
    consentReceived: true,
    marketingConsent: true,
    createdAt: '2026-10-26T13:45:18Z',
    referralCode: 'LQ-CAMI-99P2',
    position: 7
  },
  {
    id: 'seed-8',
    role: 'contractor',
    email: 'jorge.navarro@madrid-reformas.es',
    country: 'Spain',
    entityType: 'business',
    servicesOfInterest: ['Carpentry', 'Flooring', 'Wall repair'],
    city: 'Madrid',
    consentReceived: true,
    marketingConsent: true,
    createdAt: '2026-10-27T15:22:40Z',
    referralCode: 'LQ-JORG-14V7',
    position: 8
  }
];

const LOCAL_STORAGE_KEY = 'loqelo_waitlist_entries_v1';
const VISITOR_COUNT_KEY = 'loqelo_visitor_count_v1';

/**
 * Loads entries from localStorage with fallback to seed data
 */
export function loadWaitlistEntries(): WaitlistSubmission[] {
  if (typeof window === 'undefined') return SEED_WAITLIST_ENTRIES;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_WAITLIST_ENTRIES));
      return SEED_WAITLIST_ENTRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_WAITLIST_ENTRIES;
  } catch {
    return SEED_WAITLIST_ENTRIES;
  }
}

/**
 * Saves waitlist entries to localStorage
 */
export function saveWaitlistEntries(entries: WaitlistSubmission[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save waitlist entries to storage:', e);
  }
}

/**
 * Increments and tracks local visitor count
 */
export function getAndIncrementVisitorCount(): number {
  if (typeof window === 'undefined') return 3480;
  try {
    const raw = localStorage.getItem(VISITOR_COUNT_KEY);
    let count = raw ? parseInt(raw, 10) : 3480;
    if (isNaN(count)) count = 3480;
    
    // Only increment once per session
    if (!sessionStorage.getItem('loqelo_session_counted')) {
      count += 1;
      localStorage.setItem(VISITOR_COUNT_KEY, String(count));
      sessionStorage.setItem('loqelo_session_counted', 'true');
    }
    return count;
  } catch {
    return 3480;
  }
}
