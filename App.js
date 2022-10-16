import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthProvider from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from './navigation';
import useFonts from './hooks/useFonts';

const queryClient = new QueryClient();

export default function App() {
    const { fontsLoaded, onLayoutRootView } = useFonts();

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#ffffff' }}
            onLayout={onLayoutRootView}
        >
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </QueryClientProvider>
        </SafeAreaView>
    );
}
