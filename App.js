import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ThemeProvider } from 'react-native-paper';

import AppRoutes from './navigation';
import useFonts from './hooks/useFonts';
import theme from './theme/theme';
import { StatusBar } from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  const { fontsLoaded, onLayoutRootView } = useFonts();
  console.log('Hello');

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <StatusBar backgroundColor="#06bcee" />
              <AppRoutes />
            </AuthProvider>
          </QueryClientProvider>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
