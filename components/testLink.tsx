import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import images from '@/constants/image'
import { Link } from 'expo-router';

interface TestProps {
  link: string;
  title: string;
  image: { uri: string } | null;
  color: string;
}

const TestLink: React.FC<TestProps> = ({ title, image, link, color }) => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity onPress={() => { }} className='w-full h-24 mb-2 border rounded-lg' style={{ borderColor: color }}>
        {/* Перевіряємо чи є зображення */}
        <ImageBackground
          source={image?.uri ? { uri: image.uri } : images.phonOrngYel} // Якщо зображення є, використовуємо його, інакше фон-заповнювач
          className='w-full h-full '
        >
          <View className='flex justify-center items-center w-full h-full bg-white/25 rounded-md'>
            <Text className='text-amber-700 text-lg font-ubuntu-bold'>{title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  )
}

export default TestLink
