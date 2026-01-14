export type BadgeIntent = 'CONFIRMATION' | 'INFORMATION' | 'WARNING';

export interface BadgeData {
  id?: string | number;
  label: string;
  description?: string;
  intent?: BadgeIntent;
  /**
   * Optional category/scope of the badge (currently not rendered, but kept for data completeness).
   * Examples: 'DATA', 'ANALYSIS', 'VISUAL ENCODING', 'INTERACTION', 'CONTEXT'.
   */
  type?: string;
}

