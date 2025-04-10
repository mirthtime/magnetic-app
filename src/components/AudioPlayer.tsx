import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';

interface AudioPlayerProps {
  title: string;
  duration: string;
  onPlay: () => void;
  onPause: () => void;
  onRewind: () => void;
  onForward: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  duration,
  onPlay,
  onPause,
  onRewind,
  onForward,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
    setIsPlaying(!isPlaying);
  };

  // This would be replaced with actual audio progress in a real implementation
  const progressBarWidth = `${progress * 100}%`;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="h4" numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text variant="caption" color={COLORS.textSecondary}>
          {duration}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: progressBarWidth }]} />
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={onRewind}>
          <Ionicons name="play-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color={COLORS.text}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={onForward}>
          <Ionicons name="play-forward" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.m,
    padding: SIZES.spacing.m,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
  },
  title: {
    flex: 1,
    marginRight: SIZES.spacing.s,
  },
  progressContainer: {
    marginBottom: SIZES.spacing.m,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.inactive,
    borderRadius: SIZES.radius.s,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.s,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: SIZES.spacing.m,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.spacing.m,
  },
});

export default AudioPlayer;
