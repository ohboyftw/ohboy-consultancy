
export interface BrandColors {
  primary: string;
  background: string;
  accent: string;
  text: string;
}

export interface LogoProps {
  size?: number;
  className?: string;
  variant?: 'standard' | 'minimal' | 'circuit';
  showBackground?: boolean;
}
