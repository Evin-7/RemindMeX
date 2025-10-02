import { Stack } from "expo-router";
import {
  ThemeProvider as NavigationThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_400Regular_Italic,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold_Italic,
} from "@expo-google-fonts/poppins";

function RootLayoutNav() {
  const { effectiveTheme } = useTheme();

  return (
    <NavigationThemeProvider
      value={effectiveTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style={effectiveTheme === "dark" ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_400Regular_Italic,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
