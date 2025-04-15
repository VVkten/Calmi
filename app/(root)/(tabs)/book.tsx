import { View, Text, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import image from '@/constants/image';
import icon from '@/constants/icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "../../../components/header";
import ExerciseCard from "../../../components/exerciseCard";
import ArticleCard from "../../../components/articleCard";
import TestLink from '@/components/testLink';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://192.168.46.138:8080/api";

export default function Book() {
  const [tests, setTests] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');  // Додано для зберігання запиту пошуку
  const [filteredTests, setFilteredTests] = useState([]);  // Фільтровані тести
  const [filteredArticles, setFilteredArticles] = useState([]);  // Фільтровані статті

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");

        if (!token) {
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

        const normalizedArticles = articlesData.map(article => ({
          ...article,
          tags: Array.isArray(article.tags) ? article.tags : [],  // Якщо tags відсутні або не масив, ставимо порожній масив
        }));

        setTests(testsData);
        setArticles(normalizedArticles);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Функція для пошуку
  const handleSearch = () => {
    const lowerQuery = query.toLowerCase();
  
    const filteredTests = tests.filter(test => {
      // Перевірка на наявність тегів та чи є це масивом
      const hasTags = Array.isArray(test.tags);
      const testTitleMatch = test.title.toLowerCase().includes(lowerQuery);
      const testTagsMatch = hasTags && test.tags.some(tag =>
        tag.toLowerCase().includes(lowerQuery)
      );
  
      return testTitleMatch || testTagsMatch;
    });
  
    const filteredArticles = articles.filter(article => {
      const articleTitleMatch = article.title.toLowerCase().includes(lowerQuery);
  
      // Перевірка на наявність тегів та чи є це масивом
      const articleTagsMatch = Array.isArray(article.tags) && article.tags.some(tag =>
        tag.toLowerCase().includes(lowerQuery)
      );
  
      return articleTitleMatch || articleTagsMatch;
    });
  
    setFilteredTests(filteredTests);
    setFilteredArticles(filteredArticles);
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

        <ScrollView 
          className="flex-1 p-2 mt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }} 
        >
          {loading ? (
            <ActivityIndicator size="large" color="#451a03" />
          ) : (
            <>
              {/* ПОШУК */}
              <View className="flex-row items-center bg-gray-100 border border-orange-800 rounded-xl p-2 mx-4 mb-4 h-16">
                <TextInput
                  className="flex-1 text-lg p-2 text-orange-800 font-ubuntu-medium"
                  placeholder="Пошук..."
                  value={query}
                  onChangeText={setQuery}
                  returnKeyType="search"
                  onSubmitEditing={handleSearch} // Виконання пошуку при натисканні Enter
                />
                <Link href={"/(root)/articles/articleDetails"}>
                  <TouchableOpacity
                    className="w-14 h-14 rounded-xl flex items-center justify-center mr-2"
                    onPress={handleSearch}  // Виконання пошуку при натисканні кнопки 
                  >
                    <Image 
                      source={icon.search} 
                      tintColor={"#9a3412"} 
                      className="w-8 h-8" />
                  </TouchableOpacity>
                </Link>
              </View>
              
              {/* Рандомні тести */}
              <View className="mb-1 mx-3">
                <Link href="/(root)/test/testAll" className="text-xl font-ubuntu-bold text-amber-900 underline mb-1 ml-2">Тести</Link>
                {filteredTests.length > 0 ? (
                  filteredTests.slice(0, 2).map((test) => (
                    <TestLink key={test.id} id={test.id} title={test.title} link={`/(root)/test/${test.id}`} />
                  ))
                ) : (
                  <View className="p-4 bg-gray-200 rounded-xl my-2">
                    <Text className="text-center text-orange-700">Тести не знайдено</Text>
                  </View>
                )}
              </View>

              {/* Рандомні статті */}
              <View className="mt-3 mb-5 mx-3">
                <Link href="/(root)/articles/articlesAll" className="text-xl font-ubuntu-bold text-amber-900 underline mb-1 ml-2">Популярні статті</Link>
                {filteredArticles.length > 0 ? (
                  filteredArticles.slice(0, 4).map((article) => (
                    <ArticleCard key={article.id} id={article.id} color="#7c2d12" title={article.title} description={article.description} link={`/(root)/articles/${article.id}`} />
                  ))
                ) : (
                  <View className="p-4 bg-gray-200 rounded-xl my-2">
                    <Text className="text-center text-orange-700">Статті не знайдено</Text>
                  </View>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
