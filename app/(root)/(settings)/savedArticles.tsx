import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView, View, Image, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import image from '@/constants/image';
import icon from '@/constants/icon';
import API_BASE_URL from '@/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArticleCard from '@/components/articleCard';


const SavedArticles: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}save-articles/`, {
          headers: { Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", },
        });
        const data = await response.json();
        setArticles(data);
        // console.log("Response data:", data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text>Завантаження...</Text>
      </SafeAreaView>
    );
  }

      return (
  <SafeAreaView className="flex-1">
    <ImageBackground
            source={image.phonBlueYel}
            className="flex-1 w-full h-full items-center p-5"
            resizeMode="cover"
          >
    {articles.length === 0 ? (
       <View className='w-full flex justify-center items-center mt-[50%]'>
          <Image 
            source={icon.robotHappy} 
            tintColor={"#1e3a8a"} 
            className="w-36 h-36" />
          <Text className="text-center text-lg text-blue-900 px-4 font-ubuntu-medium w-full mt-4">
            Схоже, у тебе немає збережених статей, повертайся коли знайдеш щось корисне!
          </Text>
        </View>
    ) : (
      <ScrollView>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            color="#14532d"
            title={article.title}
            description={article.description}
            link={`/(root)/articles/${article.id}`}
          />
        ))}
      </ScrollView>
    )}
    </ImageBackground>
  </SafeAreaView>
);Ї
};

export default SavedArticles;