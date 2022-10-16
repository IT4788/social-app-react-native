import { useFonts as useExpoFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import AppFonts from '../theme/AppFonts';
export default function useFonts() {
    const [fontsLoaded] = useExpoFonts({
        [AppFonts.FBold]: require('../assets/fonts/Poppins-Bold.ttf'),
        [AppFonts.FMedium]: require('../assets/fonts/Poppins-Medium.ttf'),
        [AppFonts.FRegular]: require('../assets/fonts/Poppins-Regular.ttf'),
        [AppFonts.FSemiBold]: require('../assets/fonts/Poppins-SemiBold.ttf'),
        [AppFonts.FLight]: require('../assets/fonts/Poppins-Light.ttf'),
        [AppFonts.FExtraBold]: require('../assets/fonts/Poppins-ExtraBold.ttf'),
        [AppFonts.FExtraLight]: require('../assets/fonts/Poppins-ExtraLight.ttf'),
        [AppFonts.FThin]: require('../assets/fonts/Poppins-Thin.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    return { fontsLoaded, onLayoutRootView };
}
