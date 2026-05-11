import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';
import { PrimaryButton } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>
            Prevenção de Pancreatite Pós-CPRE
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre esta ferramenta</Text>
          <Text style={styles.description}>
            Este aplicativo auxilia na estratificação de risco para prevenção de pancreatite pós-CPRE (PEP)
            através de avaliações baseadas em evidências científicas.
          </Text>

          <View style={styles.featureList}>
            <Text style={styles.feature}>• Avaliação pré-procedimento</Text>
            <Text style={styles.feature}>• Avaliação intraoperatória</Text>
            <Text style={styles.feature}>• Protocolos de tratamento personalizados</Text>
            <Text style={styles.feature}>• Interface intuitiva e acessível</Text>
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Importante:</Text> Esta ferramenta é destinada
            a profissionais de saúde qualificados. As recomendações devem ser sempre consideradas
            no contexto clínico individual do paciente.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Continuar"
          onPress={() => navigation.navigate('Login')}
        />

        <Text
          style={styles.skipText}
          onPress={() => navigation.navigate('PreAssessment')}
          accessibilityRole="button"
          accessibilityLabel="Pular login e ir direto para avaliação"
        >
          Pular login
        </Text>
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
    paddingTop: spacing['3xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  title: {
    fontSize: typography.fontSize['4xl'],
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.base,
  },
  cardTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginBottom: spacing.base,
  },
  featureList: {
    marginTop: spacing.md,
  },
  feature: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginBottom: spacing.xs,
  },
  disclaimer: {
    backgroundColor: colors.line,
    borderRadius: borderRadius.base,
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  disclaimerText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
    textAlign: 'center',
  },
  disclaimerBold: {
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing['2xl'],
    gap: spacing.base,
  },
  skipText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingVertical: spacing.md,
  },
});

export default WelcomeScreen;