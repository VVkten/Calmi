import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, ImageBackground, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Image } from "react-native";
import { Stack } from "expo-router";

export default function TestError() {

  return (
    <>
    <Stack.Screen options={{ title: "Упс" }} />

    <SafeAreaView className="flex-1">
      <ImageBackground source={image.phonOrngRed} className="flex-1 w-full h-full" resizeMode="cover">
        <ScrollView className="flex-1 p-5">
          <View className="bg-white p-4 rounded-xl mb-11 items-center mt-[50%]">
            <Image 
              source={icon.robotDead} 
              className="w-34 h-34 rounded-lg"
              tintColor={'#92400e'}
            />
            <Text className="text-amber-700 text-2xl font-ubuntu-bold mt-2 mb-4">Схоже, ми не встигли це реалізувати. 
              Але ми працюємо над цим!</Text>
          </View>
          
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
    </>
  );
}
