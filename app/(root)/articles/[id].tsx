import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, ImageBackground, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Image } from "react-native";
import { Stack } from "expo-router";

const API_BASE_URL = "http://192.168.46.138:8080/api/article";

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex justify-center items-center h-full" />;
  }

  return (
    <>
    <Stack.Screen options={{ title: article?.title || "Стаття" }} />

    <SafeAreaView className="flex-1">
      <ImageBackground source={image.phonBlueYel} className="flex-1 w-full h-full" resizeMode="cover">
        <ScrollView className="flex-1 p-5">
          <View className="bg-white p-4 rounded-xl shadow-md mb-11">
            <View>
              <Text className="text-2xl font-ubuntu-bold text-green-900">{article.title}</Text>
              <View className="flex-row items-center">
                <Text className="text-lg text-green-900 font-ubuntu-medium">CalMi</Text>
                <Image source={icon.tick} className="w-6 h-6 ml-2" />
              </View>   

              <Text className="text-base text-green-800 leading-6 mt-3">{article.description}</Text>
            </View>

            {/* <View className="flex-row ml-auto mt-4">
              <Image source={icon.share} className="w-10 h-10" tintColor="#14532d"/>
              <Image source={icon.report} className="w-10 h-10 ml-3" tintColor="#14532d"/>
            </View> */}
            
          </View>
          
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
    </>
  );
}
