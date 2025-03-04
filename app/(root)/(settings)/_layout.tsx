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
    </Stack>
  );
}
