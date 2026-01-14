import type { BadgeData } from './types';

/**
 * Page-level badges/disclaimers that are overlaid on charts.
 * Keep these in one file so copy changes are easy.
 */
export const CORRELATION_NOT_CAUSATION_BADGE: BadgeData = {
  label: 'Correlation ≠ Causation',
  description:
    'These scatter plots show modelled associations and should not be interpreted as direct causal relationships.',
  intent: 'WARNING'
};

export const AGGREGATED_DATA_BADGE: BadgeData = {
  label: 'Aggregated data',
  description:
    'Each socio-economic factor value for a given local authority is aggregated from the data zones within its boundary.',
  intent: 'INFORMATION'
};

export const UNCERTAINTY_SHOWN_BADGE: BadgeData = {
  label: 'Uncertainty shown',
  description:
    'Uncertainty is explicitly shown (e.g., intervals, ranges, or distributions) to help interpret modelled results.',
  intent: 'CONFIRMATION'
};

export const BOX_PLOTS_BADGE: BadgeData = {
  label: 'Box plots',
  description:
    'A box plot summarizes a distribution: the box is the 25th-75th percentiles, the line is the median, and whiskers show the spread (often up to 1.5x IQR).',
  intent: 'INFORMATION'
};

