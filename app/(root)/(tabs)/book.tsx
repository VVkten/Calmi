import { View, Text, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import image from '@/constants/image'
import icon from '@/constants/icon'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from "../../../components/header";
import ExerciseCard from "../../../components/exerciseCard";
import ArticleCard from "../../../components/articleCard";
import TestLink from '@/components/testLink'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_BASE_URL = "http://192.168.46.138:8080/api";

export default function Book() {
    const [tests, setTests] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
  
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
  
          const [testsRes, articlesRes] = await Promise.all([
            fetch(`${API_BASE_URL}/tests/`, { headers }),
            fetch(`${API_BASE_URL}/articles/`, { headers }),
          ]);
  
          const testsData = await testsRes.json();
          const articlesData = await articlesRes.json();
          console.log("Отримані тести та статті");
  
          setTests(testsData);
          setArticles(articlesData);
        } catch (error) {
          console.error("Помилка при отриманні даних:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    // Функція для отримання випадкових елементів з масиву
    const getRandomItems = (array, count) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground 
        source={image.phonPeach3} 
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        <View className="flex-row justify-between items-center p-4 w-full">
              <View className="w-[120px] h-14">
                <Image 
                  source={image.logotextGreen} 
                  className="w-full h-full object-contain rounded-lg"
                />
              </View>
          </View>

          {/* <Header/> */}

        <ScrollView 
          className="flex-1 p-2 mt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }} 
        >
           {loading ? (
                      <ActivityIndicator size="large" color="#451a03" />
                    ) : (
                      <>
 {/* ПОШУК НЕ РОБОЧИЙ */}
          {/* <View className="flex-row items-center bg-gray-100 border border-green-800 rounded-xl p-2 mx-4 h-16">
            <TextInput
              className="flex-1 text-lg p-2 text-green-700 font-ubuntu-medium"
              placeholder="Search..."
              // value={query}
              // onChangeText={setQuery}
              returnKeyType="search"
              // onSubmitEditing={handleSearch} // Виконання пошуку при натисканні Enter
            />
            <Link href={"/(root)/articles/articleDetails"}>
              <TouchableOpacity
                className="w-14 h-14 rounded-xl flex items-center justify-center mr-2"
                 onPress={ () => router.push("/articles/articleDetails")} // Виконання пошуку при натисканні кнопки 
              >
                <Image 
                source={icon.search} 
                tintColor={"#166534"} 
                className="w-8 h-8" />
              </TouchableOpacity>
            </Link>
            
          </View> */}
          
          {/* Рандомні тести */}
          <View className="mb-1 mx-3">
            <Link href="/(root)/articles/articlesAll" className="text-xl font-ubuntu-bold text-amber-950 ml-2">Тести</Link>
            {getRandomItems(tests, 2).map((test) => (
                  <TestLink key={test.id} id={test.id} title={test.title} link={`/(root)/test/${test.id}`}/>
                ))}
          </View>

          {/* Рандомні статті */}
          <View className="mt-3 mb-5 mx-3">
            <Link href="/(root)/articles/articlesAll" className="text-xl font-ubuntu-bold text-amber-950 ml-2">Популярні статті</Link>
            {getRandomItems(articles, 4).map((article) => (
                  <ArticleCard key={article.id} id={article.id} title={article.title} description={article.description} link={`/(root)/articles/${article.id}`} color="#451a03" />
                ))}
           </View>
          </> )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
