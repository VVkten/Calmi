import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView, View, Image, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import image from '@/constants/image';
import icon from '@/constants/icon';
import API_BASE_URL from '@/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TestLink from '@/components/testLink';
import ExerciseCardBig from '@/components/exerciseCardBig';


const SavedArticles: React.FC = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}save-exercises/`, {
          headers: { Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", },
        });
        const data = await response.json();
        setExercises(data);
        // console.log("Response data:", data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
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
                    source={image.phonGreenWhite}
                    className="flex-1 w-full h-full items-center p-5"
                    resizeMode="cover"
                  >
        {exercises.length === 0 ? (
          <View className='w-full flex justify-center items-center mt-[50%]'>
            <Image 
              source={icon.robotHappy} 
              tintColor={"#1e3a8a"} 
              className="w-36 h-36" />
            <Text className="text-centertext-lg text-blue-900 px-4 font-ubuntu-medium w-full mt-4">
              Схоже, у тебе немає збережених вправ, повертайся коли знайдеш улюблені!
            </Text>
          </View>
        ) : (
          <ScrollView>
          <View className="flex-row flex-wrap justify-between">
            {exercises.map((exercise) => (
              <View key={exercise.id} className="w-[48%] mb-8">
                <ExerciseCardBig
                  icon={exercise.image}
                  color="#14532d"
                  title={exercise.name}
                  link={`/(root)/exercisees/${exercise.id}`}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        
        )}
        </ImageBackground>
      </SafeAreaView>
);
};

export default SavedArticles;