import { View, Text, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import image from '@/constants/image'
import icon from '@/constants/icon'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from "../../../components/header";
import ExerciseCard from "../../../components/exerciseCard";
import ArticleCard from "../../../components/articleCard";
import TestLink from '@/components/testLink'
import TestCart from '@/components/testCart'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { title } from 'process'

const API_BASE_URL = "http://192.168.46.138:8080/api";

export default function Book() {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);   
    const [query, setQuery] = useState(""); 
  
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
  
          const [testsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/tests/`, { headers }),
          ]);
  
          const testsData = await testsRes.json();
          console.log("Отримані тести");
  
          setTests(testsData);
        } catch (error) {
          console.error("Помилка при отриманні даних:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    const groupTestsByCategory = (tests) => {
      const grouped = {};
    
      tests.forEach((test) => {
        const category = test.category?.title || "Без категорії";
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(test);
      });
    
      return grouped;
    };
    
    const filterTests = (tests, query) => {
      if (!query.trim()) return tests;
    
      return tests.filter((test) =>
        test.title.toLowerCase().includes(query.trim().toLowerCase()||
      (test.tags && test.tags.toLowerCase().includes(query)))
      );
    };
    

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: "Тести" }} />
      
      <ImageBackground 
        source={image.phonPeach3} 
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        <ScrollView 
          className="flex-1 p-2 mt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}>
           {loading ? (
                      <ActivityIndicator size="large" color="#451a03" />
                    ) : (
                      <>
          <View className="flex-row items-center bg-orange-50 border border-orange-800 rounded-xl p-2 mx-4 mb-4 h-16">
            <TextInput
              className="flex-1 text-lg p-2 text-orange-800 font-ubuntu-medium"
              placeholder="Пошук тестів..."
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />

           
              <View
                className="w-14 h-14 rounded-xl flex items-center justify-center mr-2">
                <Image source={icon.search} tintColor={"#9a3412"} className="w-8 h-8" />
              </View>
           
          </View>

          {query.trim() === "" ? (
            <View className="mb-1 mx-1">
              {Object.entries(groupTestsByCategory(tests)).map(([category, testsInCategory]) => (
                <View key={category} className="mb-4">
                  <Text className="text-lg font-ubuntu-bold text-orange-900 ml-2 mb-1">{category}</Text>
                  <View className="flex-row flex-wrap">
                    {testsInCategory.slice(0, 5).map((test) => (
                      <TestCart
                        key={test.id}
                        id={test.id}
                        color='#7c2d12'
                        title={test.title}
                        link={`/(root)/test/${test.id}`}
                      />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            // 🔍 Пошук — тільки відфільтровані тести
            <View className="mb-1 mx-1">
              <Text className="text-xl font-ubuntu-bold text-amber-900 ml-2 mb-2">Результати пошуку</Text>
              <View className="flex-row flex-wrap">
                {filterTests(tests, query).length > 0 ? (
                  filterTests(tests, query).map((test) => (
                    <TestCart
                      key={test.id}
                      id={test.id}
                      color="#7c2d12"
                      title={test.title}
                      link={`/(root)/test/${test.id}`}
                    />
                  ))
                ) : (
                  <View className='w-full flex justify-center items-center'>
                    <Image 
                      source={icon.notFound} 
                      tintColor={"#9a3412"} 
                      className="w-44 h-44" />
                    <Text className="text-center text-lg text-orange-800 px-4 font-ubuntu-medium w-full mt-4">
                      Нажаль, ми нічого не знайшли, спробуй по-іншому
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          </> )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
