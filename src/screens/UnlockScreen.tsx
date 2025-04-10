import React, { useState } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from '../components/Text';
import Button from '../components/Button';
import Card from '../components/Card';

interface UnlockScreenProps {
  navigation: any;
}

const UnlockScreen = ({ navigation }: UnlockScreenProps) => {
  const [code, setCode] = useState('');
  const [segments, setSegments] = useState(['', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSegmentChange = (text: string, index: number) => {
    const newSegments = [...segments];
    newSegments[index] = text.toUpperCase();
    setSegments(newSegments);
    
    // Combine segments with hyphens
    const fullCode = newSegments.join('-');
    setCode(fullCode);
    
    // Clear any previous errors
    if (error) setError('');
  };

  const handleUnlock = () => {
    if (code.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call to validate code
    setTimeout(() => {
      // For demo purposes, accept any code that follows the format
      const isValidFormat = segments.every((segment, index) => {
        if (index === 0) return segment.length >= 3; // First segment (MAG)
        if (index === 1) return segment.length === 4; // Second segment (1234)
        if (index === 2) return segment.length === 3; // Third segment (XYZ)
        return true;
      });
      
      if (isValidFormat) {
        // Navigate to main app
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        setError('Invalid unlock code format. Please check and try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text variant="h1" align="center" style={styles.title}>MAGNETIC</Text>
        <Text variant="h3" align="center" color={COLORS.primary} style={styles.subtitle}>
          7-DAY CHALLENGE
        </Text>
      </View>
      
      <Text variant="h2" align="center" style={styles.tagline}>
        STOP HOPING FOR SEX.
      </Text>
      <Text variant="h2" align="center" style={styles.tagline}>
        START LEADING.
      </Text>
      
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
        
        {error ? (
          <Text variant="caption" color={COLORS.error} align="center" style={styles.errorText}>
            {error}
          </Text>
        ) : null}
        
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
      
      <Text variant="body" color={COLORS.textSecondary} align="center" style={styles.footerText}>
        The book for men who want a passionate and playful sexual relationship with their wives and are tired of waiting for it to magically happen.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.spacing.l,
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: SIZES.spacing.xl,
    alignItems: 'center',
  },
  title: {
    marginBottom: SIZES.spacing.xs,
    letterSpacing: 2,
  },
  subtitle: {
    letterSpacing: 2,
  },
  tagline: {
    marginBottom: SIZES.spacing.m,
    letterSpacing: 1,
  },
  card: {
    padding: SIZES.spacing.l,
    marginVertical: SIZES.spacing.xl,
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
  footerText: {
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default UnlockScreen;
