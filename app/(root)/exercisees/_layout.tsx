import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{
    // headerTransparent: true, // робить фон прозорим
        headerStyle: {
          backgroundColor: "white", // або можна не вказувати
        },
    headerTitleAlign: 'left',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#14532d',
    },
    headerTintColor: '#14532d',
  }}/>;
}