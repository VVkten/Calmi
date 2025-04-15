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
  function getRandomImage(): string {
          const images = [
            "phonTest1",
            "phonTest2",
            "phonTest3",
            "phonTest4",
            "phonTest5",
          ];
          const randomIndex = Math.floor(Math.random() * images.length);
          return images[randomIndex];
        }
      
        const randomPhon = getRandomImage();
  return (
    <Link href={link} asChild>
      <TouchableOpacity onPress={() => { }} className='w-32 h-36 mb-2 m-1 border rounded-lg' style={{ borderColor: color }}>
        {/* Перевіряємо чи є зображення */}
        <ImageBackground
          source={image?.uri ? { uri: image.uri } : images[randomPhon]} // Якщо зображення є, використовуємо його, інакше фон-заповнювач
          className='w-full h-full '
        >
          <View className='flex justify-center items- p-1 w-full h-full bg-white/25 rounded-md'>
            <Text className='text-amber-700 text-base font-ubuntu-bold'>{title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  )
}

export default TestLink
