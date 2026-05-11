import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';
import { PrimaryButton, Stepper, ResultCard } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'PreResult'>;

const PreResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { answers, result } = route.params;

  const handleNext = () => {
    if (result.shouldProceedToPost) {
      // Baixo risco pré -> avalia fatores pós-CPRE
      navigation.navigate('PostAssessment');
    } else {
      // Alto risco pré -> resultado final (não precisa avaliar pós)
      // Navega para tela inicial ou mostra opção de nova avaliação
      navigation.popToTop();
    }
  };

  const handleNewAssessment = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Stepper
        currentStep={2}
        totalSteps={result.shouldProceedToPost ? 4 : 2}
        labels={
          result.shouldProceedToPost
            ? ['Pré-CPRE', 'Resultado Pré', 'Pós-CPRE', 'Resultado Final']
            : ['Pré-CPRE', 'Resultado Final']
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResultCard
          riskLevel={result.riskLevel}
          treatment={result.treatment}
          title="Resultado da Avaliação Pré-CPRE"
        />

        {result.shouldProceedToPost && (
          <View style={styles.nextStepCard}>
            <Text style={styles.nextStepTitle}>Próximo passo</Text>
            <Text style={styles.nextStepText}>
              Como o risco pré-CPRE é baixo, será necessário avaliar os fatores
              de risco intraoperatórios após o procedimento.
            </Text>
          </View>
        )}

        {!result.shouldProceedToPost && (
          <View style={styles.finalCard}>
            <Text style={styles.finalTitle}>Avaliação completa</Text>
            <Text style={styles.finalText}>
              Como o risco pré-CPRE é alto, o protocolo de tratamento já está
              definido. Não é necessário avaliar fatores pós-CPRE adicionais.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {result.shouldProceedToPost ? (
          <PrimaryButton
            title="Continuar para Avaliação Pós-CPRE"
            onPress={handleNext}
            variant="primary"
          />
        ) : (
          <View style={styles.finalButtons}>
            <PrimaryButton
              title="Nova Avaliação"
              onPress={handleNewAssessment}
              variant="primary"
            />
          </View>
        )}
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
  nextStepCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  nextStepTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  nextStepText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  finalCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.safe,
  },
  finalTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  finalText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  finalButtons: {
    gap: spacing.md,
  },
});

export default PreResultScreen;