export type BadgeIntent = 'CONFIRMATION' | 'INFORMATION' | 'WARNING' | (string & {});
export type BadgeScope = 'DATA' | 'ANALYSIS' | 'VISUAL ENCODING' | 'INTERACTION' | 'CONTEXT' | (string & {});

export type ChipSize = 'small' | 'medium' | 'large';
export type ChipVariant = 'filled' | 'outlined';

export type ChipColor =
  | 'grey'
  | 'black'
  | 'success'
  | 'warning'
  | 'info'
  | 'primary'
  | 'secondary';

export type IconKey = 'none' | 'iconIntent' | 'iconScope' | 'avatar';

export type BadgeAvatar = { type: 'letter' | 'image'; value: string };

export interface BadgeData {
  id?: string | number;
  label: string;
  description?: string;
  intent?: BadgeIntent;
  type?: BadgeScope;
  avatar?: BadgeAvatar;
  [key: string]: unknown;
}

