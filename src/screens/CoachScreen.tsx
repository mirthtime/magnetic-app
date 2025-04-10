import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from '../components/Text';
import Card from '../components/Card';
import Input from '../components/Input';
import { Ionicons } from '@expo/vector-icons';

// Mock data for coach responses
const mockResponses = {
  'intimacy': 'Intimacy is built through consistent emotional connection before physical connection. Try focusing on quality time and meaningful conversation before initiating physical touch.',
  'rejection': 'Rejection is often not personal. It may be related to stress, fatigue, or other factors. Instead of taking it personally, ask open-ended questions about how your partner is feeling.',
  'communication': 'Clear communication about desires requires vulnerability. Start by sharing your feelings rather than expectations. Use "I feel" statements instead of "You should" statements.',
  'initiate': 'Initiating intimacy is about creating an environment where your partner feels desired but not pressured. Focus on building anticipation throughout the day with small gestures of affection.',
  'default': 'I don\'t have specific guidance on that topic yet. Try asking about intimacy, rejection, communication, or how to initiate.'
};

// Common questions for quick access
const commonQuestions = [
  'How do I build more intimacy?',
  'How should I handle rejection?',
  'How can I communicate my desires?',
  'How do I initiate without pressure?'
];

const CoachScreen = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<{type: 'user' | 'coach', text: string}[]>([
    {type: 'coach', text: 'Hello! I\'m your Magnet Coach. I can answer questions about improving intimacy in your relationship. What would you like to know?'}
  ]);

  const handleSendQuestion = () => {
    if (question.trim().length === 0) return;
    
    // Add user question to conversation
    setConversation([...conversation, {type: 'user', text: question}]);
    
    // Generate response based on keywords
    let response = mockResponses.default;
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('intimacy') || lowerQuestion.includes('connect')) {
      response = mockResponses.intimacy;
    } else if (lowerQuestion.includes('reject') || lowerQuestion.includes('turn down')) {
      response = mockResponses.rejection;
    } else if (lowerQuestion.includes('communicat') || lowerQuestion.includes('talk') || lowerQuestion.includes('tell')) {
      response = mockResponses.communication;
    } else if (lowerQuestion.includes('initiate') || lowerQuestion.includes('start')) {
      response = mockResponses.initiate;
    }
    
    // Add coach response after a short delay to simulate thinking
    setTimeout(() => {
      setConversation(prev => [...prev, {type: 'coach', text: response}]);
    }, 500);
    
    setQuestion('');
  };

  const handleQuickQuestion = (quickQuestion: string) => {
    setQuestion(quickQuestion);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.title}>AI Coach</Text>
        <Text variant="body" color={COLORS.textSecondary}>
          Get guidance for your relationship journey
        </Text>
      </View>

      <View style={styles.conversationContainer}>
        <ScrollView 
          contentContainerStyle={styles.conversationScroll}
          ref={ref => { this.scrollView = ref; }}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
        >
          {conversation.map((message, index) => (
            <View 
              key={index} 
              style={[
                styles.messageBubble,
                message.type === 'user' ? styles.userBubble : styles.coachBubble
              ]}
            >
              <Text 
                variant="body" 
                color={message.type === 'user' ? COLORS.text : COLORS.text}
              >
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <Card style={styles.quickQuestionsCard}>
        <Text variant="caption" color={COLORS.textSecondary} style={styles.quickQuestionsTitle}>
          COMMON QUESTIONS
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.quickQuestionsContainer}>
            {commonQuestions.map((q, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.quickQuestionButton}
                onPress={() => handleQuickQuestion(q)}
              >
                <Text variant="caption" color={COLORS.primary}>
                  {q}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Card>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Ask a question..."
          value={question}
          onChangeText={setQuestion}
          style={styles.input}
          icon="send"
          onIconPress={handleSendQuestion}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.spacing.l,
    marginBottom: SIZES.spacing.m,
  },
  title: {
    marginBottom: SIZES.spacing.xs,
  },
  conversationContainer: {
    flex: 1,
    paddingHorizontal: SIZES.spacing.l,
  },
  conversationScroll: {
    paddingBottom: SIZES.spacing.l,
  },
  messageBubble: {
    padding: SIZES.spacing.m,
    borderRadius: SIZES.radius.l,
    marginBottom: SIZES.spacing.m,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  coachBubble: {
    backgroundColor: COLORS.card,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  quickQuestionsCard: {
    margin: SIZES.spacing.l,
    padding: SIZES.spacing.m,
  },
  quickQuestionsTitle: {
    marginBottom: SIZES.spacing.s,
  },
  quickQuestionsContainer: {
    flexDirection: 'row',
  },
  quickQuestionButton: {
    backgroundColor: 'rgba(227, 38, 54, 0.1)',
    paddingVertical: SIZES.spacing.xs,
    paddingHorizontal: SIZES.spacing.m,
    borderRadius: SIZES.radius.m,
    marginRight: SIZES.spacing.s,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  inputContainer: {
    padding: SIZES.spacing.l,
    paddingTop: 0,
  },
  input: {
    marginBottom: 0,
  },
});

export default CoachScreen;
