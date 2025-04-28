import { View, Text, Image, ActivityIndicator, ImageBackground, TouchableOpacity, Switch, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Link, useRouter } from 'expo-router';
import API_BASE_URL from '@/settings';

interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

const DEFAULT_AVATAR = icon.user2;
// const API_BASE_URL = "http://192.168.0.109:8080/api/user";

const Account: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        console.log('Tокен з AsyncStorage:', token);
        if (!token) {
          console.log('Токен не знайдено');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}user/`, {
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
      router.replace('/hello');
      console.log("Token", AsyncStorage.getItem("jwt"))
    } catch (error) {
      console.log('Помилка при виході:', error);
      router.replace('/hello');
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
              tintColor={'#003155'}
              className="w-36 h-36 rounded-3xl"
            />
            
            {/* Ім'я та email справа */}
            <View className="ml-4">
              <Text className="text-xl font-ubuntu-regular text-primary-dark-100">{userData.name}</Text>
              <Text className="text-lg font-ubuntu-regular text-primary-dark-200">{userData.email}</Text>
            </View>
          </View>

          <View className="mt-[5%] w-full">
            <Link 
              href="/" 
              className="font-ubuntu-regular py-3 border-b border-blue-700"
            >
              <Text className="text-lg text-primary-dark-200">Моя інформація</Text>
              <View className='m-0'>
                 <Image source={icon.userC} className="w-8 h-8 ml-40 mb-[-3%]" tintColor='#03528C'/>

              </View>
            </Link>

            <Link 
              href="/forgotpassword" 
              className="flex-row justify-between items-center font-ubuntu-regular py-3 border-b border-blue-700"
            >
              <Text className="text-lg text-primary-dark-200">Змінити пароль</Text>
              <View>
                <Image source={icon.key} className="w-8 h-8 ml-40 mb-[-3%]" tintColor='#03528C'/>
              </View>
            </Link>

            <TouchableOpacity 
              onPress={handleLogout} 
              className="items-center py-3 border-b border-blue-700"
            >
              <Text className="text-lg text-primary-dark-200">Вийти з акаунита</Text>
              <View>
                <Image source={icon.logi} className="w-8 h-8 ml-40 mb-[-3%]" tintColor='#03528C'/>
              </View>
              
            </TouchableOpacity>

            <Link 
              href="/" 
              className="flex-row justify-between items-center py-3 border-b font-ubuntu-regular border-blue-700"
            >
              <Text className="text-lg text-primary-dark-200">Видалити акаунт</Text>
              <View>
                <Image source={icon.deletea} className="w-8 h-8 ml-40 mb-[-3%]" tintColor='#03528C'/>
              </View>
              
            </Link>

            <Link 
              href="/" 
              className="flex-row justify-between items-center py-3 border-b font-ubuntu-regular border-blue-700"
            >
              <Text className="text-lg text-primary-dark-200">Версія додатку</Text>
              <Text className="text-lg text-gray-500">1.0.0.v</Text>
            </Link>

            <Link 
              href="/" 
              className="py-3 border-b border-blue-700"
            >
              <Text className="text-lg text-primary-dark-200 font-ubuntu-regular">Підтримка спільноти</Text>
              <View>
                <Image source={icon.comment}  className="w-8 h-8 ml-36 mb-[-3%]" tintColor='#03528C' />
              </View>
            </Link>
          </View>

            {/* Кнопка для виходу
            <TouchableOpacity
              onPress={handleLogout}
              className="mt-5 py-3 px-6 bg-red-500 rounded-lg flex-row justify-center items-center"
            >
              <Text className="text-white text-lg">Вийти</Text>
            </TouchableOpacity> */}

         
          <View className="w-full h-6 mt-[25%] mb-0 flex-row justify-center items-center">
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
