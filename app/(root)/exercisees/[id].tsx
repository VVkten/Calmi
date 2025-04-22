import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Image } from "react-native";
import { Stack } from "expo-router";
import { Video } from "expo-av";
import { useRouter } from "expo-router"; // Імпортуємо useRouter для навігації

const API_BASE_URL = "http://192.168.46.138:8080/api/exercise/";

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Ініціалізуємо router для навігації

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // console.log(data);
        setExercise(data);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex justify-center items-center h-full" />;
  }

  const navigateToVideo = () => {
    console.log(`Navigating to video for exercise: ${exercise.id}`);
    // router.push(`/exercisees/${id}/video`);
    router.push(`/exercisees/exerciseRun/${exercise.id}`);
  };

  return (
    <>
      <Stack.Screen options={{ title: exercise?.name || "Стаття" }} />

      <SafeAreaView className="flex-1">
        <ImageBackground source={image.phonGreenExr} className="flex-1 w-full h-full" resizeMode="cover">
          <ScrollView className="flex-1 p-5">
            <View className="p-4 mb-10 mx-0">
              <View>
                <Text className="text-2xl font-ubuntu-bold text-green-900">{exercise.name}</Text>
                <View className="flex-row items-center mt-3">
                  <Text className="text-lg text-green-900 font-ubuntu-medium">CalMi</Text>
                  <Image source={icon.tick} className="w-6 h-6 ml-2" />
                </View>
                <Text className="text-sm font-ubuntu-regular mt-3 text-green-900">{exercise.description}</Text>
              </View>

              <View className="mt-[30%] items-center">
                <Image source={{ uri: `http://192.168.46.138:8080${exercise.image}` }} className="w-52 h-52 rounded-xl" />
              </View>

              {/* Кнопка для переходу на відео сторінку */}
              <View className="mt-[40%] w-[80%] items-center ml-[10%]">
                <TouchableOpacity
                  onPress={navigateToVideo} 
                  className="bg-green-50 p-5 rounded-2xl items-center border border-green-900"
                >
                  <Text className="text-base font-ubuntu-medium text-green-950">Розпочати вправу</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
