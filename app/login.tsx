import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import image from '@/constants/image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('http://192.168.53.138:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.toLowerCase(), password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Помилка HTTP: ${response.status}, відповідь: ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Очікував JSON, але отримав: ${contentType}`);
    }

    const data = await response.json();

    if (data.jwt) {
      await AsyncStorage.setItem('jwt', data.jwt);
      console.log('Token збережено:', data.jwt);
      return { email: email.toLowerCase() };
    } else {
      throw new Error(data.message || 'Помилка авторизації');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Помилка входу:', error.message);
    } else {
      console.error('Невідома помилка');
    }
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Додаємо useRouter

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Помилка', 'Будь ласка, введіть email та пароль');
      return;
    }
  
    try {
      const userData = await loginUser(email, password);
      if (userData) {
        Alert.alert('Успішний вхід', `Вітаємо, ${userData.email}!`);
        router.replace('./(root)/(tabs)/home'); // Переходимо на головну сторінку
      } else {
        Alert.alert('Помилка', 'Невідомий користувач або не вдалося отримати дані');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Помилка', error.message);
      } else {
        Alert.alert('Помилка', 'Невідома помилка');
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-blue-100">
      <ImageBackground 
        source={image.phonStandart} 
        className="flex-1 bg-cover justify-center items-center" 
        style={{ width: '100%', height: '100%' }}
      >
        <View className='flex-1 justify-center items-center' style={{ top: -25 }}>
          {/* Лого */}
          <View className="items-center mb-6">
            <View className="w-40 h-40 rounded-lg justify-center items-center overflow-hidden" style={{ top: -25 }}>
              <Image 
                source={image.iconplustext} 
                className="w-full h-full object-contain rounded-lg"
              />
            </View>
          </View>

          {/* Вхід */}
          <Text className="text-2xl font-ubuntu-medium text-primary-dark-100 mb-4" style={{ top: -10 }}>Вхід</Text>

          {/* Поля вводу */}
          <TextInput 
            placeholder="Електрона пошта"
            value={email}
            onChangeText={setEmail}
            className="font-ubuntu-medium w-[320px] bg-[#ffffff95] p-4 rounded-xl text-primary-dark-400 mb-3 border border-primary-dark-400 mx-auto"
            style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
          />
          <TextInput 
            placeholder="Пароль"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="w-[320px] bg-[#ffffff95] p-4 rounded-xl text-primary-dark-400 mb-2 border border-primary-dark-400 font-ubuntu-medium mx-auto"
            style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
          />

          {/* Забули пароль */}
          <Link href="/forgotpassword" className="text-sm text-primary-dark-200 ml-2 font-ubuntu-medium self-start">Забули пароль?</Link>

          {/* Кнопка входу */}
          <TouchableOpacity 
            onPress={handleLogin}
            className="w-[320px] bg-[#ffffffc6] border border-primary-dark-400 p-4 mt-4 rounded-xl shadow-md"
            style={{ zIndex: 10 }}
          >
            <Text className="text-center text-lg font-ubuntu-medium text-primary-dark-100">Увійти</Text>
          </TouchableOpacity>

          {/* Реєстрація */}
          <Text className="text-sm font-ubuntu-medium text-primary-dark-200 absolute bottom-6"
            style={{ zIndex: 1 }} >
            Не маєте акаунту?{' '}
            <Link href="/signup" className="text-primary-dark-400 font-ubuntu-medium">Зареєструйтесь</Link>
          </Text>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Login;
