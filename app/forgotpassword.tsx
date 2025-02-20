import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import image from '@/constants/image';
import { Link } from 'expo-router';

const forgotpassword = () => {
  return (
    <View className="flex-1 justify-center items-center bg-blue-100">
      <ImageBackground 
        source={image.phonGreen} 
        className="flex-1 bg-cover justify-center items-center" 
        style={{ width: '100%', height: '100%' }}
      >
        <Text className="text-2xl font-ubuntu-medium text-green-900 mb-4"  style={{ top: -30 }}>Відновлення паролю</Text>
    

        <View className="mb-10">
          <Text className="text-green-900 font-ubuntu-medium mb-1">Новий пароль</Text>
            <TextInput 
              placeholder="Enter your password"
              secureTextEntry
              className="w-[320px] bg-[#ffffff95] p-4 rounded-3xl shadow-sm border border-green-700 mx-auto"
              style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}/>
          <Text className="w-[320px] font-ubuntu-italic text-xs text-green-800 mt-2">Пароль повинен містити не менше 8 символів, включаючи число та спеціальний символ.</Text>
        </View>

        <View className="mb-10">
          <Text className="text-green-900 font-ubuntu-medium mb-1">Підтвердіть пароль</Text>
            <TextInput 
              placeholder="Confirm your password"
              secureTextEntry
              className="w-[320px] bg-[#ffffff95] p-4 rounded-3xl shadow-sm border border-green-700 mx-auto"
              style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}/>
          <Text className="w-[320px] font-ubuntu-italic text-xs text-green-800 mt-2">Паролі повинні співпадати</Text>
        </View>

        <TouchableOpacity className="w-[200px] bg-[#ffffffc6] border border-green-600 p-4 mt-4 rounded-xl shadow-md shadow-green-800"
          style={{ zIndex: 10 }}>
          <Text className="text-center text-lg font-ubuntu-medium text-green-900">Увійти</Text>
        </TouchableOpacity>

        <Link href="/login" className='text-green-800 font-ubuntu-medium mt-4 shadow-md shadow-green-500'>Скасувати</Link>

      </ImageBackground>
    </View>
  )
}

export default forgotpassword