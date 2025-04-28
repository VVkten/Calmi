import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '@/constants/image';
import { Link } from 'expo-router';
import icon from '@/constants/icon';
import ArticleCard from '@/components/articleCard';
import ExerciseCard from '@/components/exerciseCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../../../components/header";
import API_BASE_URL from '@/settings';

// const API_BASE_URL = "http://192.168.0.109:8080/api";

export default function Help() {
  const [exercises, setExercises] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

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

        // Запит до бекенду для отримання лише статей та вправ з категорією id: 2
        const [exercisesRes, articlesRes] = await Promise.all([
          fetch(`${API_BASE_URL}exercises/?category_id=2`, { headers }), // Фільтрація вправ за категорією
          fetch(`${API_BASE_URL}articles/?category_id=2`, { headers }), // Фільтрація статей за категорією
        ]);

        const exercisesData = await exercisesRes.json();
        const articlesData = await articlesRes.json();
        console.log("Отримані вправи та статі для екстреної сторінки");

        setExercises(exercisesData);
        setArticles(articlesData);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (text) => {
    setModalText(text);
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Фонове зображення */}
      <ImageBackground 
        source={image.phonPingPurp} 
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        <Header logo={image.iconPlusTextPink} color="#dc2626" />

        {/* Основний контент */}
        <ScrollView 
          className="flex-1 p-2 mt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }} // Відступ під TabMenu
        >
          {loading ? (
            <ActivityIndicator size="large" color="#003155" />
          ) : (
            <>

              <View className='mt-3'>
                <TouchableOpacity 
                  onPress={() => openModal("Зателефонуйте на нашу гарячу лінію для негайної допомоги та підтримки. Наші фахівці готові вислухати вас, надати корисні поради та підтримку в будь-якій ситуації. Ви не самі – ми тут, щоб допомогти.\n\nГаряча лінія доступна за номерами: \n+380 12 378 67 89 \n+380 12 345 67 90 \n+380 12 385 67 91 ")} 
                  className='w-full h-24 mb-2 rounded-md border border-red-600 text-center'>
                  <View className='flex flex-row items-center w-full h-full bg-white rounded-lg px-4'>
                    <Image source={icon.phon} className='w-14 h-11 tint-blue-700 mx-3' />
                    <Text className='text-pink-900 text-lg font-bold'>Гаряча лінія - Підтримка</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => openModal("Отримайте психологічну допомогу: чат-бот надасть вам можливість поспілкуватися з модератором у переписці. Цей чат-бот створений, щоб допомогти вам почуватись краще та мати під рукою важливу інформацію для підтримки вашого психічного здоров’я. \n\nЧат-бот доступний у Telegram за посиланням: t.me/helpbot")} 
                  className='w-full h-24 mb-2 rounded-xl border border-red-600 shadow-md text-center'>
                  <View className='flex flex-row items-center w-full h-full bg-white rounded-lg px-4'>
                    <Image source={icon.comm} className='w-14 h-12 tint-blue-700 mx-3' />
                    <Text className='text-pink-900 text-lg font-bold'>Чат Бот - Підтримка</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <View className="mt-3 mb-1 mx-1">
                  {/* <Text className="text-xl font-ubuntu-bold text-pink-900 ml-2"></Text> */}
                   <Link href="/(root)/articles/articleExtra">
                      <View className='w-full flex-row items-center justify-between'>
                        <Text className='font-ubuntu-bold text-xl text-amber-900'>
                          Статті самодопомоги
                        </Text>
                          <Image 
                            source={icon.alli} 
                            tintColor={"#78350f"} 
                            className="w-4 h-4"
                          /> 
                      </View>
                      </Link>
                  {articles.length === 0 ? (
                    <View className='mb-[5%] items-center mx-auto'>
                        <Image source={icon.robotHappy} tintColor='#831843'  className="w-20 h-20 tint-blue-700 mx-3" />
                        <Text className="text-center text-sm font-ubuntu-medium text-pink-900 w-[300px]">Нажаль, зараз немає вправ для цієї категорії. Але ми працюємо над ними!
                        </Text>
                    </View>                  ) : (
                    articles.slice(0, 2).map((article) => (
                      <ArticleCard key={article.id} id={article.id} title={article.title} description={article.description} link={`/(root)/articles/${article.id}`} color="#831843" />
                    ))
                  )}
                </View>

                <View className='mb-4'>
                  <Text className="text-lg font-ubuntu-bold text-pink-900 ml-2">Вправи самодопомоги</Text>
                  <View className="flex-row justify-between mt-2 m-2">
                    {exercises.length === 0 ? (
                      <View className='mb-[5%] items-center mx-auto'>
                        <Image source={icon.robotHappy} tintColor='#831843'  className="w-20 h-20 tint-blue-700 mx-3" />
                        <Text className="text-center text-sm font-ubuntu-medium text-pink-900 w-[300px]">Нажаль, зараз немає вправ для цієї категорії. Але ми працюємо над ними!
                        </Text>
                      </View>
                    ) : (
                      exercises.slice(0, 3).map((exercise) => (
                        <ExerciseCard
                          icon={exercise.image}
                          key={exercise.id}
                          title={exercise.name}
                          link={`/(root)/exercisees/${exercise.id}`}
                          color="#831843"
                      />
                      ))
                    )}
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </ImageBackground>

       {/* Модальне вікно */}
       <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 justify-end">
            <View className="bg-white shadow p-5 border border-pink-900 rounded-t-2xl min-h-[50%] max-h-[80%]">
              <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-3 p-2 rounded-lg items-end">
                <Image source={icon.addPostNotDot} className='w-6 h-6' tintColor='#831843'/>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-pink-900">{modalText}</Text>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
