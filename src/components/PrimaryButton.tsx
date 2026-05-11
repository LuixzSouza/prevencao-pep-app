import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'safe' | 'alert';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
}) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.muted;
    switch (variant) {
      case 'safe':
        return colors.safe;
      case 'alert':
        return colors.alert;
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={colors.surface} size="small" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...shadows.base,
  },
  disabled: {
    ...shadows.sm,
  },
  text: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.surface,
    lineHeight: typography.fontSize.base * typography.lineHeight.tight,
  },
});