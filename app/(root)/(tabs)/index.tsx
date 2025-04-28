import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "@/constants/image";
import Post from "../../../components/post";
import Header from "../../../components/header";
import ExerciseCard from "../../../components/exerciseCard";
import ArticleCard from "../../../components/articleCard";
import TestLink from "../../../components/testLink";
import { Link } from "expo-router";
import icon from "@/constants/icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from '@/settings';


// const API_BASE_URL = "http://192.168.0.109:8080/api";

export default function HomeScreen() {
  const [tests, setTests] = useState([]);
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
          // console.error("Токен не знайдено!");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [testsRes,exercisesRes, articlesRes] = await Promise.all([
          fetch(`${API_BASE_URL}tests/`, { headers }),
          fetch(`${API_BASE_URL}exercises/`, { headers }),
          fetch(`${API_BASE_URL}articles/`, { headers }),
        ]);

        const testsData = await testsRes.json();
        const exercisesData = await exercisesRes.json();
        const articlesData = await articlesRes.json();
        console.log("Отримані вправи та статі для головної сторінки");

        setTests(testsData);
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
        <Header logo={image.logotextright} color="#03528C" />

        <ScrollView className="flex-1 p-2 mt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#003155" />
          ) : (
            <>
             {/* <View className="w-[95%] h-32 mb-3 rounded-lg mx-auto flex items-center justify-center">
              <Text className="text-center text-sm font-ubuntu-regular text-primary-dark-200">
              “Емоційний біль — це не те що слід приховувати й ніколи про нього не говорити. У вашому болю є правда, у вашому болю є зростання, але лише якщо його спочатку винести назовні” (Стівен Ейчісон).
              </Text>
            </View> */}
              {/* Популярні вправи */}
              <View>
                <Link href="/exercise" className="mx-2" asChild>
                  <Text className=" text-lg font-ubuntu-bold text-primary-dark-100">
                    Популярні вправи
                  </Text>
                </Link>

                <View className="flex-row justify-between mt-2 m-2">
                  {getRandomItems(exercises, 3).map((exercise) => (
                    // console.log(exercise.image),
                    <ExerciseCard
                      icon={exercise.image}
                      key={exercise.id}
                      title={exercise.name}
                      link={`/(root)/exercisees/${exercise.id}`}
                      color="#003155"
                    />
                  ))}
                </View> 

                {/* <View className="flex-row justify-between mt-2 m-2">
                  {getRandomItems(exercises, 3).map((exercise) => (
                    // console.log(exercise.image),
                    <ExerciseCard
                      icon={exercise.image}
                      key={exercise.id}
                      title={exercise.name}
                      link={`/(root)/exercisees/${exercise.id}`}
                      color="#003155"
                    />
                  ))}
                </View> */}
             </View>

             
             <View className="mt-3 mb-2 mx-3">
                <Link href="/book" asChild >
                  <Text className="text-lg font-ubuntu-bold text-blue-900 ml-2">
                    Тест на сьогодні
                  </Text>
                </Link>

                {getRandomItems(tests, 1).map((test) => (
                    <TestLink
                    key={test.id}
                    color='#2e96e0'
                    // id={test.id}
                    title={test.title}
                    link={`/(root)/test/${test.id}`}
                    />                
                    ))}
              </View>
            

              {/* Статті дня */}
              <View className="mt-3 mb-[8%] mx-3">
                <Link href="/book" asChild >
                  <Text className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">
                    Поради дня
                  </Text>
                </Link>

                {getRandomItems(articles, 3).map((article) => (
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
