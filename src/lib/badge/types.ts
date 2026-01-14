export type BadgeIntent = 'CONFIRMATION' | 'INFORMATION' | 'WARNING';

export interface BadgeData {
  id?: string | number;
  label: string;
  description?: string;
  intent?: BadgeIntent;
}

