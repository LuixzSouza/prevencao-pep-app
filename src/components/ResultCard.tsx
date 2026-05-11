import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';
import { getRiskLevelColor, getRiskLevelText } from '../logic/riskEngine';
import { PreRiskLevel, PostRiskLevel } from '../logic/types';

interface ResultCardProps {
  riskLevel: PreRiskLevel | PostRiskLevel;
  treatment: string[];
  title?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  riskLevel,
  treatment,
  title = 'Resultado da Avaliação',
}) => {
  const riskColor = getRiskLevelColor(riskLevel);
  const riskText = getRiskLevelText(riskLevel);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={[styles.riskBadge, { backgroundColor: riskColor }]}>
        <Text style={styles.riskText}>{riskText}</Text>
      </View>

      <Text style={styles.treatmentTitle}>Conduta:</Text>

      <View style={styles.treatmentList}>
        {treatment.map((item, index) => (
          <View key={index} style={styles.treatmentItem}>
            <View style={styles.bullet} />
            <Text style={styles.treatmentText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.base,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: spacing.base,
  },
  riskBadge: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.base,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  riskText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.surface,
    textAlign: 'center',
  },
  treatmentTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  treatmentList: {
    gap: spacing.sm,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 6, // Alinha com a primeira linha do texto
  },
  treatmentText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
});