import { View, Text, Image, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Link, useRouter } from 'expo-router';

interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

const DEFAULT_AVATAR = image.friends;

const Account: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (!token) {
          console.log('Токен не знайдено');
          setLoading(false);
          return;
        }

        const response = await fetch('http://10.5.50.115:8080/api/user/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Не вдалося отримати дані користувача');
        }

        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Видалення токену з AsyncStorage
      await AsyncStorage.removeItem('jwt');
      // Видалення даних користувача з state
      setUserData(null);
      // Перехід на головну сторінку після логауту
      router.replace('/');
      console.log(AsyncStorage.getItem("jwt"))
    } catch (error) {
      console.error('Помилка при виході:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-blue-100">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-lg font-semibold text-gray-700 mt-4">Завантаження...</Text>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-blue-100">
        <Text className="text-lg font-semibold text-red-500">Помилка при завантаженні даних</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground 
        source={image.phonStandart} 
        className="flex-1 w-full h-full items-center p-5"
        resizeMode="cover"
      >
        {/* Фото профілю */}
        <Image
          source={userData.avatar ? { uri: userData.avatar } : DEFAULT_AVATAR}
          className="w-48 h-48 mt-5 rounded-full border-2 border-primary-dark-200"
        />

        {/* Ім'я */}
        <View className='w-full ml-[10%]'>
          <Text className="text-lg font-ubuntu-light mt-4 items-start text-primary-dark-100">Ім'я</Text>
          <View className='bg-white rounded-md w-[90%] text-center p-2 border border-primary-dark-200'>
            <Text className="text-xl font-ubuntu-regular text-primary-dark-100">{userData.name}</Text>
          </View>
        </View>

        {/* Email */}
        <View className='w-full ml-[10%]'>
          <Text className="text-lg font-ubuntu-light mt-4 items-start text-primary-dark-100">Електрона адреса</Text>
          <View className='bg-white rounded-md w-[90%] text-center p-2 border border-primary-dark-200'>
            <Text className="text-xl font-ubuntu-regular text-primary-dark-100">{userData.email}</Text>
          </View>
        </View>

        <View className='mt-8 flex-row w-[90%] justify-between items-center text-center'>
          {/* Кнопка редагування */}
          <Link href="/(root)/(resultsSerch)/search" className="px-4 py-2 bg-white border border-primary-dark-200 rounded-lg text-primary-dark-200 font-ubuntu-medium text-lg w-[45%]">
            Редагувати
          </Link>
          <Link href="/(root)/(resultsSerch)/search">
            <View className="w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center border border-primary-dark-200 mr-8">
              <Image
                source={icon.settings} 
                tintColor="#03528C"
                className="w-8 h-8"
              />
            </View>
          </Link>
        </View>

        {/* Кнопка виходу */}
        <TouchableOpacity onPress={handleLogout} className="px-4 py-2 bg-red-600 border border-primary-dark-200 rounded-lg text-white font-ubuntu-medium text-lg mt-8">
          <Text>Вихід</Text>
        </TouchableOpacity>

        {/* Нижнє меню */}
        <View className="absolute bottom-5 flex-row space-x-4">
          <Link href="/forum" className="text-primary-dark-200 text-sm mr-2">FAQ</Link>
          <Text className="text-gray-700 text-sm">|</Text>
          <Link href="/(root)/(resultsSerch)/search" className="text-primary-dark-200 text-sm ml-2">Support</Link>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Account;
