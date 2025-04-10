import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from '../components/Text';
import DayCard from '../components/DayCard';

// Mock data for the 7-day challenge
const challengeDays = [
  {
    day: 0,
    title: 'Preparation Day',
    description: 'Get ready for your 7-day journey to deeper intimacy.',
    isCompleted: false,
    isLocked: false,
    isCurrent: true,
  },
  {
    day: 1,
    title: 'Building Connection',
    description: 'Learn the foundations of emotional connection that leads to physical intimacy.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
  },
  {
    day: 2,
    title: 'Communication Secrets',
    description: 'Discover how to communicate your desires effectively and respectfully.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
  },
  {
    day: 3,
    title: 'Physical Touch',
    description: 'Master the art of touch that creates anticipation and desire.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
  },
  {
    day: 4,
    title: 'Creating Atmosphere',
    description: 'Learn to set the stage for intimate encounters that she'll crave.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
  },
  {
    day: 5,
    title: 'Overcoming Barriers',
    description: 'Address common obstacles that prevent deeper intimacy in your relationship.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
  },
  {
    day: 6,
    title: 'Playful Exploration',
    description: 'Introduce elements of play and adventure into your intimate life.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
  },
  {
    day: 7,
    title: 'Sustaining Passion',
    description: 'Create lasting patterns that maintain desire and connection.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
  },
];

const HomeScreen = ({ navigation }: any) => {
  const handleDayPress = (day: number) => {
    navigation.navigate('DayDetail', { day });
  };

  // Calculate progress percentage
  const completedDays = challengeDays.filter(day => day.isCompleted).length;
  const totalDays = challengeDays.length;
  const progressPercentage = (completedDays / totalDays) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="h2" style={styles.title}>7-Day Challenge</Text>
          <Text variant="body" color={COLORS.textSecondary}>
            Your journey to deeper intimacy
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
          <Text variant="caption" color={COLORS.textSecondary} style={styles.progressText}>
            {completedDays} of {totalDays} days completed
          </Text>
        </View>

        <View style={styles.daysContainer}>
          <Text variant="h3" style={styles.sectionTitle}>Your Challenge</Text>
          
          {challengeDays.map((day) => (
            <DayCard
              key={day.day}
              day={day.day}
              title={day.title}
              description={day.description}
              isCompleted={day.isCompleted}
              isLocked={day.isLocked}
              isCurrent={day.isCurrent}
              onPress={() => handleDayPress(day.day)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.spacing.l,
  },
  header: {
    marginBottom: SIZES.spacing.xl,
  },
  title: {
    marginBottom: SIZES.spacing.xs,
  },
  progressContainer: {
    marginBottom: SIZES.spacing.xl,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.inactive,
    borderRadius: SIZES.radius.s,
    marginBottom: SIZES.spacing.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.s,
  },
  progressText: {
    textAlign: 'right',
  },
  daysContainer: {
    marginBottom: SIZES.spacing.xl,
  },
  sectionTitle: {
    marginBottom: SIZES.spacing.m,
  },
});

export default HomeScreen;
