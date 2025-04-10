import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = 'medium',
}) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'elevated':
        return styles.elevatedCard;
      case 'outlined':
        return styles.outlinedCard;
      case 'default':
      default:
        return styles.defaultCard;
    }
  };

  const getPaddingStyle = () => {
    switch (padding) {
      case 'none':
        return {};
      case 'small':
        return styles.smallPadding;
      case 'large':
        return styles.largePadding;
      case 'medium':
      default:
        return styles.mediumPadding;
    }
  };

  return (
    <View style={[styles.card, getCardStyle(), getPaddingStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.m,
    overflow: 'hidden',
  },
  defaultCard: {
    backgroundColor: COLORS.card,
  },
  elevatedCard: {
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  outlinedCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  smallPadding: {
    padding: SIZES.spacing.s,
  },
  mediumPadding: {
    padding: SIZES.spacing.m,
  },
  largePadding: {
    padding: SIZES.spacing.l,
  },
});

export default Card;
