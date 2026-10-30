/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Unit tests for Loqelo pre-launch pure logic modules
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEmail,
  validateCountry,
  checkSpamTrap,
  generateReferralCode,
  generateWaitlistCSV,
  calculateWaitlistStats,
  WaitlistSubmission,
} from './waitlist.ts';
import { calculateCountdown, LOQELO_LAUNCH_DATE_UTC } from './launch.ts';
import { detectInitialLanguage, TRANSLATIONS } from './i18n.ts';

test('validateEmail validates valid and rejects invalid addresses', () => {
  assert.equal(validateEmail('test@loqelo.com').isValid, true);
  assert.equal(validateEmail('sarah.smith+test@domain.co.uk').isValid, true);
  assert.equal(validateEmail('').isValid, false);
  assert.equal(validateEmail('invalid-email').isValid, false);
  assert.equal(validateEmail('missing@tld').isValid, false);
  assert.equal(validateEmail('spaces in@domain.com').isValid, false);
});

test('validateCountry checks non-empty country strings', () => {
  assert.equal(validateCountry('Netherlands').isValid, true);
  assert.equal(validateCountry('   ').isValid, false);
  assert.equal(validateCountry('').isValid, false);
});

test('checkSpamTrap catches bot honeypot or impossibly fast submission', () => {
  // If honeypot is filled
  assert.equal(checkSpamTrap('bot-value', Date.now() - 5000), true);
  // If submitted too fast (<400ms)
  assert.equal(checkSpamTrap('', Date.now() - 100), true);
  // Legitimate human submission
  assert.equal(checkSpamTrap('', Date.now() - 3000), false);
});

test('generateReferralCode produces well-formed uppercase code', () => {
  const code = generateReferralCode('anna@example.com');
  assert.match(code, /^LQ-ANNA-[A-Z0-9]{4}$/);
});

test('generateWaitlistCSV produces RFC 4180 compliant CSV output with headers', () => {
  const sampleEntries: WaitlistSubmission[] = [
    {
      id: 'test-1',
      role: 'customer',
      email: 'anna@example.com',
      country: 'Netherlands',
      entityType: 'individual',
      servicesOfInterest: ['House cleaning', 'Window washing'],
      city: 'Amsterdam',
      consentReceived: true,
      marketingConsent: true,
      createdAt: '2026-10-20T10:00:00Z',
      referralCode: 'LQ-ANNA-1234',
      position: 1,
    },
    {
      id: 'test-2',
      role: 'contractor',
      email: 'pro@construction.de',
      country: 'Germany, Berlin', // Contains comma
      entityType: 'business',
      servicesOfInterest: ['Roofing "specialist"'], // Contains quotes
      city: 'Berlin',
      consentReceived: true,
      marketingConsent: true,
      createdAt: '2026-10-21T11:00:00Z',
      referralCode: 'LQ-PROP-5678',
      position: 2,
    },
  ];

  const csv = generateWaitlistCSV(sampleEntries);
  assert.ok(csv.includes('Position,Role,Email,Country'));
  assert.ok(csv.includes('"anna@example.com"'));
  assert.ok(csv.includes('"Germany, Berlin"'));
  assert.ok(csv.includes('Roofing ""specialist""'));
});

test('calculateWaitlistStats accurately aggregates counts and conversion', () => {
  const sampleEntries: WaitlistSubmission[] = [
    {
      id: '1',
      role: 'customer',
      email: 'c1@test.com',
      country: 'Netherlands',
      consentReceived: true,
      marketingConsent: true,
      createdAt: '2026-10-20T10:00:00Z',
      referralCode: 'LQ-TEST-1',
      position: 1,
    },
    {
      id: '2',
      role: 'contractor',
      email: 'p1@test.com',
      country: 'Netherlands',
      consentReceived: true,
      marketingConsent: true,
      createdAt: '2026-10-20T11:00:00Z',
      referralCode: 'LQ-TEST-2',
      position: 2,
    },
    {
      id: '3',
      role: 'customer',
      email: 'c2@test.com',
      country: 'Germany',
      consentReceived: true,
      marketingConsent: true,
      createdAt: '2026-10-20T12:00:00Z',
      referralCode: 'LQ-TEST-3',
      position: 3,
    },
  ];

  const stats = calculateWaitlistStats(sampleEntries, 100);
  assert.equal(stats.totalSignups, 3);
  assert.equal(stats.customersCount, 2);
  assert.equal(stats.contractorsCount, 1);
  assert.equal(stats.conversionRate, 3);
  assert.equal(stats.countryBreakdown['Netherlands'], 2);
  assert.equal(stats.countryBreakdown['Germany'], 1);
});

test('calculateCountdown correctly computes days and hours before launch', () => {
  // Fixed test date: 2026-10-29 00:00:00Z
  const testNow = new Date('2026-10-29T00:00:00Z');
  const countdown = calculateCountdown(testNow);

  assert.equal(countdown.isLaunched, false);
  assert.ok(countdown.totalSeconds > 0);
  assert.ok(countdown.months >= 2 && countdown.months <= 4);
  assert.ok(countdown.progressPercent > 0 && countdown.progressPercent < 100);

  // Past launch date
  const futureDate = new Date('2027-02-02T00:00:00Z');
  const finished = calculateCountdown(futureDate);
  assert.equal(finished.isLaunched, true);
  assert.equal(finished.totalSeconds, 0);
  assert.equal(finished.progressPercent, 100);
});

test('i18n contains all supported languages with complete keys', () => {
  const langs = ['en', 'pl', 'de', 'nl', 'fr', 'es'] as const;
  for (const lang of langs) {
    const dict = TRANSLATIONS[lang];
    assert.ok(dict, `Missing translation dictionary for ${lang}`);
    assert.ok(dict.hero.tagline, `Missing hero tagline for ${lang}`);
    assert.ok(dict.waitlist.customerTab, `Missing waitlist customer tab for ${lang}`);
  }
});
