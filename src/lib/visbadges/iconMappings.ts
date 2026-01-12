import type { BadgeIntent, BadgeScope } from './types';

const icon_intent_map: Record<string, string> = {
  CONFIRMATION: 'CheckCircle',
  INFORMATION: 'Info',
  WARNING: 'Warning',
};

const icon_scope_map: Record<string, string> = {
  DATA: 'DatasetOutlined',
  ANALYSIS: 'AnalyticsOutlined',
  'VISUAL ENCODING': 'BubbleChartOutlined',
  INTERACTION: 'TouchAppOutlined',
  CONTEXT: 'QueryStatsOutlined',
};

export function resolveIntentIconName(intent?: BadgeIntent): string {
  if (!intent) return '';
  return icon_intent_map[String(intent).toUpperCase()] ?? '';
}

export function resolveScopeIconName(scope?: BadgeScope): string {
  if (!scope) return '';
  return icon_scope_map[String(scope).toUpperCase()] ?? '';
}

