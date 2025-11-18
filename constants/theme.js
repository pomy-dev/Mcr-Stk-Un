// constants/vendorTheme.js (or wherever your theme is)
import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';

// Define Paper-compatible font configuration
const fontConfig = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0,
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  light: {
    fontFamily: 'System',
    fontWeight: '300',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  thin: {
    fontFamily: 'System',
    fontWeight: '100',
    lineHeight: 16,
    letterSpacing: 0.1,
  },
};

// Or use default config (recommended for simplicity)
const defaultFontConfig = configureFonts({ config: fontConfig });

// Light Theme (Paper + Your Colors)
export const CustomLightTheme = {
  ...MD3LightTheme,
  dark: false,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#003366',
    background: '#F8FAFC',
    secondary: '#f8f7f7ff',
    card: '#FFFFFF',
    sub_card: '#f0f0f0ff',
    text: '#333333',
    sub_text: '#7d7d7dff',
    placeholder: '#757575',
    disabled: '#BDBDBD',
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#F57C00',
    light: '#3a3a3aff',
    indicator: '#003366',
    border: '#e9e8e8ff',
    notification: '#FF4500',
    highlight: 'rgba(0, 0, 0, 0.5)',
  },
  gradients: {
    primary: ['#1a5f7a', '#159895'],
    secondary: ['#c87941', '#e89663'],
    dark: ['#0d3e52', '#1a5f7a'],
    warm: ['#d89963', '#c87941'],
    cool: ['#159895', '#1a5f7a'],
    success: ['#27ae60', '#2ecc71'],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  fonts: defaultFontConfig,
};

// Dark Theme
export const CustomDarkTheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#003366',
    primary2: '#151775ff',
    background: '#1E293B',
    secondary: '#CCCC',
    card: '#415970ff',
    sub_card: '#415970ff',
    text: '#CCC',
    sub_text: '#CCCC',
    light: '#FFFFFF',
    indicator: '#5a85b0ff',
    border: '#272727',
    notification: '#FF4500',
    highlight: 'rgba(0, 0, 0, 0.2)',
  },
  fonts: defaultFontConfig,
};