import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import image from "@/constants/image";
import API_BASE_URL from '@/settings';

const DeleteAccount = () => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('jwt');
      if (storedToken) setToken(storedToken);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (step === 3 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === 3 && countdown === 0) {
      deleteAccount();
    }
  }, [step, countdown]);

  const checkPasswordAndProceed = async () => {
    if (!password) return Alert.alert('Помилка', 'Введіть пароль');

    try {
      const response = await fetch(`${API_BASE_URL}user/verify-password/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Пароль неправильний');
      }

      setStep(2);
    } catch (error) {
      Alert.alert('Помилка', 'Неправильний пароль або сесія недійсна');
    }
  };

  const confirmDelete = () => {
    if (!reason) return Alert.alert('Виберіть причину');
    setStep(3);
  };

  const deleteAccount = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}user/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (res.status === 204) {
        await AsyncStorage.removeItem('jwt');
        router.replace('/hello');
      } else {
        // Якщо статус не 204 — можливо, є помилка
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Помилка при видаленні акаунту');
      }
    } catch (err) {
      Alert.alert('Помилка', err.message || 'Щось пішло не так');
    }
  };
  

  const stopDeletion = () => {
    setStep(1);
    setPassword('');
    setReason('');
    setCountdown(10);
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={image.phonGreenD} className="flex-1 w-full h-full items-center justify-center px-6" resizeMode="cover">
        {step === 1 && (
          <View className="w-full items-center">
            <Text className='text-2xl mt-[-10%] font-ubuntu-medium text-green-900 text-center mb-6'>Ви впевнені, що хочете видалити акаунт?</Text>
          <View className="w-full items-center mt-[20%]">
            <Text className="text-sm font-ubuntu-italic- text-green-900 text-center mb-4">Якщо так, введіть свій пароль для підтвердження</Text>
            <TextInput
              placeholder="Пароль"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              className="bg-white w-full p-3 font-ubuntu-medium rounded-lg mb-4 border border-green-900"
              placeholderTextColor="#999"
            />
            <View className="flex-row w-full mt-3 justify-around">
              <TouchableOpacity className="bg-gray-50 mx-6 px-6 py-2 rounded-xl border border-green-900" onPress={() => router.back()}>
                <Text className="text-green-900 text-2xl font-ubuntu-medium">Ні</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-50 mx-6 px-6 py-2 rounded-xl border border-green-900" onPress={checkPasswordAndProceed}>
                <Text className="text-green-900 text-2xl font-ubuntu-medium">Так</Text>
              </TouchableOpacity>
            </View>
          </View> 
          </View>
        )}

        {step === 2 && (
         <View className="w-full items-start">
         <Text className="text-2xl font-semibold text-green-900 text-center mb-6 w-full">
           Чому ви видаляєте акаунт?
         </Text>
       
         {['У мене кілька акаунтів', 'Неактуально', 'Я не потребую додатку', 'Інше'].map((item) => (
           <TouchableOpacity
             key={item}
             className="flex-row items-center mx-4 mb-4"
             onPress={() => setReason(item)}
           >
             {/* Радіо-кнопка */}
             <View className="w-6 h-6 rounded-full border-2 border-green-900 items-center justify-center mr-3">
               {reason === item && <View className="w-3 h-3 rounded-full bg-green-900" />}
             </View>
       
             {/* Текст */}
             <Text className="text-green-900 text-base">{item}</Text>
           </TouchableOpacity>
         ))}
       
         <TouchableOpacity
           className="bg-white px-6 py-2 rounded-xl self-center mt-4 border border-green-900"
           onPress={confirmDelete}
         >
           <Text className="text-green-900 text-lg font-ubuntu-medium">Готово</Text>
         </TouchableOpacity>
       </View>
       
        )}

        {step === 3 && (
          <View className="items-center">
            <Text className="text-green-900 font-ubuntu-medium text-2xl text-center mb-20">Акаунт буде видалено через</Text>
            <Text className="text-6xl text-green-900 font-bold mb-14">{countdown}</Text>
            <TouchableOpacity className="bg-red-50 px-6 py-2 rounded-xl border border-red-900" onPress={stopDeletion}>
              <Text className="text-red-900 text-lg font-medium">Скасувати</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DeleteAccount;
