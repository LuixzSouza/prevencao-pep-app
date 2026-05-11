import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';

interface YesNoCardProps {
  question: string;
  value?: boolean;
  onValueChange: (value: boolean) => void;
  footnoteRef?: string;
}

export const YesNoCard: React.FC<YesNoCardProps> = ({
  question,
  value,
  onValueChange,
  footnoteRef,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {question}
        {footnoteRef && <Text style={styles.footnoteRef}> {footnoteRef}</Text>}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            value === true && styles.buttonSelectedYes,
          ]}
          onPress={() => onValueChange(true)}
          accessibilityRole="button"
          accessibilityLabel={`Responder sim para: ${question}`}
        >
          <Text
            style={[
              styles.buttonText,
              value === true && styles.buttonTextSelectedYes,
            ]}
          >
            Sim
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            value === false && styles.buttonSelectedNo,
          ]}
          onPress={() => onValueChange(false)}
          accessibilityRole="button"
          accessibilityLabel={`Responder não para: ${question}`}
        >
          <Text
            style={[
              styles.buttonText,
              value === false && styles.buttonTextSelectedNo,
            ]}
          >
            Não
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.base,
  },
  question: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing.md,
  },
  footnoteRef: {
    color: colors.primary,
    fontFamily: typography.fontFamily.uiBold,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    backgroundColor: colors.bg,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.line,
    minHeight: 44, // Acessibilidade
  },
  buttonSelectedYes: {
    backgroundColor: colors.safe,
    borderColor: colors.safe,
  },
  buttonSelectedNo: {
    backgroundColor: colors.alert,
    borderColor: colors.alert,
  },
  buttonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink2,
  },
  buttonTextSelectedYes: {
    color: colors.surface,
  },
  buttonTextSelectedNo: {
    color: colors.surface,
  },
});