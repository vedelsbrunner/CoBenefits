import type { BadgeData, ChipColor } from './types';

export function mapIntentToColor(intent?: string): ChipColor {
  if (!intent) return 'grey';
  const normalized = intent.toUpperCase();
  switch (normalized) {
    case 'CONFIRMATION':
      return 'success';
    case 'WARNING':
      return 'warning';
    case 'INFORMATION':
      return 'info';
    default:
      return 'grey';
  }
}

// In this project we keep color controls simple:
// - intent: color by badge intent (default)
// - mono: force a single color for all badges
export type ColorMode = 'intent' | 'mono';

export function computeChipColor(badge: BadgeData, colorMode: ColorMode, baseColor: ChipColor): ChipColor {
  switch (colorMode) {
    case 'intent':
      return mapIntentToColor(badge.intent);
    case 'mono':
      return baseColor;
    default:
      return 'grey';
  }
}

