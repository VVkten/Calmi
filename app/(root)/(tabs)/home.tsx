import React from "react";
import { View, Text, Image, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "@/constants/image";
import Post from "../../../components/post";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      {/* Фонове зображення */}
      <ImageBackground 
        source={image.phonStandart} 
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        {/* Основний контент */}
        <ScrollView 
          className="flex-1 p-2 mt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }} // Відступ під TabMenu
        >
          {/* Цитата дня */}
          <View className="w-[340px] h-24 bg-[#ffffffac] border border-primary-dark-300 p-4 rounded-lg mx-auto flex items-center justify-center">
            <Text className="text-center text-xl font-ubuntu-regular text-primary-dark-200">
              Цитата дня
            </Text>
          </View>

          {/* Список постів */}
          <View className="mt-4">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
