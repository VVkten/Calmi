import { View, Text, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import image from '@/constants/image'
import ExerciseCard from '@/components/exerciseCard'
import Header from '@/components/header'
import { Link, router } from 'expo-router'
import icon from '@/constants/icon'
import ExerciseLong from '@/components/exclinklong'

const exercise = () => {
  return (
    <SafeAreaView className="flex-1">
      {/* Фонове зображення */}
      <ImageBackground 
        source={image.phonGreen} 
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
       <View className="flex-row justify-between items-center p-4 w-full">
                   <View className="w-[120px] h-14">
                     <Image 
                       source={image.logotextGreen} 
                       className="w-full h-full object-contain rounded-lg"
                     />
                   </View>
               </View>

      {/* Основний контент */}
      <ScrollView 
        className="flex-1 p-2 mt-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} // Відступ під TabMenu
      >
         <View className="flex-row items-center bg-gray-100 border border-green-800 rounded-xl p-2 mx-4 h-16">
            <TextInput
              className="flex-1 text-lg p-2 text-green-700 font-ubuntu-medium"
              placeholder="Search..."
              // value={query}
              // onChangeText={setQuery}
              returnKeyType="search"
              // onSubmitEditing={handleSearch} // Виконання пошуку при натисканні Enter
            />
            <Link href={"/(root)/articles/articleDetails"}>
              <TouchableOpacity
                className="w-14 h-14 rounded-xl flex items-center justify-center mr-2"
                  onPress={ () => router.push("/articles/articleDetails")} // Виконання пошуку при натисканні кнопки 
              >
                <Image 
                source={icon.search} 
                tintColor={"#166534"} 
                className="w-8 h-8" />
              </TouchableOpacity>
            </Link>
          </View>

        <View>
          <Text className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">Популярні вправи</Text>
       
          <View className="flex-row justify-between mt-2 m-2">
            <ExerciseCard icon={image.exrAngel} title="Anger" link="/(root)/exercises/exercise" />
            <ExerciseCard icon={image.exrAngel} title="Stress" link="/(root)/exercises/exercise" />
            <ExerciseCard icon={image.exrAngel} title="Relaxation" link="/(root)/exercises/exercise" />
          </View>
        </View>

        <View className='mt-3 mb-1 mx-3'>
        <Text className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">Рекомендовані</Text>

          <View className='justify-between mt-2'>
            <ExerciseLong exercise_id={1} link='/(root)/exercises/exercise'/>
            <ExerciseLong exercise_id={2} link='/(root)/exercises/exercise'/>
            <ExerciseLong exercise_id={3} link='/(root)/exercises/exercise'/>
          </View>
        </View>
         
        <View className='mt-3 mb-1'>
        <Text className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">Категорії вправ</Text>

          <View className='flex-row justify-between mt-2 m-2'>
            <ExerciseCard icon={image.exrAngel} title="Anger" link="/(root)/exercises/exercise" />
            <ExerciseCard icon={image.exrAngel} title="Stress" link="/(root)/exercises/exercise" />
            <ExerciseCard icon={image.exrAngel} title="Relaxation" link="/(root)/exercises/exercise" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  </SafeAreaView>
  )
}

export default exercise