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


// const API_BASE_URL = 'http://192.168.46.138:8080/api';

export default function exerciseAll() {
  const [exercise, setExercise] = useState([]);
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

        const [exercisesRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}exercises/`, { headers }),
          fetch(`${API_BASE_URL}categories/`, { headers }),
        ]);

        const exercisesData = await exercisesRes.json();
        const categoriesData = await categoriesRes.json();

        console.log("Отримані вправи");
        setExercise(exercisesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Помилка при отриманні даних:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupArticlesByCategory = (exercise) => {
    const grouped = {};

    exercise.forEach((exercise) => {
      const categoryObj = categories.find((cat) => cat.id === exercise.category);
      const category = categoryObj?.title || 'Без категорії';

      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(exercise);
    });

    return grouped;
  };

  const filteredArticles = exercise.filter((exercise) => {
    const query = searchQuery.toLowerCase();
    return (
      exercise.title.toLowerCase().includes(query) ||
      (exercise.tags && exercise.tags.toLowerCase().includes(query))
    );
  });

  const groupedArticles = groupArticlesByCategory(exercise);

  return (
    <SafeAreaView className="flex-1">
    <ImageBackground 
      source={image.phonGreen} 
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
          <ActivityIndicator size="large" color="#003155" />
        ) : (
          <>
            {/* Популярні вправи */}
            <View>
              <Text className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">Популярні вправи</Text>
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

            {/* Рекомендовані вправи */}
            <View className='mt-3 mb-1 mx-3'>
              <Text className="text-lg font-ubuntu-bold text-primary-dark-100 ml-2">Рекомендовані</Text>
              <View className='justify-between mt-2'>
                {getRandomItems(exercises, 6).map((exercise) => (
                  <ExerciseLong 
                    key={exercise.id} 
                    image={{ uri: exercise.image ? `${API_BASE_URL}${exercise.image}` : "URL_ЗОБРАЖЕННЯ_ЗАМОВЧУВАННЯ" }} 
                    title={exercise.name} 
                    link={`/(root)/exercisees/${exercise.id}`} 
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  </SafeAreaView>
  );
}
