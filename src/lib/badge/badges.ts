import type { BadgeData } from './types';

export const MAJOR_FINDING_BADGE: BadgeData = {
  label: 'Major Finding',
  description: 'todo',
  intent: 'CONFIRMATION',
  type: 'CONTEXT'
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
  description: 'This map is interactive. You can pan and zoom, and click areas to explore values.'
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
