import { useLocalSearchParams, router, Stack } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";

const API_BASE_URL = "http://192.168.46.138:8080/api/tests/";

export default function TestResult() {
  const { id_test, score, resultText } = useLocalSearchParams<{ id_test: string; score: string; resultText: string }>();
  const [test, setTest] = useState(null);


  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}${id_test}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTest(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchTest();
  }, [id_test]);

  return (
    <SafeAreaView className="flex-1">
    <Stack.Screen options={{ title: `Результат тесту` }} />
    <ImageBackground 
            source={image.phonTest1}
            className="flex-1 w-full h-full items-center justify-center px-5" resizeMode="cover">
        
      <Text className="text-2xl text-orange-900 font-ubuntu-medium mb-1">Результат тесту:</Text>
      <Text className="text-xl text-orange-900 font-ubuntu-italic mb-6">{test?.title}</Text>
      {/* <Text className="text-xl mb-6">Набрані бали: {score}</Text> */}
      <Text className="text-base text-orange-900 font-ubuntu-medium text-center">{resultText}</Text>

      <TouchableOpacity
        className="mt-10 bg-orange-50 border border-orange-800 px-6 py-3 rounded"
        onPress={() => router.push(`/(root)/test/${id_test}`)}
      >
        <Text className="text-orange-800">Зрозуміло!</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
