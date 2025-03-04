import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Отримуємо токен з пам'яті
        const token = await AsyncStorage.getItem('jwt');

        if (!token) {
          console.log('Токен не знайдено');
          setLoading(false);
          return;
        }

        const response = await fetch('http://192.168.53.138:8000/api/user/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Додаємо токен до заголовка
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Не вдалося отримати дані користувача');
        }

        const data = await response.json();
        setUserData(data); // Збереження отриманих даних
      } catch (error) {
        console.error(error);
        setUserData(null); // В разі помилки можна обробити це
      } finally {
        setLoading(false); // Завершення завантаження
      }
    };

    fetchUserData(); // Викликаємо функцію для завантаження даних
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
        <Text>Завантаження...</Text>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView>
        <Text>Помилка при завантаженні даних</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text>Ім'я користувача: {userData.name}</Text>
      <Text>Email: {userData.email}</Text>
      {/* Виведення інших даних користувача */}
    </SafeAreaView>
  );
};

export default Account;
