import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for our context
export interface Day {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
  audioTitle: string;
  audioDuration: string;
  content: string;
  challenge: string;
  reflection: string;
}

interface ChallengeContextType {
  isUnlocked: boolean;
  unlockCode: string | null;
  days: Day[];
  currentDay: number;
  progress: number;
  unlockApp: (code: string) => Promise<boolean>;
  completeDay: (dayId: number, reflection: string) => Promise<void>;
  getDayContent: (dayId: number) => Day | undefined;
  resetProgress: () => Promise<void>;
}

// Create the context
const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

// Initial days data
const initialDays: Day[] = [
  {
    id: 0,
    title: 'Preparation Day',
    description: 'Get ready for your 7-day journey to deeper intimacy.',
    isCompleted: false,
    isLocked: false,
    isCurrent: true,
    audioTitle: 'Introduction to the Challenge',
    audioDuration: '2:45',
    content: 'Welcome to the 7-Day Magnet Challenge. This program is designed to help you transform your intimate relationship with your wife through intentional leadership and connection.\n\nToday is about preparing yourself mentally and emotionally for the journey ahead. Take some time to reflect on your current relationship and set clear intentions for what you want to achieve through this challenge.',
    challenge: 'Tonight, find a quiet moment to write down three specific aspects of your intimate relationship you want to improve. Be honest with yourself about where you may have been passive rather than leading in your relationship.',
    reflection: '',
  },
  {
    id: 1,
    title: 'Building Connection',
    description: 'Learn the foundations of emotional connection that leads to physical intimacy.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
    audioTitle: 'The Connection Principle',
    audioDuration: '3:12',
    content: 'Day 1 focuses on the fundamental truth that emotional connection precedes physical intimacy for most women. Today you'll learn how to create the emotional environment that makes your wife feel safe, valued, and connected.\n\nMany men make the mistake of trying to jump straight to physical intimacy without laying the groundwork of emotional connection. This approach often leads to rejection and frustration.',
    challenge: 'Today, engage your wife in a conversation about something she's interested in. Practice active listening without trying to solve problems or direct the conversation. Your goal is simply to connect emotionally without any expectation of physical intimacy.',
    reflection: '',
  },
  {
    id: 2,
    title: 'Communication Secrets',
    description: 'Discover how to communicate your desires effectively and respectfully.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
    audioTitle: 'Expressing Desire With Confidence',
    audioDuration: '2:58',
    content: 'Day 2 is about learning to communicate your desires clearly and confidently. Many men either avoid expressing their desires (leading to frustration) or communicate them poorly (leading to pressure).\n\nToday you'll learn the art of expressing desire in a way that makes your wife feel wanted rather than obligated.',
    challenge: 'Practice expressing a desire to your wife today using the framework provided in the audio lesson. Remember to focus on how she makes you feel rather than what you want her to do.',
    reflection: '',
  },
  {
    id: 3,
    title: 'Physical Touch',
    description: 'Master the art of touch that creates anticipation and desire.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
    audioTitle: 'The Language of Touch',
    audioDuration: '3:05',
    content: 'Day 3 focuses on physical touch as a language of intimacy. You'll learn how different types of touch communicate different messages and how to use touch to create connection rather than pressure.\n\nMany men default to touch that communicates sexual intent too quickly, which can create resistance. Today you'll learn how to use touch to build anticipation and desire.',
    challenge: 'Practice the three types of touch discussed in the audio lesson. Pay attention to how your wife responds to each type and adjust accordingly. Remember that your goal is to make her feel desired, not pressured.',
    reflection: '',
  },
  {
    id: 4,
    title: 'Creating Atmosphere',
    description: 'Learn to set the stage for intimate encounters that she'll crave.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
    audioTitle: 'Setting the Stage',
    audioDuration: '2:47',
    content: 'Day 4 is about creating an atmosphere conducive to intimacy. You'll learn how environmental factors and timing significantly impact a woman's ability to be present for intimate connection.\n\nMany men underestimate the importance of setting and context, focusing only on the physical aspects of intimacy. Today you'll learn how to create an environment that helps your wife transition from her daily responsibilities to intimate connection.',
    challenge: 'Create an intimate atmosphere tonight using the principles discussed in the audio lesson. Focus on removing distractions, engaging multiple senses, and timing your approach thoughtfully.',
    reflection: '',
  },
  {
    id: 5,
    title: 'Overcoming Barriers',
    description: 'Address common obstacles that prevent deeper intimacy in your relationship.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
    audioTitle: 'Breaking Through Resistance',
    audioDuration: '3:22',
    content: 'Day 5 addresses the common barriers to intimacy that exist in many relationships. You'll learn to identify and overcome obstacles like resentment, stress, body image concerns, and past negative experiences.\n\nMany couples get stuck in patterns that reinforce these barriers rather than breaking through them. Today you'll learn strategies for addressing these issues directly and compassionately.',
    challenge: 'Identify one barrier to intimacy in your relationship and take one concrete step to address it using the approaches discussed in the audio lesson. Remember to approach this with patience and understanding.',
    reflection: '',
  },
  {
    id: 6,
    title: 'Playful Exploration',
    description: 'Introduce elements of play and adventure into your intimate life.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
    audioTitle: 'The Power of Play',
    audioDuration: '2:51',
    content: 'Day 6 focuses on bringing playfulness and exploration into your intimate relationship. You'll learn how playfulness reduces pressure, increases comfort, and creates space for new experiences.\n\nMany couples fall into predictable routines that drain the excitement from their intimate life. Today you'll learn how to introduce elements of play, surprise, and adventure in ways that feel safe and inviting.',
    challenge: 'Introduce one element of playfulness or novelty into your interaction with your wife today, using the ideas discussed in the audio lesson. Pay attention to how this changes the dynamic between you.',
    reflection: '',
  },
  {
    id: 7,
    title: 'Sustaining Passion',
    description: 'Create lasting patterns that maintain desire and connection.',
    isCompleted: false,
    isLocked: true,
    isCurrent: false,
    audioTitle: 'The Long Game',
    audioDuration: '3:18',
    content: 'Day 7 is about creating sustainable patterns that maintain passion and connection over the long term. You'll learn how to integrate the principles from the previous days into your daily life.\n\nMany couples experience temporary improvements that fade over time. Today you'll learn how to create lasting change through consistent application of key principles and regular relationship maintenance.',
    challenge: 'Create a simple plan for maintaining the practices you've learned throughout this challenge. Identify the 2-3 principles that had the biggest impact and commit to implementing them regularly.',
    reflection: '',
  },
];

