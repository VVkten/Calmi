import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Image } from "react-native";
import { Stack } from "expo-router";

const API_BASE_URL = "http://192.168.46.138:8080/api/test/";

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

  const navigateToTest = () => {
    console.log(`Navigating to video for exercise: ${test.id}`);
    // router.push(`/exercisees/${id}/video`);
    router.push('/test/testError');
  };

  return (
    <>
    <Stack.Screen options={{ title: test?.title || "TEST" }} />

    <SafeAreaView className="flex-1">
      <ImageBackground source={image.phonBlueYel} className="flex-1 w-full h-full" resizeMode="cover">
        <ScrollView className="flex-1 p-5">
          <View className="p-4 mb-10 mx-0">

            {/* <View className="items-end mt-4 mx-0">
              <Image source={icon.share} className="w-10 h-10" tintColor="#14532d"/>
              <Image source={icon.report} className="w-10 h-10" tintColor="#14532d" />
            </View> */}

            <View>
              <Text className="text-2xl font-ubuntu-bold text-green-900">{test.title}</Text>
              <View className="flex-row items-center mt-3">
                <Text className="text-lg text-green-900 font-ubuntu-medium">CalMi</Text>
                <Image source={icon.tick} className="w-6 h-6 ml-2" />
              </View>
              <Text className="text-sm font-ubuntu-regular mt-3 text-green-900">{test.description}</Text>
            </View>

            {/* <View className="mt-5 items-center">
              <Image source={{ uri: `http://192.168.43.138:8080${exercise.image}` }} className="w-96 h-96 rounded-xl" />
            </View> */}


            {/* Кнопка для переходу на відео сторінку */}
            <View className="mt-[30%] w-[80%] items-center ml-[10%]">
              <TouchableOpacity
                onPress={navigateToTest} 
                className="bg-green-50 p-5 rounded-2xl items-center border border-green-900"
              >
                <Text className="text-base font-ubuntu-medium text-green-950">Пройти тест</Text>
              </TouchableOpacity>
            </View>
        </View>
          
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
    </>
  );
}
