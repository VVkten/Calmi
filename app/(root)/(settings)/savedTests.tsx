import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView, View, Image, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import image from '@/constants/image';
import icon from '@/constants/icon';
import API_BASE_URL from '@/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TestLink from '@/components/testLink';
import TestCart from '@/components/testCart';


const SavedArticles: React.FC = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}save-tests/`, {
          headers: { Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", },
        });
        const data = await response.json();
        setTests(data);
        // console.log("Response data:", data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
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
                source={image.phonOrngYel}
                className="flex-1 w-full h-full items-center p-2"
                resizeMode="cover"
              >
    {tests.length === 0 ? (
       <View className='w-full flex justify-center items-center mt-[50%]'>
        <Image 
          source={icon.robotHappy} 
          tintColor={"#7c2d12"} 
          className="w-36 h-36" />
        <Text className="text-center text-lg text-orange-900 px-4 font-ubuntu-medium w-full mt-4">
          Схоже, у тебе немає збережених тестів, повертайся коли збережеш щось цікаве!
        </Text>
      </View>
    ) : (
      <ScrollView>
        <View className="flex-row flex-wrap justify-betwee mt-3">
          {tests.map((test) => (
            <View key={test.id} className="w-[33%] mb-2">
              <TestCart
                id={test.id}
                color="#7c2d12"
                title={test.title}
                link={`/(root)/test/${test.id}`}
              />
            </View>
          ))}
        </View>
      </ScrollView>

    )}</ImageBackground>
  </SafeAreaView>
);
};

export default SavedArticles;