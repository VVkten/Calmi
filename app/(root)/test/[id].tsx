import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Image } from "react-native";
import { Stack } from "expo-router";

const API_BASE_URL = "http://192.168.46.138:8080/api/tests/";

export default function TestDetail() {
  const { id } = useLocalSearchParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTest(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex justify-center items-center h-full" />;
  }

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

  const navigateToTest = () => {
    console.log(`Navigating to test: ${test.id}`);
    router.push(`/test/testRun/${test.id}`);
  };

  return (
    <>
    <Stack.Screen options={{ title: test?.title || "TEST" }} />

    <SafeAreaView className="flex-1">
      <ImageBackground 
        source={image[randomPhon]} // Викликаємо getRandomImage() поза JSX 
        className="flex-1 w-full h-full" resizeMode="cover">
        <ScrollView className="flex-1 p-5">
          <View className="p-4 mb-10 mx-0 mt-[25%]">

            {/* <View className="items-end mt-4 mx-0">
              <Image source={icon.share} className="w-10 h-10" tintColor="#14532d"/>
              <Image source={icon.report} className="w-10 h-10" tintColor="#14532d" />
            </View> */}

            <View>
              <Text className="text-2xl font-ubuntu-bold text-orange-800">{test.title}</Text>
              <View className="flex-row items-center mt-3">
                <Text className="text-lg text-orange-800 font-ubuntu-medium">CalMi</Text>
                <Image source={icon.tick} className="w-6 h-6 ml-2" />
              </View>
              <Text className="text-sm font-ubuntu-regular mt-3 text-orange-700">{test.description}</Text>
            </View>

            {/* <View className="mt-5 items-center">
              <Image source={{ uri: `http://192.168.43.138:8080${exercise.image}` }} className="w-96 h-96 rounded-xl" />
            </View> */}


            {/* Кнопка для переходу на відео сторінку */}
            <View className="mt-[30%] w-[80%] items-center ml-[10%]">
              <TouchableOpacity
                onPress={navigateToTest} 
                className="bg-orange-50 p-5 rounded-2xl items-center border border-orange-900"
              >
                <Text className="text-base font-ubuntu-medium text-orange-900">Пройти тест</Text>
              </TouchableOpacity>
            </View>
        </View>
          
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
    </>
  );
}
