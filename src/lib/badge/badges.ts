import type { BadgeData } from './types';

export const MAJOR_FINDING_BADGE: BadgeData = {
  label: 'Major Finding',
  description: 'Each bar shows the predicted total costs in billion pounds for each five-year periods for all of UK.',
  intent: 'CONFIRMATION',
  type: 'CONTEXT'
};

export const BACKGROUND_READING_BADGE: BadgeData = {
  label: 'Background Reading Available',
  description: 'Additional background reading is available, including context, assumptions, and methods used.',
  intent: 'CONFIRMATION',
  type: 'CONTEXT'
};

export const OPEN_DATA_BADGE: BadgeData = {
  label: 'Open Data',
  description: 'The underlying data used for this visualization is publicly available and can be downloaded.',
  intent: 'CONFIRMATION',
  type: 'DATA'
};

export const RAW_DATA_AVAILABLE_BADGE: BadgeData = {
  label: 'Raw Data Available',
  description: 'The raw underlying data is available for download.',
  intent: 'CONFIRMATION',
  type: 'DATA'
};
