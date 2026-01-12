import type { BadgeData } from './types';

export const MAJOR_FINDING_BADGE: BadgeData = {
  label: 'Major Finding',
  description: 'Each bar shows the predicted total costs in billion pounds for each five-year periods for all of UK.',
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
  description: 'todo.',
  intent: 'CONFIRMATION',
  type: 'DATA'
};

