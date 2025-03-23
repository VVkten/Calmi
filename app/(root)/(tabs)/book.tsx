import { View, Text, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import image from '@/constants/image'
import icon from '@/constants/icon'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from "../../../components/header";
import ExerciseCard from "../../../components/exerciseCard";
import ArticleCard from "../../../components/articleCard";
import TestLink from '@/components/testLink'

const book = () => {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground 
        source={image.phonPeach3} 
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

          {/* <Header/> */}

        <ScrollView 
          className="flex-1 p-2 mt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }} 
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

          <View className="mt-3 mb-1 mx-3">
            <Link href="/(root)/articles/articlesAll" className="text-xl font-ubuntu-bold text-green-800 ml-2">Тести</Link>
            <TestLink link='/(root)/test/tests' test_id={1} />
            <TestLink link='/(root)/test/tests' test_id={2} />
          </View>

          {/* Популярні статті */}
          <View className="mt-3 mb-1 mx-3">
            <Link href="/(root)/articles/articlesAll" className="text-xl font-ubuntu-bold text-green-800 ml-2">Популярні статті</Link>
            <ArticleCard id={1} link="/(root)/articles/articleDetails" color="#166534" />
            <ArticleCard id={2} link="/(root)/articles/articleDetails" color="#166534"/>
          </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default book