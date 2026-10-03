export const COLORS = {
  Primary900: '#102A43',
  Primary500: '#18A999',
  Primary050: '#E8F8F4',
  Info100: '#C8E8EF',
  Surface000: '#FFFFFF',
  Surface050: '#F8FBFA',
  Accent: '#E9DFFF',
  Success: '#35B87A',
  Warning: '#F4C95D',
  Error: '#D9534F',
  Information: '#4FB3BF',
  DarkBackground: '#102A43',
  DarkSurface: '#17324D',
  DarkPrimary: '#35C8B5',
  DarkText: '#FFFFFF',
  DarkSecondaryText: '#C8E8EF',
} as const

export const FONT_SCALE = {
  Display: { size: 32, lineHeight: 40, weight: 700 },
  H1: { size: 28, lineHeight: 36, weight: 700 },
  H2: { size: 24, lineHeight: 32, weight: 600 },
  H3: { size: 20, lineHeight: 28, weight: 600 },
  BodyL: { size: 18, lineHeight: 26, weight: 400 },
  Body: { size: 16, lineHeight: 24, weight: 400 },
  BodyS: { size: 14, lineHeight: 20, weight: 400 },
  Caption: { size: 12, lineHeight: 16, weight: 500 },
} as const

export const SPACING = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 } as const

export const BORDER_RADIUS = { Small: '8px', Medium: '12px', Large: '16px', Extra: '24px', Full: '999px' } as const

export const TRANSITION = { duration: 250, easing: 'ease-in-out' } as const
