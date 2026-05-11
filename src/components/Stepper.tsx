import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/tokens';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps,
  labels,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={index}>
              <View
                style={[
                  styles.step,
                  isActive && styles.stepActive,
                  isCompleted && styles.stepCompleted,
                ]}
              >
                <Text
                  style={[
                    styles.stepText,
                    isActive && styles.stepTextActive,
                    isCompleted && styles.stepTextCompleted,
                  ]}
                >
                  {stepNumber}
                </Text>
              </View>

              {index < totalSteps - 1 && (
                <View
                  style={[
                    styles.connector,
                    isCompleted && styles.connectorCompleted,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {labels && (
        <Text style={styles.label}>
          {labels[currentStep - 1]} ({currentStep}/{totalSteps})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.base,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.line,
  },
  stepActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepCompleted: {
    backgroundColor: colors.safe,
    borderColor: colors.safe,
  },
  connector: {
    width: 24,
    height: 2,
    backgroundColor: colors.line,
  },
  connectorCompleted: {
    backgroundColor: colors.safe,
  },
  stepText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.muted,
  },
  stepTextActive: {
    color: colors.surface,
  },
  stepTextCompleted: {
    color: colors.surface,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    textAlign: 'center',
  },
});