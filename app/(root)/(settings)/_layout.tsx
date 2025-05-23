import { Stack } from "expo-router";
import { View } from "react-native";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white', // Білий фон заголовка
        },
        headerTitleAlign: 'center', // Центрування заголовка
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#1e3a8a', // Темно-синій колір заголовка
        },
        headerTintColor: '#1e3a8a', // Колір іконок
      }}
    >
      <Stack.Screen name="account" options={{ title: "Профіль" }} />
      <Stack.Screen name="notification" options={{ title: "Сповіщення" }} />
      <Stack.Screen name="dellacc" options={{ title: "Видалити аккаунт" }} />
      <Stack.Screen name="faq" options={{ title: "Питання та відповіді" }} />
      <Stack.Screen name="support" options={{ title: "Правила використання" }} />
      <Stack.Screen name="myinf" options={{ title: "Моя інформація" }} />
      <Stack.Screen name="savedArticles" options={{ title: "Збережені статті" }} />
      <Stack.Screen name="savedExercises" options={{ title: "Збережені вправи" }} />
      <Stack.Screen name="savedTests" options={{ title: "Збережені тести" }} />
      
    </Stack>
  );
}
