import React from "react";
import { View, Text, Image, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "@/constants/image";
import Post from "../../../components/post";
import Header from "../../../components/header";
import ExerciseCard from "../../../components/exerciseCard";
import ArticleCard from "../../../components/articleCard";
import { Link } from "expo-router";
import icon from "@/constants/icon";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      {/* Фонове зображення */}
      <ImageBackground 
        source={image.phonStandart} 
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        <Header />

        {/* Основний контент */}
        <ScrollView 
          className="flex-1 p-2 mt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }} // Відступ під TabMenu
        >
          <View>
          
            <Link href="/(root)/exercises/exerciseAll" className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">Популярні вправи</Link>
         
            <View className="flex-row justify-between mt-2 m-2">
              <ExerciseCard icon={image.exrAngel} title="Anger" link="/(root)/exercises/exercise" />
              <ExerciseCard icon={image.exrAngel} title="Stress" link="/(root)/exercises/exercise" />
              <ExerciseCard icon={image.exrAngel} title="Relaxation" link="/(root)/exercises/exercise" />
            </View>
          </View>

          {/* Article of the Day */}
          <View className="mt-3 mb-1 mx-3">
            <Link href="/(root)/articles/articlesAll" className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">Статті дня</Link>
            <ArticleCard id={1} link="/(root)/articles/articleDetails" color="#003155" />
            <ArticleCard id={2} link="/(root)/articles/articleDetails" color="#003155" />
          </View>
          
          {/* Цитата дня */}
          {/* <View className="w-[340px] h-24 bg-[#ffffffac] border border-primary-dark-300 p-4 rounded-lg mx-auto flex items-center justify-center">
            <Text className="text-center text-xl font-ubuntu-regular text-primary-dark-200">
              Цитата дня
            </Text>
          </View> */}

          {/* Список постів */}
          

          <View className="flex-row justify-between items-center p-4 w-full bg-transparent mt-1 mb-0 m-1">
            <Text className="text-xl font-ubuntu-bold text-primary-dark-100">Стрічка постів</Text>
            {/* Іконки справа */}
            <View className="flex-row items-center">
              {/* Сповіщення */}
              <View>
                <Link href="/(root)/(resultsSerch)/search">
                  <View className="w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center border border-primary-dark-200 mr-8">
                    <Image
                      source={icon.search} 
                      className="w-8 h-8"
                    />
                  </View>
                </Link>
              </View>
            </View>
            </View>

            <Post user_id={1} post_id={1} link="/(root)/posts/post"/>
            <Post user_id={2} post_id={2} link="/(root)/posts/postOther"/>
            <Post user_id={3} post_id={3} link="/(root)/posts/postOther"/>
            <Post user_id={4} post_id={4} link="/(root)/posts/postOther"/>
            <Post user_id={5} post_id={5} link="/(root)/posts/postOther"/>
            <Post user_id={6} post_id={6} link="/(root)/posts/postOther"/> 
           
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
