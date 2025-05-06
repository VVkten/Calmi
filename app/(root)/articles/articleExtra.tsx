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
  import { Stack } from 'expo-router';
  import image from '@/constants/image';
  import icon from '@/constants/icon';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import ArticleCard from '@/components/articleCard';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import API_BASE_URL from '@/settings';

  export default function articleExtra() {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('jwt');
          if (!token) return;
  
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
  
          const [articlesRes, categoriesRes] = await Promise.all([
            fetch(`${API_BASE_URL}articles/`, { headers }),
            fetch(`${API_BASE_URL}categories/`, { headers }),
          ]);
  
          const articlesData = await articlesRes.json();
          const categoriesData = await categoriesRes.json();
  
          setArticles(articlesData);
          setCategories(categoriesData);
        } catch (error) {
          console.error('Помилка при отриманні даних:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    // Фільтруємо тільки статті, які належать категорії з id: 2
    const filteredArticlesByCategory = articles.filter((article) => article.category === 2);
  
    const groupArticlesByCategory = (articles) => {
      const grouped = {};
  
      // Групуємо статті по категоріях
      articles.forEach((article) => {
        const categoryObj = categories.find((cat) => cat.id === article.category);
        const category = categoryObj?.title || 'Без категорії';
  
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(article);
      });
  
      return grouped;
    };
  
    // Тепер фільтруємо статті тільки по категорії з id 2
    const filteredArticles = filteredArticlesByCategory.filter((article) => {
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        (article.tags && article.tags.toLowerCase().includes(query))
      );
    });
  
    // Групуємо статті лише за категорією з id: 2
    const groupedArticles = groupArticlesByCategory(filteredArticlesByCategory);
  
    return (
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: 'Статті' }} />
  
        <ImageBackground
          source={image.phomonWhitePinkDot}
          className="flex-1 w-full h-full"
          resizeMode="cover"
        >
          <ScrollView
            className="flex-1 p-2 mt-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#451a03" />
            ) : (
              <>
                {/* Пошук */}
                <View className="flex-row items-center bg-white border border-red-800 rounded-xl p-2 mx-4 mb-4 h-16">
                  <TextInput
                    className="flex-1 text-lg p-2 text-red-800 font-ubuntu-medium"
                    placeholder="Пошук статей..."
                    returnKeyType="search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <TouchableOpacity
                    className="w-14 h-14 rounded-xl flex items-center justify-center mr-2"
                    onPress={() => {}}
                  >
                    <Image source={icon.search} tintColor={'#9a3412'} className="w-8 h-8" />
                  </TouchableOpacity>
                </View>
  
                {/* Якщо є пошуковий запит */}
                {searchQuery.trim() !== '' ? (
                  <>
                    {filteredArticles.length === 0 ? (
                      <View className="w-full flex justify-center items-center">
                        <Image
                          source={icon.notFound}
                          tintColor={"#9a3412"}
                          className="w-44 h-44"
                        />
                        <Text className="text-center text-lg text-red-800 px-4 font-ubuntu-medium w-full mt-4">
                          Нажаль, ми нічого не знайшли, спробуй по-іншому
                        </Text>
                      </View>
                    ) : (
                      filteredArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          id={article.id}
                          title={article.title}
                          description={article.description}
                          link={`/(root)/articles/${article.id}`}
                          color="#991b1b"
                        />
                      ))
                    )}
                  </>
                ) : (
                  // Якщо нема пошукового запиту — показуємо по категорії з id 2
                  <View className="mb-2 mx-1">
                    {Object.entries(groupedArticles).map(([category, articlesInCategory]) => (
                      <View key={category} className="mb-4">
                        <Text className="text-lg font-ubuntu-bold text-red-900 ml-2 mb-1">
                          {category}
                        </Text>
                        <View className="p-2">
                          {articlesInCategory.slice(0, 4).map((article) => (
                            <ArticleCard
                              key={article.id}
                              id={article.id}
                              title={article.title}
                              description={article.description}
                              link={`/(root)/articles/${article.id}`}
                              color="#7c2d12"
                            />
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
  
  