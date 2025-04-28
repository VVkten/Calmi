import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, ImageBackground, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Image } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import API_BASE_URL from '@/settings';

// const API_BASE_URL = "http://192.168.0.109:8080/api/article/";

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}article/${id}/`, {
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
 
 
  // Перевірка категорії в тексті (article.category)
  const backgroundImage = article?.category === 2 ? image.phomonWhitePinkDot : image.phonBlueYel;
  let color_arc = "";

  if (article.category === 2) {
    color_arc = "#7f1d1d";
  } else {
    color_arc = "#14532d";
  }
  console.log(article.category, color_arc);

  return (
    <>
      <Stack.Screen options={{ title: article?.title || "Стаття" }} />

      <SafeAreaView className="flex-1">
        <ImageBackground source={backgroundImage} className="flex-1 w-full h-full" resizeMode="cover">
          <ScrollView className="flex-1 p-5">
            <View className="bg-white p-4 rounded-xl shadow-md mb-11">
              <View>
                <Text className="text-2xl font-ubuntu-bold " style={{ color: color_arc }}>{article.title}</Text>
                <View className="flex-row items-center">
                  <Text className="text-lg font-ubuntu-medium" style={{ color: color_arc }} >CalMi</Text>
                  <Image source={icon.tick} className="w-6 h-6 ml-2" />
                </View>   

                <Text className="text-base leading-6 mt-3" style={{ color: color_arc }} >{article.description}</Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
