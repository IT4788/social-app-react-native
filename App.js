import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthProvider from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from './navigation';

const queryClient = new QueryClient();

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </QueryClientProvider>
        </SafeAreaView>
    );
}
