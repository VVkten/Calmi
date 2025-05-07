// screens/MyInfo.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  API_BASE_URL from '@/settings';
import image from '@/constants/image';

export default function MyInfo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (!token) throw new Error('Токен не знайдено');

        const response = await fetch(`${API_BASE_URL}user/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Не вдалося отримати дані користувача');

        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error(error);
        Alert.alert('Помилка', 'Не вдалося завантажити дані');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) throw new Error('Токен не знайдено');

      const response = await fetch(`${API_BASE_URL}user/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) throw new Error('Не вдалося оновити дані');

      Alert.alert('Успіх', 'Дані оновлено');
    } catch (error) {
      console.error(error);
      Alert.alert('Помилка', 'Не вдалося оновити дані');
    }
  };

  if (loading) return <Text className="text-center mt-5">Завантаження...</Text>;

  return (
     <SafeAreaView className="flex-1">
      <ImageBackground
           source={image.phonBlueW}
           className="flex-1 w-full h-full p-2"
           resizeMode="cover">
        <ScrollView showsVerticalScrollIndicator={false}>
             
        <View className="p-2 items-center mt-10">
          <Text className="text-2xl font-bold text-center text-blue-900 mb-4">Зміна інформації</Text>

          <Text className="text-lg mb-1 ml-[-70%]">Ім’я</Text>
          <TextInput
            className="bg-blue-50 items-center border h-14 border-blue-950 w-[80%] rounded px-3 py-2 mb-4"
            value={name}
            onChangeText={setName}
            placeholder="Введіть ім’я"
          />

          <Text className="text-lg mb-1 ml-[-68%]">Email</Text>
          <TextInput
            className="bg-blue-50 border h-14 border-blue-950 w-[80%] rounded px-3 py-2 mb-4"
            value={email}
            onChangeText={setEmail}
            placeholder="Введіть email"
            keyboardType="email-address"
          />

          <TouchableOpacity 
            onPress={handleSave} 
            className="w-[200px] bg-[#ffffffc6] border border-blue-900 p-4 mt-4 rounded-xl"
          >
            <Text className="text-center text-lg font-ubuntu-medium text-blue-900">Надіслати код</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  </ImageBackground>
</SafeAreaView>

  );
}
