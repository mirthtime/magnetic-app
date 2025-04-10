import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from '../components/Text';
import Card from '../components/Card';

// Mock data for success stories
const mockStories = [
  {
    id: '1',
    title: 'From Roommates to Lovers',
    author: 'Anonymous, 34',
    content: 'My wife and I had fallen into a routine where we were basically just roommates. After completing the 7-day challenge, we've reconnected on a level I didn't think was possible anymore. The daily exercises helped me understand what she really needed from me emotionally before expecting physical intimacy.',
    date: '2 weeks ago',
  },
  {
    id: '2',
    title: 'Breaking Through Barriers',
    author: 'Anonymous, 37',
    content: 'We'd been stuck in a cycle of rejection and resentment for years. This program helped me see how I was contributing to the problem and gave me practical steps to break the cycle. By day 4, my wife actually initiated intimacy for the first time in months. The communication techniques from day 2 were a game-changer for us.',
    date: '1 month ago',
  },
  {
    id: '3',
    title: 'Rediscovering Passion',
    author: 'Anonymous, 32',
    content: 'After 8 years of marriage and 2 kids, our intimate life had become predictable and infrequent. The playful exploration day helped us bring back the excitement we had when we first met. My wife has told me she feels desired again in a way she hasn't in years.',
    date: '3 weeks ago',
  },
];

const StoriesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="h2" style={styles.title}>Success Stories</Text>
          <Text variant="body" color={COLORS.textSecondary}>
            Real experiences from men who completed the challenge
          </Text>
        </View>

        <View style={styles.storiesContainer}>
          {mockStories.map((story) => (
            <Card key={story.id} style={styles.storyCard} variant="elevated">
              <Text variant="h3" style={styles.storyTitle}>{story.title}</Text>
              
              <View style={styles.storyMeta}>
                <Text variant="caption" color={COLORS.primary}>
                  {story.author}
                </Text>
                <Text variant="caption" color={COLORS.textSecondary}>
                  {story.date}
                </Text>
              </View>
              
              <Text variant="body" style={styles.storyContent}>
                "{story.content}"
              </Text>
            </Card>
          ))}
        </View>

        <Card style={styles.shareCard}>
          <Text variant="h4" style={styles.shareTitle}>Share Your Story</Text>
          <Text variant="body" color={COLORS.textSecondary} style={styles.shareText}>
            Completed the challenge? Share your anonymous success story to inspire others on their journey.
          </Text>
          <View style={styles.comingSoon}>
            <Text variant="caption" color={COLORS.primary} align="center">
              Coming Soon
            </Text>
          </View>
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
    marginBottom: SIZES.spacing.xl,
  },
  title: {
    marginBottom: SIZES.spacing.xs,
  },
  storiesContainer: {
    marginBottom: SIZES.spacing.xl,
  },
  storyCard: {
    marginBottom: SIZES.spacing.l,
    padding: SIZES.spacing.l,
  },
  storyTitle: {
    marginBottom: SIZES.spacing.s,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.spacing.m,
  },
  storyContent: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
  shareCard: {
    marginBottom: SIZES.spacing.xl,
    padding: SIZES.spacing.l,
    alignItems: 'center',
  },
  shareTitle: {
    marginBottom: SIZES.spacing.s,
  },
  shareText: {
    marginBottom: SIZES.spacing.m,
    textAlign: 'center',
  },
  comingSoon: {
    backgroundColor: COLORS.card,
    paddingVertical: SIZES.spacing.xs,
    paddingHorizontal: SIZES.spacing.m,
    borderRadius: SIZES.radius.m,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});

export default StoriesScreen;
