import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';
import { PrimaryButton, Stepper, ResultCard } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'PostResult'>;

const PostResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { answers, result } = route.params;

  const handleNewAssessment = () => {
    navigation.popToTop();
  };

  const getRiskMessage = () => {
    if (result.riskLevel === 'high') {
      return {
        title: 'Fatores de risco identificados',
        message: 'Foram identificados fatores de risco intraoperatórios que requerem tratamento adicional com hidratação.',
        color: colors.alert,
      };
    } else {
      return {
        title: 'Nenhum fator adicional identificado',
        message: 'Não foram identificados fatores de risco adicionais durante o procedimento. Manter apenas o protocolo pré-CPRE.',
        color: colors.safe,
      };
    }
  };

  const riskInfo = getRiskMessage();

  return (
    <View style={styles.container}>
      <Stepper
        currentStep={4}
        totalSteps={4}
        labels={['Pré-CPRE', 'Resultado Pré', 'Pós-CPRE', 'Resultado Final']}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResultCard
          riskLevel={result.riskLevel}
          treatment={result.treatment}
          title="Protocolo Final de Tratamento"
        />

        <View style={[styles.summaryCard, { borderLeftColor: riskInfo.color }]}>
          <Text style={styles.summaryTitle}>{riskInfo.title}</Text>
          <Text style={styles.summaryText}>{riskInfo.message}</Text>
        </View>

        <View style={styles.completedCard}>
          <Text style={styles.completedTitle}>Avaliação completa</Text>
          <Text style={styles.completedText}>
            A estratificação de risco foi finalizada. O protocolo de tratamento
            acima deve ser seguido conforme as diretrizes clínicas.
          </Text>

          <View style={styles.reminderBox}>
            <Text style={styles.reminderTitle}>Lembrete importante:</Text>
            <Text style={styles.reminderText}>
              • Monitorar sinais de pancreatite pós-CPRE nas primeiras 24h
            </Text>
            <Text style={styles.reminderText}>
              • Atentar para dor abdominal, náuseas, vômitos ou elevação de enzimas
            </Text>
            <Text style={styles.reminderText}>
              • Seguir protocolos institucionais de acompanhamento pós-procedimento
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Nova Avaliação"
          onPress={handleNewAssessment}
          variant="primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    ...shadows.base,
  },
  summaryTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  summaryText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  completedCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    ...shadows.base,
  },
  completedTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  completedText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing.base,
  },
  reminderBox: {
    backgroundColor: colors.bg,
    borderRadius: borderRadius.base,
    padding: spacing.base,
    marginTop: spacing.md,
  },
  reminderTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  reminderText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    marginBottom: spacing.xs,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
});

export default PostResultScreen;