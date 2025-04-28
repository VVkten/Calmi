import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import image from '@/constants/image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from './login';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '@/settings';


// const API_BASE_URL = "http://192.168.0.109:8080/api/register/";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sex, setsex] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const router = useRouter();

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

  const isValidPassword = (password) =>
    /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  const isValidDOB = (brdate) => {
    const today = new Date();
    const birthDate = new Date(brdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 16;
    }
    return age >= 16;
  };

  const registerUser = async () => {
    const composedBrdate = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

    if (!name || !email || !password || !confirmPassword || !birthYear || !birthMonth || !birthDay || !sex) {
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

    if (!isValidDOB(composedBrdate)) {
      Alert.alert('Помилка', 'Ви повинні бути старше 16 років, щоб зареєструватися.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email: email.toLowerCase(), password, brdate: composedBrdate, sex }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Помилка HTTP: ${response.status}, відповідь: ${errorText}`);
      }

      const data = await response.json();

      if (data.email && data.id) {
        if (data.jwt) {
          await AsyncStorage.setItem('jwt', data.jwt);
        }

        const userData = await loginUser(email, password);
        if (userData) {
          Alert.alert('Успішний вхід', `Вітаємо, ${userData.email}!`);
          router.replace('/');
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
              <Image source={image.iconplustext} className="w-full h-full object-contain rounded-lg" />
            </View>
          </View>

          {step === 1 ? (
            <>
              <View className="mb-10">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Ім'я </Text>
                <TextInput 
                  placeholder="Введіть ваше ім'я"
                  value={name}
                  onChangeText={setName}
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
              </View>

              <View className="mb-10">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Електронна адреса</Text>
                <TextInput 
                  placeholder="Введіть свою електронну адресу"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
              </View>

              {/* Дата народження */}
              <View className="mb-10 w-[320px]">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Дата народження</Text>
                <View className="flex-row justify-between">
                  <TextInput
                    placeholder="MM"
                    keyboardType="numeric"
                    maxLength={2}
                    value={birthMonth}
                    onChangeText={setBirthMonth}
                    className="w-[90px] bg-[#ffffffac] p-4 rounded-xl text-center shadow-sm border border-primary-dark-400"
                  />
                  <TextInput
                    placeholder="DD"
                    keyboardType="numeric"
                    maxLength={2}
                    value={birthDay}
                    onChangeText={setBirthDay}
                    className="w-[90px] bg-[#ffffffac] p-4 rounded-xl text-center shadow-sm border border-primary-dark-400"
                  />
                  <TextInput
                    placeholder="YYYY"
                    keyboardType="numeric"
                    maxLength={4}
                    value={birthYear}
                    onChangeText={setBirthYear}
                    className="w-[110px] bg-[#ffffffac] p-4 rounded-xl text-center shadow-sm border border-primary-dark-400"
                  />
                </View>
                <Text className="font-ubuntu-italic text-xs text-primary-dark-200 mt-2">Формат: ММ / ДД / РРРР</Text>
              </View>

              {/* Вибір статі */}
              <View className="mb-8 flex-row justify-between">
                <TouchableOpacity 
                onPress={() => setsex('Чоловіча')} 
                className={`w-[150px] bg-[#ffffffc6] p-4 rounded-xl border ${sex === 'Чоловіча' ? 'border-primary-dark-200' : 'border-transparent'}`}>
                  <Text className="text-center text-lg  font-ubuntu-medium text-primary-dark-100">Чоловіча</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => setsex('Жіноча')} 
                className={`w-[150px] bg-[#ffffffc6] ml-5 p-4 rounded-xl border ${sex === 'Жіноча' ? 'border-primary-dark-200' : 'border-transparent'}`}>
                  <Text className="text-center text-lg font-ubuntu-medium text-primary-dark-100">Жіноча</Text>
                </TouchableOpacity>
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
            <>
              <View className="mb-8">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Пароль</Text>
                <TextInput 
                  placeholder="Введіть ваш пароль"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
              </View>

              <View className="mb-8">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Підтвердіть пароль</Text>
                <TextInput 
                  placeholder="Підтвердіть ваш пароль"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
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
