import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import image from '@/constants/image'
import { Link } from 'expo-router';

interface ExerciseProps {
  image: { uri: string };
  link: string;
  title: string;
}

const ExerciseLink: React.FC<ExerciseProps> = ({ exercise_id, image, link, title }) => {
  return (
     <Link href={link} asChild>
      <TouchableOpacity onPress={() => { }} className='w-full h-24 mb-2 border border-green-700 rounded-lg'>
        <ImageBackground
          source={image} // Ваше зображення
          className='w-full h-full rounded-lg'
        >
          <View className='flex justify-center items-center w-full h-full bg-black/25 rounded-md'>
            <Text className='text-green-100 text-lg font-bold'>{title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  )
}

export default ExerciseLink