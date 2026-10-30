/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Asset resolution and reliable fallback utilities for Loqelo.
 * Guarantees crystal-clear logos, SVG icons, and images whether running
 * in local development, preview builds, or deployed to Vercel/production CDNs.
 */

import React from 'react';

/**
 * Normalizes an asset path with respect to the app's base URL.
 * Ensures leading slashes are preserved and relative subpaths resolve reliably.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}${cleanPath}`;
}

/**
 * Graceful fallback handler for <img> onError events.
 * If an image fails to load (e.g. temporary CDN failure or path mismatch),
 * it tries an alternate fallback before falling back to a clean inline SVG placeholder.
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc?: string
): void {
  const target = event.currentTarget;
  // Prevent infinite error loop
  if (target.dataset.hasFailedFallback === 'true') {
    return;
  }

  if (fallbackSrc && target.src !== fallbackSrc) {
    target.src = fallbackSrc;
    return;
  }

  // Mark as fallback applied
  target.dataset.hasFailedFallback = 'true';

  // If it was a photo, provide a clean branded placeholder
  target.src =
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Crect%20fill%3D%22%23EBF3F3%22%20width%3D%22600%22%20height%3D%22400%22%2F%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%2248%22%20fill%3D%22%23077E88%22%20opacity%3D%220.2%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22260%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20font-weight%3D%22600%22%20fill%3D%22%23077E88%22%20text-anchor%3D%22middle%22%3ELoqelo%20Service%20Photo%3C%2Ftext%3E%3C%2Fsvg%3E';
}
