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

export default function ExerciseVideo() {
  const { id } = useLocalSearchParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Ініціалізуємо router для навігації

  console.log('IDIDIDIDDID', id)
  const API_BACK = 'http://192.168.43.138:8080/api/exercise/'

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BACK}${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
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


  return (
    <>
      <Stack.Screen options={{ title: exercise?.name || "Стаття" }} />

      <SafeAreaView className="flex-1">
        <ImageBackground source={image.phonGreenExr} className="flex-1 w-full h-full" resizeMode="cover">
          <ScrollView className="flex-1 p-5">
            <View className="p-4 mb-10 mx-0">
              <View>

             </View>              
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
