import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  error?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  icon?: string;
  onIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  label,
  error,
  style,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  keyboardType = 'default',
  autoCapitalize = 'none',
  icon,
  onIconPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text variant="caption" style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        isFocused && styles.focusedInput,
        error && styles.errorInput
      ]}>
        <TextInput
          style={[
            styles.input,
            inputStyle,
            multiline && styles.multilineInput
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          selectionColor={COLORS.primary}
        />
        
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <Ionicons 
              name={isPasswordVisible ? 'eye-off' : 'eye'} 
              size={24} 
              color={COLORS.textSecondary} 
            />
          </TouchableOpacity>
        )}
        
        {icon && !secureTextEntry && (
          <TouchableOpacity 
            onPress={onIconPress} 
            style={styles.iconContainer}
            disabled={!onIconPress}
          >
            <Ionicons name={icon} size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text variant="caption" color={COLORS.error} style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.spacing.m,
    width: '100%',
  },
  label: {
    marginBottom: SIZES.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    color: COLORS.text,
    paddingVertical: SIZES.spacing.m,
    paddingHorizontal: SIZES.spacing.m,
    fontSize: SIZES.medium,
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  focusedInput: {
    borderColor: COLORS.primary,
  },
  errorInput: {
    borderColor: COLORS.error,
  },
  errorText: {
    marginTop: SIZES.spacing.xs,
  },
  iconContainer: {
    padding: SIZES.spacing.m,
  },
});

export default Input;
