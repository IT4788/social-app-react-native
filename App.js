import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthProvider from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ThemeProvider } from 'react-native-paper';

import AppRoutes from './navigation';
import useFonts from './hooks/useFonts';
import theme from './theme/theme';

const queryClient = new QueryClient();

export default function App() {
    const { fontsLoaded, onLayoutRootView } = useFonts();

    if (!fontsLoaded) return null;

    return (
        <ThemeProvider theme={theme}>
            <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <AppRoutes />
                    </AuthProvider>
                </QueryClientProvider>
            </SafeAreaView>
        </ThemeProvider>
    );
}
