import { useLocalSearchParams, router, Stack } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";
import API_BASE_URL from '@/settings';

export default function TestResult() {
  const { id_test, score, resultText } = useLocalSearchParams<{ id_test: string; score: string; resultText: string }>();
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchTestAndSaveResult = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
  
        if (!token) {
          console.error("Token not found");
          return;
        }
  
        // Спочатку тягнемо сам тест для відображення
        const response = await fetch(`${API_BASE_URL}tests/${id_test}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTest(data);
  
        // Тепер надсилаємо результат тесту через POST
        await fetch(`${API_BASE_URL}save-result/${id_test}/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ result_data: resultText }), // Ось сюди пакуємо дані
        });
  
        console.log("Result saved successfully");
      } catch (error) {
        console.error("Error fetching test or saving result:", error);
      }
    };
  
    fetchTestAndSaveResult();
  }, [id_test, resultText]);
  

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: `Результат тесту` }} />
      <ImageBackground
        source={image.phonTest1}
        className="flex-1 w-full h-full items-center justify-center px-5"
        resizeMode="cover"
      >
        <Text className="text-2xl text-orange-900 font-ubuntu-medium mb-1">Результат тесту:</Text>
        <Text className="text-xl text-orange-900 font-ubuntu-italic mb-6">{test?.title}</Text>
        <Text className="text-base text-orange-900 font-ubuntu-medium text-center">{resultText}</Text>

        <TouchableOpacity
          className="mt-10 bg-orange-50 border border-orange-800 px-6 py-3 rounded"
          onPress={() => router.back()}
        >
          <Text className="text-orange-800">Зрозуміло!</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
