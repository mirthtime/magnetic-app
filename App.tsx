import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ChallengeProvider } from './src/context/ChallengeContext';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  return (
    <ChallengeProvider>
      <StatusBar style="light" />
      <AppNavigation />
    </ChallengeProvider>
  );
}
