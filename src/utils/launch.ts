/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Loqelo Planned Launch & Countdown Utilities
 * Launch Date: February 1, 2027 09:00:00 UTC
 */

export const LOQELO_LAUNCH_DATE_UTC = '2027-02-01T09:00:00Z';
export const LOQELO_CAMPAIGN_START_UTC = '2026-10-01T00:00:00Z';

export interface CountdownState {
  totalSeconds: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLaunched: boolean;
  progressPercent: number; // e.g. 24.5% between announcement and launch
}

/**
 * Calculates countdown until launch date from any reference time
 */
export function calculateCountdown(now: Date = new Date()): CountdownState {
  const targetTime = new Date(LOQELO_LAUNCH_DATE_UTC).getTime();
  const startTime = new Date(LOQELO_CAMPAIGN_START_UTC).getTime();
  const currentTime = now.getTime();

  const diffMs = targetTime - currentTime;

  if (diffMs <= 0) {
    return {
      totalSeconds: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLaunched: true,
      progressPercent: 100
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);

  // Approximate 30 days per month
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const totalCampaignSpan = targetTime - startTime;
  const elapsed = Math.max(0, currentTime - startTime);
  const progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / totalCampaignSpan) * 1000) / 10));

  return {
    totalSeconds,
    months,
    days,
    hours,
    minutes,
    seconds,
    isLaunched: false,
    progressPercent
  };
}

/**
 * Generates an iCalendar (.ics) format file string for "Loqelo Global Platform Launch"
 * Allows users to add the February 2027 launch to Apple Calendar, Outlook, Google Calendar
 */
export function generateLaunchCalendarICS(): string {
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Loqelo Inc//Loqelo Pre-Launch//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:loqelo-launch-feb-2027@loqelo.com',
    `DTSTAMP:${dtStamp}`,
    'DTSTART:20270201T090000Z',
    'DTEND:20270201T120000Z',
    'SUMMARY:🚀 Loqelo Platform Official Launch',
    'DESCRIPTION:Loqelo officially goes live! Connect with verified local service pros or start receiving jobs for home, garden, and office. Visit https://loqelo.com',
    'URL:https://loqelo.com',
    'LOCATION:Loqelo.com (Online)',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Loqelo launches tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

/**
 * Generates a Google Calendar web intent link
 */
export function getGoogleCalendarLink(): string {
  const title = encodeURIComponent('🚀 Loqelo Platform Official Launch');
  const details = encodeURIComponent('Loqelo officially launches! Connect with rated service contractors or get matching local jobs. https://loqelo.com');
  const location = encodeURIComponent('Loqelo.com');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270201T090000Z/20270201T120000Z&details=${details}&location=${location}`;
}
