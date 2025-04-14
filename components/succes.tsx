import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import image from '@/constants/image'
import { Link } from 'expo-router'

interface SuccesProps {
  title: string,
  text: string
}

const succes: React.FC<SuccesProps> = ({ title, text}) => {
  return (
    <ImageBackground
      source={image.phonGreenPink}
      className="flex-1"
      resizeMode="cover"
    >
      {/* Напівпрозорий оверлей */}
      <View className="flex-1 bg-white/30">  
        <SafeAreaView className="flex-1 items-center justify-between mx-2 mt-36 mb-32">
          <Text className="w-3/4 text-xl font-ubuntu-bold text-green-900 mb-12 text-center">
          {title}
          </Text>
          <View className="w-60 h-60 rounded-full border-8 border-green-800 flex items-center justify-center">
            <Text className="text-green-700 text-2xl font-ubuntu-medium">{text}</Text>
          </View>
          <Link href="/login" className="mt-16 w-[280px] bg-[#ffffff95] px-6 py-2 border border-green-700 rounded-lg">
            <TouchableOpacity className="w-full flex items-center justify-center">
                <Text className="text-green-700 text-lg font-ubuntu-medium">Oкі</Text>
            </TouchableOpacity>
        </Link>

        </SafeAreaView>
      </View>
    </ImageBackground>
  )
}

export default succes