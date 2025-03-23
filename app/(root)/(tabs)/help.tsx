import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import image from '@/constants/image'
import { Link } from 'expo-router'
import icon from '@/constants/icon'
import ArticleCard from '@/components/articleCard'
import ExerciseCard from '@/components/exerciseCard'

const help = () => {
  return (
    <SafeAreaView className="flex-1">
    {/* Фонове зображення */}
    <ImageBackground 
      source={image.phonPinkWhiteDot} 
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      
      {/* Основний контент */}
      <ScrollView 
        className="flex-1 p-2 mt-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} // Відступ під TabMenu
      >
         <View className="flex-row justify-between items-center p-4 w-full">
            <View className="w-[120px] h-14">
              <Image 
                source={image.logotextright} 
                className="w-full h-full object-contain rounded-lg"
              />
            </View>
         </View>
        
        <View className='mt-3'>
          <TouchableOpacity onPress={() => { }} className='w-full h-24 mb-2 rounded-xl border border-red-600 shadow-md text-center'>
              <View className='flex flex-row items-center w-full h-full bg-white rounded-lg px-4'>
                  <Image source={icon.phon} className='w-14 h-11 tint-blue-700 mx-3' />
                  <Text className='text-pink-900 text-lg font-bold'>      Гаряча лінія - Підтримка</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} className='w-full h-24 mb-2 rounded-xl border border-red-600 shadow-md text-center'>
              <View className='flex flex-row items-center w-full h-full bg-white rounded-lg px-4'>
                  <Image source={icon.comm} className='w-14 h-12 tint-blue-700 mx-3' />
                  <Text className='text-pink-900 text-lg font-bold'>          Чат Бот - Підтримка</Text>
              </View>
          </TouchableOpacity>
        </View>

        <View>
          <View className="mt-3 mb-1 mx-1">
            <Text className="text-xl font-ubuntu-bold text-pink-900 ml-2">Статті самодопомоги</Text>
            <ArticleCard id={1} link="/(root)/articles/articleDetails" color="#A21F4D" />
            <ArticleCard id={2} link="/(root)/articles/articleDetails" color="#A21F4D"/>
          </View>

          <View>
          <Text className="text-lg font-ubuntu-bold text-pink-900 ml-2">Вправи самодопомоги</Text>
       
          <View className="flex-row justify-between mt-2 m-2">
            <ExerciseCard icon={image.exrAngel} title="Anger" link="/(root)/exercises/exercise" />
            <ExerciseCard icon={image.exrAngel} title="Stress" link="/(root)/exercises/exercise" />
            <ExerciseCard icon={image.exrAngel} title="Relaxation" link="/(root)/exercises/exercise" />
          </View>
        </View>
        </View>
         
      </ScrollView>
    </ImageBackground>
  </SafeAreaView>
  )
}

export default help