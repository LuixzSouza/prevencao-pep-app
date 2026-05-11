import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Prevenção de{'\n'}Pancreatite Pós-CPRE</Text>

        <Text style={styles.subtitle}>
          Ferramenta de estratificação de risco{'\n'}
          para prevenção de PEP
        </Text>

        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      </View>

      <Text style={styles.footer}>
        Versão 1.0.0
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: 'space-between',
    paddingVertical: spacing['5xl'],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.ink,
    textAlign: 'center',
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing['4xl'],
  },
  loader: {
    marginTop: spacing.xl,
  },
  footer: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.mono,
    color: colors.muted,
    textAlign: 'center',
  },
});

export default SplashScreen;