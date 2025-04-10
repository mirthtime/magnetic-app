import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from '../components/Text';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

// Mock data for journal entries
const mockJournalEntries = [
  {
    id: '1',
    day: 1,
    date: 'April 8, 2025',
    content: 'Today I learned about the importance of emotional connection before physical intimacy. I realized I often skip this step and go straight to physical advances. I'm going to focus on building emotional connection first.',
  },
  {
    id: '2',
    day: 0,
    date: 'April 7, 2025',
    content: 'Excited to start this journey. My goal is to transform my relationship with my wife and create a more passionate and fulfilling connection.',
  },
];

const JournalScreen = () => {
  const [newEntry, setNewEntry] = useState('');
  const [entries, setEntries] = useState(mockJournalEntries);

  const handleAddEntry = () => {
    if (newEntry.trim().length === 0) return;
    
    const newJournalEntry = {
      id: Date.now().toString(),
      day: 1, // This would be the current day in the actual app
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      content: newEntry,
    };
    
    setEntries([newJournalEntry, ...entries]);
    setNewEntry('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="h2" style={styles.title}>Journal</Text>
          <Text variant="body" color={COLORS.textSecondary}>
            Record your thoughts and reflections
          </Text>
        </View>

        <Card style={styles.newEntryCard}>
          <Text variant="h4" style={styles.cardTitle}>Today's Reflection</Text>
          <Input
            placeholder="Write your thoughts about today's challenge..."
            value={newEntry}
            onChangeText={setNewEntry}
            multiline
            numberOfLines={4}
            style={styles.input}
          />
          <Button
            title="Save Reflection"
            onPress={handleAddEntry}
            disabled={newEntry.trim().length === 0}
            style={styles.button}
          />
        </Card>

        <View style={styles.entriesContainer}>
          <Text variant="h3" style={styles.sectionTitle}>Previous Entries</Text>
          
          {entries.length === 0 ? (
            <Card style={styles.emptyStateCard}>
              <Text variant="body" color={COLORS.textSecondary} align="center">
                No journal entries yet. Start by adding your first reflection.
              </Text>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <Text variant="h4">Day {entry.day}</Text>
                  <Text variant="caption" color={COLORS.textSecondary}>
                    {entry.date}
                  </Text>
                </View>
                <Text variant="body" style={styles.entryContent}>
                  {entry.content}
                </Text>
              </Card>
            ))
          )}
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
  newEntryCard: {
    marginBottom: SIZES.spacing.xl,
  },
  cardTitle: {
    marginBottom: SIZES.spacing.m,
  },
  input: {
    marginBottom: SIZES.spacing.m,
  },
  button: {
    alignSelf: 'flex-end',
  },
  entriesContainer: {
    marginBottom: SIZES.spacing.xl,
  },
  sectionTitle: {
    marginBottom: SIZES.spacing.m,
  },
  emptyStateCard: {
    padding: SIZES.spacing.l,
  },
  entryCard: {
    marginBottom: SIZES.spacing.m,
    padding: SIZES.spacing.m,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.s,
  },
  entryContent: {
    lineHeight: 22,
  },
});

export default JournalScreen;
