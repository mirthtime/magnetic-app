export const COLORS = {
  primary: '#E32636', // Bright red accent color from the website
  background: '#000000', // Pure black background
  text: '#FFFFFF', // White text
  textSecondary: '#AAAAAA', // Light gray for secondary text
  inactive: '#444444', // Dark gray for inactive elements
  card: '#111111', // Slightly lighter black for cards
  border: '#222222', // Border color
  success: '#4CAF50', // Green for success states
  error: '#FF5252', // Red for error states
  overlay: 'rgba(0, 0, 0, 0.7)', // Overlay for modals
};

export const FONTS = {
  bold: 'System', // Will use system bold font
  regular: 'System', // Will use system regular font
  light: 'System', // Will use system light font
};

export const SIZES = {
  // Font sizes
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 48,
  
  // Spacing
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  radius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    round: 9999,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
};

export default { COLORS, FONTS, SIZES, SHADOWS };
