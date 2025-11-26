export const THEME_COLORS = {
  cyan: {
    accent: 'text-brand-cyan',
    bg: 'bg-brand-cyan/10',
    border: 'border-brand-cyan/20',
    bullet: 'bg-brand-cyan',
    shadow: 'shadow-brand-cyan',
    line: 'bg-brand-cyan',
  },
  blue: {
    accent: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
    border: 'border-brand-blue/20',
    bullet: 'bg-brand-blue',
    shadow: 'shadow-brand-blue',
    line: 'bg-brand-blue',
  },
  purple: {
    accent: 'text-brand-purple',
    bg: 'bg-brand-purple/10',
    border: 'border-brand-purple/20',
    bullet: 'bg-brand-purple',
    shadow: 'shadow-brand-purple',
    line: 'bg-brand-purple',
  },
  emerald: {
    accent: 'text-brand-emerald',
    bg: 'bg-brand-emerald/10',
    border: 'border-brand-emerald/20',
    bullet: 'bg-brand-emerald',
    shadow: 'shadow-brand-emerald',
    line: 'bg-brand-emerald',
  },
  red: {
    accent: 'text-brand-red',
    bg: 'bg-brand-red/10',
    border: 'border-brand-red/20',
    bullet: 'bg-brand-red',
    shadow: 'shadow-brand-red',
    line: 'bg-brand-red',
  },
  amber: {
    accent: 'text-brand-amber',
    bg: 'bg-brand-amber/10',
    border: 'border-brand-amber/20',
    bullet: 'bg-brand-amber',
    shadow: 'shadow-brand-amber',
    line: 'bg-brand-amber',
  },
};

export type ThemeColor = keyof typeof THEME_COLORS;
