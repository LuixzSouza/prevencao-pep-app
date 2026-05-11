import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/tokens';
import { footnotes } from '../logic/riskEngine';

interface FootnoteCardProps {
  references: string[];
}

export const FootnoteCard: React.FC<FootnoteCardProps> = ({ references }) => {
  if (references.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas:</Text>
      {references.map((ref) => {
        const note = footnotes[ref as keyof typeof footnotes];
        return (
          <Text key={ref} style={styles.note}>
            <Text style={styles.reference}>{ref}</Text> {note}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    borderRadius: borderRadius.base,
    padding: spacing.md,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  title: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  note: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    marginBottom: spacing.xs,
  },
  reference: {
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary,
  },
});