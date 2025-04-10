import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useChallenge } from '../context/ChallengeContext';
import { COLORS } from '../constants/theme';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import JournalScreen from '../screens/JournalScreen';
import StoriesScreen from '../screens/StoriesScreen';
import CoachScreen from '../screens/CoachScreen';
import DayDetailScreen from '../screens/DayDetailScreen';
import UnlockScreen from '../screens/UnlockScreen';

// Define navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  DayDetail: { day: number };
};

export type MainTabParamList = {
  Home: undefined;
  Journal: undefined;
  Stories: undefined;
  Coach: undefined;
};

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom theme for navigation
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
    card: COLORS.card,
    text: COLORS.text,
    border: COLORS.border,
    notification: COLORS.primary,
  },
};

// Bottom tab navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Journal') {
            iconName = focused ? 'journal' : 'journal-outline';
          } else if (route.name === 'Stories') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Coach') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-circle';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
        },
        headerStyle: {
          backgroundColor: COLORS.background,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Challenge' }}
      />
      <Tab.Screen 
        name="Journal" 
        component={JournalScreen} 
        options={{ title: 'Journal' }}
      />
      <Tab.Screen 
        name="Stories" 
        component={StoriesScreen} 
        options={{ title: 'Stories' }}
      />
      <Tab.Screen 
        name="Coach" 
        component={CoachScreen} 
        options={{ title: 'Coach' }}
      />
    </Tab.Navigator>
  );
};

// Main navigation container
const AppNavigation = () => {
  const { isUnlocked } = useChallenge();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.background },
        }}
      >
        {!isUnlocked ? (
          <Stack.Screen name="Auth" component={UnlockScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="DayDetail" 
              component={DayDetailScreen}
              options={{
                headerShown: true,
                headerTitle: 'Day Challenge',
                headerStyle: {
                  backgroundColor: COLORS.background,
                  shadowColor: 'transparent',
                  elevation: 0,
                },
                headerTintColor: COLORS.text,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
