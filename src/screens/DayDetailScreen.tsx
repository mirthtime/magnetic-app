import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from '../components/Text';
import Card from '../components/Card';
import Button from '../components/Button';
import AudioPlayer from '../components/AudioPlayer';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/Input';

interface DayDetailScreenProps {
  route: {
    params: {
      day: number;
    };
  };
  navigation: any;
}

// Mock data for day details
const getDayContent = (day: number) => {
  const days = [
    {
      title: 'Preparation Day',
      description: 'Get ready for your 7-day journey to deeper intimacy.',
      audioTitle: 'Introduction to the Challenge',
      audioDuration: '2:45',
      content: 'Welcome to the 7-Day Magnet Challenge. This program is designed to help you transform your intimate relationship with your wife through intentional leadership and connection.\n\nToday is about preparing yourself mentally and emotionally for the journey ahead. Take some time to reflect on your current relationship and set clear intentions for what you want to achieve through this challenge.',
      challenge: 'Tonight, find a quiet moment to write down three specific aspects of your intimate relationship you want to improve. Be honest with yourself about where you may have been passive rather than leading in your relationship.',
      reflection: '',
    },
    {
      title: 'Building Connection',
      description: 'Learn the foundations of emotional connection that leads to physical intimacy.',
      audioTitle: 'The Connection Principle',
      audioDuration: '3:12',
      content: 'Day 1 focuses on the fundamental truth that emotional connection precedes physical intimacy for most women. Today you'll learn how to create the emotional environment that makes your wife feel safe, valued, and connected.\n\nMany men make the mistake of trying to jump straight to physical intimacy without laying the groundwork of emotional connection. This approach often leads to rejection and frustration.',
      challenge: 'Today, engage your wife in a conversation about something she's interested in. Practice active listening without trying to solve problems or direct the conversation. Your goal is simply to connect emotionally without any expectation of physical intimacy.',
      reflection: '',
    },
    {
      title: 'Communication Secrets',
      description: 'Discover how to communicate your desires effectively and respectfully.',
      audioTitle: 'Expressing Desire With Confidence',
      audioDuration: '2:58',
      content: 'Day 2 is about learning to communicate your desires clearly and confidently. Many men either avoid expressing their desires (leading to frustration) or communicate them poorly (leading to pressure).\n\nToday you'll learn the art of expressing desire in a way that makes your wife feel wanted rather than obligated.',
      challenge: 'Practice expressing a desire to your wife today using the framework provided in the audio lesson. Remember to focus on how she makes you feel rather than what you want her to do.',
      reflection: '',
    },
  ];
  
  return days[day] || days[0];
};

const DayDetailScreen = ({ route, navigation }: DayDetailScreenProps) => {
  const { day } = route.params;
  const dayContent = getDayContent(day);
  const [reflection, setReflection] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    // In a real app, this would save the reflection and mark the day as completed
    setIsCompleted(true);
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.dayBadge}>
            <Text variant="h3" color={COLORS.text} align="center">
              {day}
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text variant="h2" style={styles.title}>{dayContent.title}</Text>
            <Text variant="body" color={COLORS.textSecondary}>
              {dayContent.description}
            </Text>
          </View>
        </View>

        <Card style={styles.audioCard}>
          <Text variant="h4" style={styles.sectionTitle}>Today's Lesson</Text>
          <AudioPlayer
            title={dayContent.audioTitle}
            duration={dayContent.audioDuration}
            onPlay={() => console.log('Play')}
            onPause={() => console.log('Pause')}
            onRewind={() => console.log('Rewind')}
            onForward={() => console.log('Forward')}
          />
        </Card>

        <Card style={styles.contentCard}>
          <Text variant="h4" style={styles.sectionTitle}>Overview</Text>
          <Text variant="body" style={styles.content}>
            {dayContent.content}
          </Text>
        </Card>

        <Card style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Ionicons name="flame" size={24} color={COLORS.primary} />
            <Text variant="h4" style={styles.challengeTitle}>Today's Challenge</Text>
          </View>
          <Text variant="body" style={styles.content}>
            {dayContent.challenge}
          </Text>
        </Card>

        <Card style={styles.reflectionCard}>
          <Text variant="h4" style={styles.sectionTitle}>Evening Reflection</Text>
          <Text variant="body" color={COLORS.textSecondary} style={styles.reflectionPrompt}>
            Take a moment to reflect on your experience with today's challenge. What did you learn? How did it feel?
          </Text>
          <Input
            placeholder="Write your reflection here..."
            value={reflection}
            onChangeText={setReflection}
            multiline
            numberOfLines={4}
            style={styles.reflectionInput}
          />
          <Button
            title={isCompleted ? "Completed!" : "Complete Day"}
            onPress={handleComplete}
            disabled={reflection.trim().length === 0 || isCompleted}
            style={styles.completeButton}
            variant={isCompleted ? "secondary" : "primary"}
          />
        </Card>
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
    flexDirection: 'row',
    marginBottom: SIZES.spacing.xl,
  },
  dayBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.m,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: SIZES.spacing.xs,
  },
  audioCard: {
    marginBottom: SIZES.spacing.l,
    padding: SIZES.spacing.m,
  },
  sectionTitle: {
    marginBottom: SIZES.spacing.m,
  },
  contentCard: {
    marginBottom: SIZES.spacing.l,
    padding: SIZES.spacing.m,
  },
  content: {
    lineHeight: 24,
  },
  challengeCard: {
    marginBottom: SIZES.spacing.l,
    padding: SIZES.spacing.m,
    backgroundColor: 'rgba(227, 38, 54, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
  },
  challengeTitle: {
    marginLeft: SIZES.spacing.s,
  },
  reflectionCard: {
    marginBottom: SIZES.spacing.xl,
    padding: SIZES.spacing.m,
  },
  reflectionPrompt: {
    marginBottom: SIZES.spacing.m,
  },
  reflectionInput: {
    marginBottom: SIZES.spacing.m,
  },
  completeButton: {
    alignSelf: 'center',
  },
});

export default DayDetailScreen;
