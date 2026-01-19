import type { BadgeData } from './types';

export const MAJOR_FINDING_BADGE: BadgeData = {
  label: 'Key Finding',
  description: 'todo',
  intent: 'CONFIRMATION',
  type: 'CONTEXT'
};

export const INVISIBLE_SMALL_AREAS_BADGE: BadgeData = {
  id: 'invisible-small-areas',
  label: 'Invisible Small Areas',
  intent: 'WARNING',
  description:
    'Some areas too small: Due to the nature of the co-benefits some values are very small in comparison to larger values so therefore are not visable on this plot.'
};

export const SMOOTHED_DATA_BADGE: BadgeData = {
  id: 'smoothed-data',
  label: 'Smoothed Data',
  intent: 'INFORMATION',
  description: 'The curve between points is smoothed to show the general trends.'
};

export const COMPARISON_AVERAGE_BADGE: BadgeData = {
  id: 'comparison-average',
  label: 'UK Average',
  intent: 'INFORMATION',
  description:
    'Light grey indicates the comparison average (e.g., UK average, or the selected comparison option).'
};

export const BACKGROUND_READING_BADGE: BadgeData = {
  label: 'Background Reading Available',
  description: 'todo',
  intent: 'CONFIRMATION',
  type: 'CONTEXT'
};

export const OPEN_DATA_BADGE: BadgeData = {
  label: 'Open Data',
  description: 'todo',
  intent: 'CONFIRMATION',
  type: 'DATA'
};

export const RAW_DATA_AVAILABLE_BADGE: BadgeData = {
  label: 'Raw Data Available',
  description: 'todo',
  intent: 'CONFIRMATION',
  type: 'DATA'
};

export const INTERACTIVE_BADGE: BadgeData = {
  id: 'interactive',
  label: 'Interactive',
  intent: 'INFORMATION',
  icon: 'Interactive',
  description:
    'This map is interactive. You can pan and zoom, and click areas to explore values. *Scroll for zooming in and out.'
};

export const PER_CAPITA_MAP_BADGE: BadgeData = {
  id: 'per-capita',
  label: 'Per capita',
  intent: 'INFORMATION',
  description:
    'This chart uses per capita values. i.e. show the cost/benefit per person in each LAD.\nMap tiles © Stadia Maps, © OpenMapTiles, © OpenStreetMap contributors.'
};

export const MODELLED_DATA_BADGE: BadgeData = {
  id: 'modelled-data',
  label: 'Contains modelled data',
  intent: 'INFORMATION',
  description:
    'These values are modelled estimates (not direct measurements). They are based on the underlying scenario modelling described in the Methods.'
};

// --- Page/chart badges (previously in `pageBadges.ts`) ---
export const CORRELATION_NOT_CAUSATION_BADGE: BadgeData = {
  label: 'Correlation ≠ Causation',
  description: 'todo',
  intent: 'WARNING'
};

export const AGGREGATED_DATA_BADGE: BadgeData = {
  label: 'Aggregated data',
  description:
    'Each socio-economic factor value for a given local authority is aggregated from the data zones within its boundary.',
  intent: 'INFORMATION'
};

export const BOX_PLOTS_BADGE: BadgeData = {
  label: 'Box plots',
  description: 'todo',
  intent: 'INFORMATION'
};

export const DISCRETE_SCALES_BADGE: BadgeData = {
  label: 'Discrete scales',
  description: 'The first set of socio-economic factors use categorical values where the x-axis is non-linear.',
  intent: 'INFORMATION'
};

export const TOTAL_VALUES_BADGE: BadgeData = {
  id: 'total-values',
  label: 'Total values',
  intent: 'INFORMATION',
  description: 'This chart uses total values. i.e. shows the total benefit/cost for all of the UK.'
};
