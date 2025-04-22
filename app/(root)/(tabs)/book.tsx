import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import image from '@/constants/image';
import icon from '@/constants/icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TestLink from '@/components/testLink';
import ArticleCard from '@/components/articleCard';
import Header from "../../../components/header";


const API_BASE_URL = 'http://192.168.46.138:8080/api';

export default function Book() {
  const [tests, setTests] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filteredTests, setFilteredTests] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (!token) return;

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const [testsRes, articlesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/tests/`, { headers }),
          fetch(`${API_BASE_URL}/articles/`, { headers }),
        ]);

        const testsData = await testsRes.json();
        const articlesData = await articlesRes.json();

        const normalizedArticles = articlesData.map((article) => ({
          ...article,
          tags: Array.isArray(article.tags) ? article.tags : [],
        }));

        setTests(testsData);
        setArticles(normalizedArticles);
        setFilteredTests(testsData);
        setFilteredArticles(normalizedArticles);
      } catch (error) {
        console.error('Помилка при отриманні даних:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const lowerQuery = query.trim().toLowerCase();

    if (!lowerQuery) {
      setFilteredTests(tests);
      setFilteredArticles(articles);
      return;
    }

    const filteredTestsResult = tests.filter((test) => {
      const titleMatch = test.title?.toLowerCase().includes(lowerQuery);
      const tagsMatch =
        Array.isArray(test.tags) &&
        test.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
      return titleMatch || tagsMatch;
    });

    const filteredArticlesResult = articles.filter((article) => {
      const titleMatch = article.title?.toLowerCase().includes(lowerQuery);
      const tagsMatch =
        Array.isArray(article.tags) &&
        article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
      return titleMatch || tagsMatch;
    });

    setFilteredTests(filteredTestsResult);
    setFilteredArticles(filteredArticlesResult);
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={image.phonBook}
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        <Header logo={image.iconPlusTextRed} color="#c2410c" />

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
              <View className="flex-row items-center bg-white border border-orange-800 rounded-xl p-2 mx-4 mb-4 h-16">
                <TextInput
                  className="flex-1 text-lg p-2 text-orange-800 font-ubuntu-medium"
                  placeholder="Пошук..."
                  value={query}
                  onChangeText={(text) => {
                    setQuery(text);
                    handleSearch(); // Викликаємо пошук одразу при зміні тексту
                  }}
                  // returnKeyType="search"
                  // onSubmitEditing={handleSearch}
                />
                <TouchableOpacity
                  className="w-14 h-14 rounded-xl flex items-center justify-center mr-2"
                  onPress={handleSearch}
                >
                  <Image
                    source={icon.search}
                    tintColor={'#9a3412'}
                    className="w-8 h-8"
                  />
                </TouchableOpacity>
              </View>

              {/* ТЕСТИ */}
              <View className="mb-1 mx-3">
              <Link href="/(root)/test/testAll">
                  <View className='w-full flex-row items-center justify-between'>
                    <Text className='font-ubuntu-bold text-xl text-amber-900'>
                      Тести
                    </Text>
                      <Image 
                        source={icon.alli} 
                        tintColor={"#78350f"} 
                        className="w-4 h-4"
                      /> 
                  </View>
                 </Link>
                {filteredTests.length > 0 ? (
                  filteredTests.slice(0, 2).map((test) => (
                    <TestLink
                      key={test.id}
                      color='#d97706'
                      // id={test.id}
                      title={test.title}
                      link={`/(root)/test/${test.id}`}
                    />
                  ))
                ) : (
                  <View className='w-full flex justify-center items-center'>
                    <Image 
                      source={icon.notFound} 
                      tintColor={"#9a3412"} 
                      className="w-14 h-14" />
                    <Text className="text-center text-lg text-orange-800 px-4 font-ubuntu-medium w-full mt-4">
                      Нажаль, з тестів ми нічого не знайшли, спробуй по-іншому
                    </Text>
                  </View>
                )}
              </View>

              {/* СТАТТІ */}
              <View className="mt-3 mb-5 mx-3">
               <Link href="/(root)/articles/articlesAll">
                  <View className='w-full flex-row items-center justify-between'>
                    <Text className='font-ubuntu-bold text-xl text-amber-900'>
                      Статті
                    </Text>
                      <Image 
                        source={icon.alli} 
                        tintColor={"#78350f"} 
                        className="w-4 h-4"
                      /> 
                  </View>
                 </Link>
                {filteredArticles.length > 0 ? (
                  filteredArticles.slice(0, 4).map((article) => (
                    <ArticleCard
                      key={article.id}
                      id={article.id}
                      color="#7c2d12"
                      title={article.title}
                      description={article.description}
                      link={`/(root)/articles/${article.id}`}
                    />
                  ))
                ) : (
                <View className='w-full flex justify-center items-center'>
                    <Image 
                      source={icon.notFound} 
                      tintColor={"#9a3412"} 
                      className="w-14 h-14" />
                    <Text className="text-center text-lg text-orange-800 px-4 font-ubuntu-medium w-full mt-4">
                      Нажаль, з статей ми нічого не знайшли, спробуй по-іншому
                    </Text>
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
