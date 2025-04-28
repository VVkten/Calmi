import { View, Text, ImageBackground, ScrollView, Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseCardBig from '@/components/exerciseCardBig';
import ExerciseLong from '@/components/exclinklong';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router, Stack } from 'expo-router'
import image from '@/constants/image'
import icon from '@/constants/icon'
import { query } from 'express';
import Header from "../../../components/header";
import API_BASE_URL from '@/settings';

// const API_BASE_URL = "http://192.168.0.109:8080/api";

export default function Exercise() {
  const [exercises, setExercises] = useState([]);
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

        const [exerciseRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}exercises/`, { headers }),
          fetch(`${API_BASE_URL}categories/`, { headers }),
        ]);

        const exerciseData = await exerciseRes.json();
        const categoriesData = await categoriesRes.json();

        setExercises(exerciseData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Помилка при отриманні даних:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const groupExerciseByCategory = (exercise) => {
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

  const filteredExercise = exercises.filter((exercise) => {
    const query = searchQuery.toLowerCase();
    return (
      (exercise.name && exercise.name.toLowerCase().includes(query)) ||
      (exercise.tags && exercise.tags.toLowerCase().includes(query))
    );
  });
        
      
  const groupedExercise = groupExerciseByCategory(exercises);

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground 
        source={image.phonGreen} 
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        <Header logo={image.logotextGreen} color="#166534" />

        <ScrollView 
          className="flex-1 p-2 mt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#003155" />
          ) : (
            <>

               {/* Пошук */}
                <View className="flex-row items-center bg-white border border-green-800 rounded-xl p-2 mx-4 mb-4 h-16">
                  <TextInput
                    className="flex-1 text-lg p-2 text-green-900 font-ubuntu-medium"
                    placeholder="Пошук..."
                    returnKeyType="search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <TouchableOpacity
                    className="w-14 h-14 rounded-xl flex items-center justify-center mr-2"
                    onPress={() => {}}
                  >
                    <Image source={icon.search} tintColor={'#14532d'} className="w-8 h-8" />
                  </TouchableOpacity>
                </View>

              {/* Якщо є пошуковий запит */}
              {searchQuery.trim() !== '' ? (
                <>
                  {filteredExercise.length === 0 ? (
                     <View className='w-full flex justify-center items-center'>
                        <Image 
                          source={icon.notFound} 
                          tintColor={"#14532d"} 
                          className="w-36 h-36" />
                        <Text className="text-center text-lg text-green-900 px-4 font-ubuntu-medium w-full mt-4">
                          Нажаль, ми нічого не знайшли, спробуй по-іншому
                        </Text>
                      </View>
                  ) : (
                    filteredExercise.map((exercise) => (
                      <ExerciseCardBig
                        icon={exercise.image}
                        color='#14532d'
                        key={exercise.id}
                        title={exercise.name}
                        link={`/(root)/exercisees/${exercise.id}`}
                      />
                    ))
                  )}
                </>
              ) : (
                // Якщо нема пошукового запиту — показуємо по категоріях
                <View className="mb-4 mx-1">
                {Object.entries(groupedExercise).map(([category, exerciseInCategory]) => (
                  <View key={category} className="mb-4 m-0 ml-4">
                    <Text className="text-lg font-ubuntu-bold text-green-900 ml-2 mb-1">
                      {category}
                    </Text>
                    
                    <View className="flex-row flex-wrap justify-between ml-1 mt-2 m-2">
                      {exerciseInCategory.slice(0, 4).map((exercise) => (
                        <View key={exercise.id} className="w-1/2 p-1 mb-3">
                          <ExerciseCardBig
                            icon={exercise.image}
                            color="#14532d"
                            title={exercise.name}
                            link={`/(root)/exercisees/${exercise.id}`}
                          />
                        </View>
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