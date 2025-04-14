import { View, Text, ImageBackground, ScrollView, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '@/constants/image';
import ExerciseCard from '@/components/exerciseCard';
import ExerciseLong from '@/components/exclinklong';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://192.168.46.138:8080/api";

const getRandomItems = (arr, numItems) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numItems);
};

export default function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");

        if (!token) {
          // console.error("Токен не знайдено!");
          return;
        }

        const response = await fetch(`${API_BASE_URL}/exercises/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const exercisesData = await response.json();
        console.log("Отримані вправи");
        setExercises(exercisesData);
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
