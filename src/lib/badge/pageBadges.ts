import type { BadgeData } from './types';

export const CORRELATION_NOT_CAUSATION_BADGE: BadgeData = {
  label: 'Correlation ≠ Causation',
  description:
    'todo',
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
  description:
    'todo',
  intent: 'INFORMATION'
};

export const DISCRETE_SCALES_BADGE: BadgeData = {
  label: 'Discrete scales',
  description:
    'The first set of socio-economic factors use categorical values where the x-axis is non-linear.',
  intent: 'INFORMATION'
};
