import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import image from '@/constants/image';
import LinearGradient from 'react-native-linear-gradient';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Signup = () => {
  const [step, setStep] = useState(1);

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
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400 mx-auto"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
                <Text className="w-[320px] font-ubuntu-italic text-xs text-primary-dark-200 mt-2">Введіть повне ім'я</Text>
              </View>

              <View className="mb-10">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Номер телефону</Text>
                <TextInput 
                  placeholder="Введіть номер телефону"
                  maxLength={10}
                  keyboardType="phone-pad"
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400 mx-auto"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
                <Text className="w-[320px] font-ubuntu-italic text-xs text-primary-dark-200 mt-2">Введіть свій номер телефону</Text>
              </View>

              <View className="mb-10">
                <Text className="text-primary-dark-200 font-ubuntu-medium mb-1">Електронна адреса</Text>
                <TextInput 
                  placeholder="Введіть свою електронну адресу"
                  maxLength={6}  
                  keyboardType="email-address"
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400 mx-auto"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
                <Text className="w-[320px] font-ubuntu-italic text-xs text-primary-dark-200 mt-2">Введіть свою електронну адресу</Text>
              </View>

              <TouchableOpacity onPress={() => setStep(2)} className="w-[200px] bg-[#ffffffc6] border border-primary-dark-400 p-4 mt-10 rounded-xl shadow-md">
                <Text className="text-center text-lg font-ubuntu-medium text-primary-dark-100">Далі</Text>
              </TouchableOpacity>

              {/* Нижній текст з посиланням на сторінку входу */}
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
                  secureTextEntry
                  className="w-[320px] bg-[#ffffffac] p-4 rounded-3xl shadow-sm border border-primary-dark-400 mx-auto"
                  style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
                />
                <Text className="w-[320px] font-ubuntu-italic text-xs text-primary-dark-200 mt-2">Паролі повинні співпадати</Text>
              </View>

              <TouchableOpacity onPress={() => console.log('Signed Up')} className="w-[200px] bg-[#ffffffc6] border border-primary-dark-400 p-4 mt-4 rounded-xl shadow-md">
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