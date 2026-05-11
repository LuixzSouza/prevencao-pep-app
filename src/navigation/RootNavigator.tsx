import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';

// Screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PreAssessmentScreen from '../screens/PreAssessmentScreen';
import PreResultScreen from '../screens/PreResultScreen';
import PostAssessmentScreen from '../screens/PostAssessmentScreen';
import PostResultScreen from '../screens/PostResultScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.ink,
          headerTitleStyle: {
            fontFamily: typography.fontFamily.uiBold,
            fontSize: typography.fontSize.lg,
          },
          headerShadowVisible: true,
          contentStyle: {
            backgroundColor: colors.bg,
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Entrar',
            headerBackTitle: 'Voltar',
          }}
        />

        <Stack.Screen
          name="PreAssessment"
          component={PreAssessmentScreen}
          options={{
            title: 'Avaliação Pré-CPRE',
            headerBackTitle: 'Voltar',
          }}
        />

        <Stack.Screen
          name="PreResult"
          component={PreResultScreen}
          options={{
            title: 'Resultado Pré-CPRE',
            headerBackTitle: 'Voltar',
          }}
        />

        <Stack.Screen
          name="PostAssessment"
          component={PostAssessmentScreen}
          options={{
            title: 'Avaliação Pós-CPRE',
            headerBackTitle: 'Voltar',
          }}
        />

        <Stack.Screen
          name="PostResult"
          component={PostResultScreen}
          options={{
            title: 'Resultado Final',
            headerBackTitle: 'Voltar',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};