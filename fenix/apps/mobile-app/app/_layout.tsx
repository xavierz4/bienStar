import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { TamaguiProvider, Theme } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import { useEffect } from 'react';
import { seedDatabase } from '../src/lib/seed';

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  // Seed database on first load
  useEffect(() => {
    if (loaded) {
      seedDatabase().catch(console.error);
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Theme name="blue">
        <Slot />
      </Theme>
    </TamaguiProvider>
  );
}
