import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/tokens';

interface FieldProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export const Field: React.FC<FieldProps> = ({
  label,
  error,
  required = false,
  style,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.muted}
        {...textInputProps}
      />

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  required: {
    color: colors.alert,
  },
  input: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: borderRadius.base,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    minHeight: 48, // Acessibilidade
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  inputError: {
    borderColor: colors.alert,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.ui,
    color: colors.alert,
    marginTop: spacing.xs,
  },
});