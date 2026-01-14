export type BadgeIntent = 'CONFIRMATION' | 'INFORMATION' | 'WARNING';

export type BadgeOnClick = {
  /**
   * Destination.
   * - If external is true, this should be a full URL (https://...).
   * - If external is false/omitted, this should be an internal path (e.g. '/methods').
   */
  href: string;
  /**
   * When true, opens in a new tab.
   * When false/omitted, behaves as an internal link.
   */
  external?: boolean;
};

export interface BadgeData {
  id?: string | number;
  label: string;
  description?: string;
  intent?: BadgeIntent;
  /**
   * Optional grouping/category for downstream filtering/analytics.
   * (Some badge definitions include this field.)
   */
  type?: string;
}

