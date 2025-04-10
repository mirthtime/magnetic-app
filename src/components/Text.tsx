import { StyleSheet, Text as RNText, TextProps, TextStyle } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface CustomTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'button';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: TextStyle;
  bold?: boolean;
}

const Text: React.FC<CustomTextProps> = ({
  variant = 'body',
  color = COLORS.text,
  align = 'left',
  style,
  bold = false,
  children,
  ...props
}) => {
  const getTextStyle = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'button':
        return styles.button;
      case 'caption':
        return styles.caption;
      case 'body':
      default:
        return styles.body;
    }
  };

  return (
    <RNText
      style={[
        getTextStyle(),
        {
          color,
          textAlign: align,
          fontWeight: bold ? 'bold' : 'normal',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: SIZES.xxxLarge,
    fontFamily: FONTS.bold,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONTS.bold,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  h3: {
    fontSize: SIZES.xLarge,
    fontFamily: FONTS.bold,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    fontWeight: 'bold',
  },
  body: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
  },
  caption: {
    fontSize: SIZES.small,
    fontFamily: FONTS.light,
  },
  button: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default Text;
