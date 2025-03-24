import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import image from '@/constants/image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from './login';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  // Перевірка правильності email
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // Перевірка правильності пароля
  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordPattern.test(password);
  };

  // Функція для реєстрації користувача
  const registerUser = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Помилка', 'Будь ласка, заповніть всі поля');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Помилка', 'Будь ласка, введіть коректну електронну адресу');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Помилка', 'Пароль повинен містити не менше 8 символів, включаючи число та спеціальний символ.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не співпадають');
      return;
    }

    try {
      console.log("Відправка запиту на реєстрацію...");
      const response = await fetch('http://192.168.43.138:8080/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email: email.toLowerCase(), password }),
      });

      // Логування статусу відповіді
      console.log('Статус відповіді:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Текст помилки від сервера:', errorText);
        throw new Error(`Помилка HTTP: ${response.status}, відповідь: ${errorText}`);
      }

      const data = await response.json();  // Читання JSON відповіді
      console.log("Отримані дані:", data);

      // Якщо сервер повертає коректні дані, реєстрація успішна
      if (data.email && data.id) {
        // Збереження токену, якщо він є
        if (data.jwt) {
          await AsyncStorage.setItem('jwt', data.jwt);
        }

        // Автоматичний вхід після реєстрації
        const userData = await loginUser(email, password);
        console.log("Дані користувача після входу:", userData);

        if (userData) {
          Alert.alert('Успішний вхід', `Вітаємо, ${userData.email}!`);
          router.replace('/home'); // Navigate to home
        } else {
          Alert.alert('Помилка', 'Не вдалося увійти після реєстрації');
        }
      } else {
        throw new Error('Некоректні дані в відповіді сервера');
      }
    } catch (error) {
      console.error('Помилка:', error.message);
      Alert.alert('Помилка', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-blue-100">
      <ImageBackground 
        source={image.phonStandart} 
        className="flex-1 bg-cover justify-center items-center" 
        style={{ width: '100%', height: '100%' }}
      >
        <View className='flex-1 justify-center items-center'>
          <View className="items-center mb-10">
            <View className="w-32 h-32 rounded-lg justify-center items-center overflow-hidden">
              <Image 
                source={image.iconplustext} 
                className="w-full h-full object-contain rounded-lg"
              />
            </View>
          </View>
                    
          {step === 1 ? (
            // Перша форма
            <>
              <View className="mb-10">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Ім'я </Text>
                <TextInput 
                  placeholder="Введіть ваше ім'я"
                  value={name}
                  onChangeText={setName}
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400 mx-auto"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
                <Text className="w-[320px] font-ubuntu-italic text-xs text-primary-dark-200 mt-2">Введіть повне ім'я</Text>
              </View>

              <View className="mb-10">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Електронна адреса</Text>
                <TextInput 
                  placeholder="Введіть свою електронну адресу"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400 mx-auto"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
                <Text className="w-[320px] font-ubuntu-italic text-xs text-primary-dark-200 mt-2">Введіть свою електронну адресу</Text>
              </View>

              <TouchableOpacity onPress={() => setStep(2)} className="w-[200px] bg-[#ffffffc6] border border-primary-dark-400 p-4 mt-10 rounded-xl shadow-md">
                <Text className="text-center text-lg font-ubuntu-medium text-primary-dark-100">Далі</Text>
              </TouchableOpacity>

              <View className="mt-6">
                <Text className="text-center text-primary-dark-200 font-ubuntu-medium">
                  Вже є аккаунт?{' '}
                  <Link href="/login" className="text-primary-dark-400">Увійдіть!</Link>
                </Text>
              </View>
            </>
          ) : (
            // Друга форма
            <>
              <View className="mb-8">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Пароль</Text>
                <TextInput 
                  placeholder="Введіть ваш пароль"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400 mx-auto"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
                <Text className="w-[320px] font-ubuntu-italic text-xs text-primary-dark-200 mt-2">Пароль повинен містити не менше 8 символів, включаючи число та спеціальний символ.</Text>
              </View>

              <View className="mb-8">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Підтвердіть пароль</Text>
                <TextInput 
                  placeholder="Підтвердіть ваш пароль"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400 mx-auto"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
                <Text className="w-[320px] font-ubuntu-italic text-xs text-primary-dark-200 mt-2">Паролі повинні співпадати</Text>
              </View>

              <TouchableOpacity onPress={registerUser} className="w-[200px] bg-[#ffffffc6] border border-primary-dark-400 p-4 mt-4 rounded-xl shadow-md">
                <Text className="text-center text-lg font-ubuntu-medium text-primary-dark-100">Підтвердити</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => setStep(1)} className="mt-3">
                <Text className="text-primary-dark-400 font-ubuntu-medium">Назад</Text>
              </TouchableOpacity>
            </>
          )}
          
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Signup;
