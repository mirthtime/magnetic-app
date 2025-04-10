import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from './Text';
import Button from './Button';
import Card from './Card';

interface UnlockScreenProps {
  onUnlock: (code: string) => void;
  error?: string;
  isLoading?: boolean;
}

const UnlockScreen: React.FC<UnlockScreenProps> = ({
  onUnlock,
  error,
  isLoading = false,
}) => {
  const [code, setCode] = useState('');
  const [segments, setSegments] = useState(['', '', '']);
  
  const handleSegmentChange = (text: string, index: number) => {
    const newSegments = [...segments];
    newSegments[index] = text.toUpperCase();
    setSegments(newSegments);
    
    // Combine segments with hyphens
    const fullCode = newSegments.join('-');
    setCode(fullCode);
  };

  const handleUnlock = () => {
    if (code.length > 0) {
      onUnlock(code);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" align="center" style={styles.title}>MAGNET</Text>
        <Text variant="h3" align="center" color={COLORS.primary} style={styles.subtitle}>
          7-DAY CHALLENGE
        </Text>
      </View>
      
      <Card variant="elevated" style={styles.card}>
        <Text variant="h3" align="center" style={styles.cardTitle}>
          Enter Your Unlock Code
        </Text>
        
        <Text variant="body" color={COLORS.textSecondary} align="center" style={styles.instructions}>
          Enter the code from your purchase to unlock the 7-day challenge.
        </Text>
        
        <View style={styles.codeInputContainer}>
          <View style={styles.segmentContainer}>
            <TextInput
              style={styles.segmentInput}
              placeholder="MAG"
              placeholderTextColor={COLORS.inactive}
              value={segments[0]}
              onChangeText={(text) => handleSegmentChange(text, 0)}
              maxLength={4}
              autoCapitalize="characters"
              selectionColor={COLORS.primary}
            />
          </View>
          <Text variant="h3" color={COLORS.textSecondary}>-</Text>
          <View style={styles.segmentContainer}>
            <TextInput
              style={styles.segmentInput}
              placeholder="1234"
              placeholderTextColor={COLORS.inactive}
              value={segments[1]}
              onChangeText={(text) => handleSegmentChange(text, 1)}
              maxLength={4}
              autoCapitalize="characters"
              selectionColor={COLORS.primary}
            />
          </View>
          <Text variant="h3" color={COLORS.textSecondary}>-</Text>
          <View style={styles.segmentContainer}>
            <TextInput
              style={styles.segmentInput}
              placeholder="XYZ"
              placeholderTextColor={COLORS.inactive}
              value={segments[2]}
              onChangeText={(text) => handleSegmentChange(text, 2)}
              maxLength={3}
              autoCapitalize="characters"
              selectionColor={COLORS.primary}
            />
          </View>
        </View>
        
        {error && (
          <Text variant="caption" color={COLORS.error} align="center" style={styles.errorText}>
            {error}
          </Text>
        )}
        
        <Button
          title="UNLOCK CHALLENGE"
          onPress={handleUnlock}
          variant="primary"
          size="large"
          fullWidth
          loading={isLoading}
          disabled={segments.some(segment => segment.length === 0)}
          style={styles.button}
        />
        
        <Text variant="caption" color={COLORS.textSecondary} align="center" style={styles.privacyNote}>
          Your code is stored locally on your device. No personal information is collected.
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.spacing.l,
    justifyContent: 'center',
  },
  header: {
    marginBottom: SIZES.spacing.xxl,
  },
  title: {
    marginBottom: SIZES.spacing.xs,
  },
  subtitle: {
    letterSpacing: 2,
  },
  card: {
    padding: SIZES.spacing.l,
  },
  cardTitle: {
    marginBottom: SIZES.spacing.m,
  },
  instructions: {
    marginBottom: SIZES.spacing.l,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.l,
  },
  segmentContainer: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.m,
    padding: SIZES.spacing.xs,
    marginHorizontal: SIZES.spacing.xs,
  },
  segmentInput: {
    color: COLORS.text,
    fontSize: SIZES.large,
    textAlign: 'center',
    minWidth: 60,
    padding: SIZES.spacing.s,
  },
  errorText: {
    marginBottom: SIZES.spacing.m,
  },
  button: {
    marginBottom: SIZES.spacing.l,
  },
  privacyNote: {
    opacity: 0.7,
  },
});

export default UnlockScreen;
