import { View, Text, Image, ActivityIndicator, ImageBackground, TouchableOpacity, Switch, ScrollView } from 'react-native';
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
const API_BACK = 'http://192.168.43.138:8080/api/user/'

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

        const response = await fetch(`${API_BACK}`, {
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
        <ScrollView
         className=''
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{ paddingBottom: 10 }} 
        >

        <View className='flex-1 m-0'>
          {/* Фото профілю */}
          <View className="flex-row items-center self-center mt-5">
            {/* Фото профілю */}
            <Image
              source={userData.avatar ? { uri: userData.avatar } : DEFAULT_AVATAR}
              className="w-36 h-36 rounded-full border-2 border-primary-dark-200"
            />
            
            {/* Ім'я та email справа */}
            <View className="ml-4">
              <Text className="text-xl font-ubuntu-regular text-primary-dark-100">{userData.name}</Text>
              <Text className="text-lg font-ubuntu-regular text-primary-dark-200">{userData.email}</Text>
            </View>
          </View>

         {/* <View className="mt-[20%] w-full h-[40%]">
            <Link href="/" className="flex-row-reverse justify-between items-center py-3 border-b border-blue-900">
              <Text className="text-lg text-primary-dark-200">Change password</Text>
              <Image source={icon.account} className="w-5 h-5" />
            </Link>

            <TouchableOpacity onPress={handleLogout} className="flex-row justify-between items-center py-3 border-b border-blue-900">
              <Text className="text-lg text-primary-dark-200">Log out</Text>
              <Image source={icon.account} className="w-5 h-5" />
            </TouchableOpacity>

            <Link href="/" className="flex-row justify-between items-center py-3 border-b border-blue-900">
              <Text className="text-lg text-primary-dark-200">Delete account</Text>
              <Image source={icon.account} className="w-5 h-5" />
            </Link>          

            <Link href="/" className="flex-row justify-between items-center py-3 border-b border-blue-900">
              <Text className="text-lg text-primary-dark-200">Update the app</Text>
              <Text className="text-lg text-gray-500">1.0.0.v</Text>
            </Link>

            <Link href="/" className="py-3">
              <Text className="text-lg text-primary-dark-200">Community support</Text>
            </Link>
          </View> */}

         
          <View className="w-full h-6 mt-[180%] mb-0 flex-row justify-center items-center">
            <Link href="/(root)/test/tests" className="text-primary-dark-200 text-sm mx-2">FAQ</Link>
            <Text className="text-gray-700 text-sm">|</Text>
            <Link href="/(root)/(resultsSerch)/search" className="text-primary-dark-200 text-sm mx-2">Support</Link>
          </View>

        </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Account;
