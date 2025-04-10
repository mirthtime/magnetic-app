import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';

interface DayCardProps {
  day: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
  onPress: () => void;
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  title,
  description,
  isCompleted,
  isLocked,
  isCurrent,
  onPress,
}) => {
  const getStatusIcon = () => {
    if (isCompleted) {
      return <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />;
    }
    if (isLocked) {
      return <Ionicons name="lock-closed" size={24} color={COLORS.inactive} />;
    }
    if (isCurrent) {
      return <Ionicons name="play-circle" size={24} color={COLORS.primary} />;
    }
    return <Ionicons name="ellipse-outline" size={24} color={COLORS.textSecondary} />;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isCurrent && styles.currentContainer,
        isLocked && styles.lockedContainer,
      ]}
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.7}
    >
      <View style={styles.dayBadge}>
        <Text variant="h4" color={COLORS.text} align="center">
          {day}
        </Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text variant="h3" style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {getStatusIcon()}
        </View>
        
        <Text 
          variant="body" 
          color={COLORS.textSecondary} 
          numberOfLines={2}
          style={styles.description}
        >
          {description}
        </Text>
      </View>
      
      {!isLocked && (
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.m,
    padding: SIZES.spacing.m,
    marginBottom: SIZES.spacing.m,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  currentContainer: {
    borderLeftColor: COLORS.primary,
  },
  lockedContainer: {
    opacity: 0.7,
  },
  dayBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.m,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.spacing.xs,
  },
  title: {
    flex: 1,
    marginRight: SIZES.spacing.s,
  },
  description: {
    opacity: 0.8,
  },
  arrowContainer: {
    justifyContent: 'center',
    marginLeft: SIZES.spacing.s,
  },
});

export default DayCard;
