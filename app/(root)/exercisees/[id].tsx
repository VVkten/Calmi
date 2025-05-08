import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View, Text, ActivityIndicator, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Image } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import API_BASE_URL from "@/settings";

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");

        const response = await fetch(`${API_BASE_URL}exercise/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setExercise(data);

        // Перевіряємо чи збережено
        const profileRes = await fetch(`${API_BASE_URL}profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profileData = await profileRes.json();
        setIsSaved(profileData.saved_exercises.some((ex) => ex.id === data.id));

      } catch (error) {
        console.error("Error fetching exercise:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  const toggleSaveExercise = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt");
      const response = await fetch(`${API_BASE_URL}save-content/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "exercise",
          id: exercise.id,
        }),
      });

      const result = await response.json();
      if (result.status === "saved") {
        setIsSaved(true);
      } else if (result.status === "removed") {
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Error saving/removing exercise:", error);
    }
  };

  const navigateToVideo = () => {
    router.navigate(`/exercisees/exerciseRun/${exercise.id}`);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex justify-center items-center h-full" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: exercise?.name || "Вправа" }} />

      <SafeAreaView className="flex-1">
        <ImageBackground source={image.phonGreenExr} className="flex-1 w-full h-full" resizeMode="cover">
          <ScrollView className="flex-1 p-5">
            <View className="p-4 mb-10 mx-0">
              <Text className="text-2xl font-ubuntu-bold text-green-900">{exercise.name}</Text>

              <View className="flex-row items-center mt-3">
                <Text className="text-lg text-green-900 font-ubuntu-medium">CalMi</Text>
                <Image source={icon.tick} className="w-6 h-6 ml-2" />
                <TouchableOpacity
                  className="mt-1 py-2 px-4 ml-[60%] rounded-lg items-end"
                  onPress={toggleSaveExercise}
                >
                  <Image
                    source={isSaved ?  icon.likeTrue : icon.like }
                    className="w-8 h-8" // розмір іконки
                    resizeMode="contain"
                    tintColor="#14532d"
                  />
                </TouchableOpacity>
              </View>

              <Text className="text-sm font-ubuntu-regular mt-3 text-green-900">{exercise.description}</Text>

              <View className="mt-[30%] items-center">
                <Image source={{ uri: `http://192.168.1.95:8080${exercise.image}` }} className="w-52 h-52 rounded-xl" />
              </View>

              {/* Кнопка запуску відео */}
              <View className="mt-10 w-[80%] items-center ml-[10%]">
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
