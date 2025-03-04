import { SplashScreen, Stack, useRouter } from "expo-router";
import "../global.css";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-BoldItalic": require("../assets/fonts/Ubuntu-BoldItalic.ttf"),
    "Ubuntu-Italic": require("../assets/fonts/Ubuntu-Italic.ttf"),
    "Ubuntu-Light": require("../assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-LightItalic": require("../assets/fonts/Ubuntu-LightItalic.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-MediumItalic": require("../assets/fonts/Ubuntu-MediumItalic.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
  });

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        if (token) {
          router.replace("/(root)/(tabs)/home");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Помилка при отриманні токена:", error);
        router.replace("/login");
      } finally {
        setIsAuthChecked(true);
      }
    };

    if (fontsLoaded && !isAuthChecked) {
      SplashScreen.hideAsync();
      checkAuth();
    }
  }, [fontsLoaded, isAuthChecked]);

  // Поки шрифти не завантажені або не виконана перевірка токена, повертаємо `null`
  if (!fontsLoaded || !isAuthChecked) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}