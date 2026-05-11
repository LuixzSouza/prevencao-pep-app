import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';
import { RootStackParamList, LoginData } from '../logic/types';
import { PrimaryButton, Field } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<LoginData>({
    crc: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!formData.crc.trim()) {
      newErrors.crc = 'CRC é obrigatório';
    } else if (!/^\d{4,6}$/.test(formData.crc.trim())) {
      newErrors.crc = 'CRC deve ter entre 4 e 6 dígitos';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Senha deve ter pelo menos 4 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Login mock - aceita qualquer CRC válido com senha "1234"
      if (formData.password === '1234') {
        const loginInfo = {
          crc: formData.crc,
          loginTime: new Date().toISOString(),
        };

        await AsyncStorage.setItem('userLogin', JSON.stringify(loginInfo));
        navigation.replace('PreAssessment');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas. Use senha "1234" para teste.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Esqueci minha senha',
      'Em um ambiente de produção, aqui seria redirecionado para recuperação de senha.\n\nPara teste, use senha "1234".',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>
            Faça login com suas credenciais profissionais
          </Text>
        </View>

        <View style={styles.form}>
          <Field
            label="CRC"
            placeholder="Digite seu CRC (ex: 12345)"
            value={formData.crc}
            onChangeText={(text) => setFormData(prev => ({ ...prev, crc: text }))}
            error={errors.crc}
            keyboardType="numeric"
            maxLength={6}
            required
            autoComplete="username"
            textContentType="username"
          />

          <Field
            label="Senha"
            placeholder="Digite sua senha"
            value={formData.password}
            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
            error={errors.password}
            secureTextEntry
            required
            autoComplete="current-password"
            textContentType="password"
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
            accessibilityRole="button"
            accessibilityLabel="Esqueci minha senha"
          >
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.testInfo}>
          <Text style={styles.testTitle}>Informações para teste:</Text>
          <Text style={styles.testText}>• CRC: Qualquer número de 4-6 dígitos</Text>
          <Text style={styles.testText}>• Senha: 1234</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />

        <Text
          style={styles.skipText}
          onPress={() => navigation.navigate('PreAssessment')}
          accessibilityRole="button"
          accessibilityLabel="Pular login"
        >
          Continuar sem login
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
    paddingTop: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    textAlign: 'center',
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.base,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
  },
  forgotPasswordText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  testInfo: {
    backgroundColor: colors.line,
    borderRadius: borderRadius.base,
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  testTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  testText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.mono,
    color: colors.ink2,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing['2xl'],
    gap: spacing.base,
  },
  skipText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.muted,
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingVertical: spacing.md,
  },
});

export default LoginScreen;