// Provider component
export const ChallengeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [unlockCode, setUnlockCode] = useState<string | null>(null);
  const [days, setDays] = useState<Day[]>(initialDays);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load data from storage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load unlock status
        const storedUnlockCode = await AsyncStorage.getItem('@unlock_code');
        if (storedUnlockCode) {
          setIsUnlocked(true);
          setUnlockCode(storedUnlockCode);
        }

        // Load days data
        const storedDays = await AsyncStorage.getItem('@days_data');
        if (storedDays) {
          setDays(JSON.parse(storedDays));
        }

        // Load current day
        const storedCurrentDay = await AsyncStorage.getItem('@current_day');
        if (storedCurrentDay) {
          setCurrentDay(parseInt(storedCurrentDay, 10));
        }

        // Calculate progress
        const completedCount = days.filter(day => day.isCompleted).length;
        setProgress((completedCount / days.length) * 100);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save days data whenever it changes
  useEffect(() => {
    const saveDays = async () => {
      if (!isLoading) {
        try {
          await AsyncStorage.setItem('@days_data', JSON.stringify(days));
          
          // Calculate and update progress
          const completedCount = days.filter(day => day.isCompleted).length;
          const newProgress = (completedCount / days.length) * 100;
          setProgress(newProgress);
        } catch (error) {
          console.error('Error saving days data:', error);
        }
      }
    };

    saveDays();
  }, [days, isLoading]);

  // Save current day whenever it changes
  useEffect(() => {
    const saveCurrentDay = async () => {
      if (!isLoading) {
        try {
          await AsyncStorage.setItem('@current_day', currentDay.toString());
        } catch (error) {
          console.error('Error saving current day:', error);
        }
      }
    };

    saveCurrentDay();
  }, [currentDay, isLoading]);

  // Unlock the app with a code
  const unlockApp = async (code: string): Promise<boolean> => {
    // In a real app, you might validate the code against a server
    // For this demo, we'll accept any code that matches the format
    const codePattern = /^[A-Z]{3,4}-\d{4}-[A-Z]{3}$/;
    const isValid = codePattern.test(code);

    if (isValid) {
      try {
        await AsyncStorage.setItem('@unlock_code', code);
        setUnlockCode(code);
        setIsUnlocked(true);
        return true;
      } catch (error) {
        console.error('Error saving unlock code:', error);
        return false;
      }
    }

    return false;
  };

  // Complete a day and unlock the next one
  const completeDay = async (dayId: number, reflection: string): Promise<void> => {
    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        // Mark current day as completed
        return { ...day, isCompleted: true, isCurrent: false, reflection };
      } else if (day.id === dayId + 1) {
        // Unlock and set next day as current
        return { ...day, isLocked: false, isCurrent: true };
      }
      return day;
    });

    setDays(updatedDays);
    setCurrentDay(dayId + 1);
  };

  // Get content for a specific day
  const getDayContent = (dayId: number): Day | undefined => {
    return days.find(day => day.id === dayId);
  };

  // Reset all progress (for testing)
  const resetProgress = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('@days_data');
      await AsyncStorage.removeItem('@current_day');
      setDays(initialDays);
      setCurrentDay(0);
      setProgress(0);
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  const value = {
    isUnlocked,
    unlockCode,
    days,
    currentDay,
    progress,
    unlockApp,
    completeDay,
    getDayContent,
    resetProgress,
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
};

// Custom hook to use the challenge context
export const useChallenge = (): ChallengeContextType => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};
