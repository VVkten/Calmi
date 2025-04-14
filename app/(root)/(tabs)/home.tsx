import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "@/constants/image";
import Post from "../../../components/post";
import Header from "../../../components/header";
import ExerciseCard from "../../../components/exerciseCard";
import ArticleCard from "../../../components/articleCard";
import { Link } from "expo-router";
import icon from "@/constants/icon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.46.138:8080/api";

export default function HomeScreen() {
  const [exercises, setExercises] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Функція для вибору випадкових елементів з масиву
  const getRandomItems = (arr, numItems) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");

        if (!token) {
          console.error("Токен не знайдено!");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [exercisesRes, articlesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/exercises/`, { headers }),
          fetch(`${API_BASE_URL}/articles/`, { headers }),
        ]);

        const exercisesData = await exercisesRes.json();
        const articlesData = await articlesRes.json();
        console.log("Отримані вправи:", exercisesData);
        console.log("Отримані статті:", articlesData);

        setExercises(exercisesData);
        setArticles(articlesData);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={image.phonStandart} className="flex-1 w-full h-full" resizeMode="cover">
        <Header />

        <ScrollView className="flex-1 p-2 mt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#003155" />
          ) : (
            <>
              {/* Популярні вправи */}
              <View>
                <Link href="/exercise" className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">
                  Популярні вправи
                </Link>

                <View className="flex-row justify-between mt-2 m-2">
                  {getRandomItems(exercises, 3).map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      icon={{ uri: exercise.image ? `${API_BASE_URL}${exercise.image}` : "URL_ЗОБРАЖЕННЯ_ЗАМОВЧУВАННЯ" }}
                      title={exercise.name}
                      link={`/(root)/exercisees/${exercise.id}`}
                    />
                  ))}
                </View>
              </View>

              {/* Статті дня */}
              <View className="mt-3 mb-[8%] mx-3">
                <Link href="/book" className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">
                  Статті дня
                </Link>

                {getRandomItems(articles, 2).map((article) => (
                  <ArticleCard key={article.id} id={article.id} title={article.title} description={article.description} link={`/(root)/articles/${article.id}`} color="#003155" />
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
