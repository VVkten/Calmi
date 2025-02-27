import { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (token) {
          setIsAuthenticated(true);  // Якщо токен є, користувач зареєстрований
          console.log('Так, користувач зареєстрований!');
        } else {
          setIsAuthenticated(false); // Якщо токен відсутній, користувач не зареєстрований
          console.log('Ні, користувач не зареєстрований!');
        }
      } catch (error) {
        console.error('Error checking authentication status', error);
        setIsAuthenticated(false); // Якщо сталася помилка, припускаємо, що користувач не зареєстрований
        console.log('Ні, користувач не зареєстрований!');
      }
    };

    checkAuth();
  }, []);

  // Якщо стан не визначений (відбувається перевірка), не рендеримо нічого
  if (isAuthenticated === null) {
    return null;  // Можна показати лоадер або нічого не рендерити
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Тут можна зробити рендер іншого контенту, якщо потрібно */}
    </Stack>
  );
}
