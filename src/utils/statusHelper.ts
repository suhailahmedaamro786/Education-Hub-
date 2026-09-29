/**
 * Education Hub Status & Deadline Helper Utility
 * Computes live deadline status (OPEN, CLOSING SOON, EXPIRED) without deleting records,
 * and provides standardized verification status formatting.
 */

import { DeadlineState, VerificationStatus } from '../types';

export interface DeadlineInfo {
  state: DeadlineState;
  badgeText: string;
  badgeClass: string;
  daysRemaining?: number;
  isExpired: boolean;
}

/**
 * Automatically computes deadline status compared to current date.
 */
export function getDeadlineInfo(deadlineStr?: string): DeadlineInfo {
  if (!deadlineStr) {
    return {
      state: 'ONGOING',
      badgeText: 'ONGOING',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      isExpired: false,
    };
  }

  // Parse deadline date at end of day UTC
  const deadlineDate = new Date(`${deadlineStr}T23:59:59`);
  const now = new Date();

  if (isNaN(deadlineDate.getTime())) {
    return {
      state: 'OPEN',
      badgeText: 'OPEN',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      isExpired: false,
    };
  }

  const diffMs = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      state: 'EXPIRED',
      badgeText: 'EXPIRED',
      badgeClass: 'bg-slate-200 text-slate-700 border-slate-300 line-through decoration-slate-400',
      daysRemaining: 0,
      isExpired: true,
    };
  }

  if (diffDays <= 7) {
    return {
      state: 'CLOSING SOON',
      badgeText: diffDays === 0 ? 'CLOSES TODAY' : `CLOSING SOON (${diffDays}d left)`,
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 font-bold animate-pulse',
      daysRemaining: diffDays,
      isExpired: false,
    };
  }

  return {
    state: 'OPEN',
    badgeText: `OPEN (${diffDays}d left)`,
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    daysRemaining: diffDays,
    isExpired: false,
  };
}

/**
 * Returns accessible styling and labels for verification status:
 * - 'Verified'
 * - 'Needs Review'
 * - 'Expired'
 * - 'Demo/Sample'
 */
export function getVerificationBadge(status: VerificationStatus): {
  label: string;
  badgeClass: string;
  dotClass: string;
} {
  switch (status) {
    case 'Verified':
      return {
        label: 'Verified Source',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dotClass: 'bg-emerald-500',
      };
    case 'Needs Review':
      return {
        label: 'Needs Review',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        dotClass: 'bg-amber-500',
      };
    case 'Expired':
      return {
        label: 'Expired Listing',
        badgeClass: 'bg-slate-100 text-slate-600 border-slate-300',
        dotClass: 'bg-slate-400',
      };
    case 'Demo/Sample':
    default:
      return {
        label: 'Demo/Sample Data',
        badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
        dotClass: 'bg-blue-500',
      };
  }
}

/**
 * Formats standard last verified timestamp string.
 */
export function formatLastVerified(dateStr: string): string {
  if (!dateStr) return 'Pending verification';
  return `Last verified: ${dateStr}`;
}
