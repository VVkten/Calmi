import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import image from '@/constants/image'

const testLink = () => {
  return (
    <TouchableOpacity onPress={() => { }} className='w-full h-24 mb-2 border border-green-700 rounded-lg'>
      <ImageBackground
        source={image.family} // Ваше зображення
        className='w-full h-full '
      >
        <View className='flex justify-center items-center w-full h-full bg-black/25 rounded-md'>
          <Text className='text-green-100 text-lg font-bold'>Перейти до тесту</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default testLink