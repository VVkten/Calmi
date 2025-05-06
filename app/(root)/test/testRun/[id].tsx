import { useLocalSearchParams, router, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import image from "@/constants/image";
import API_BASE_URL from '@/settings';


type Answer = {
  id: number;
  text: string;
  score: number;
};

type Question = {
  id: number;
  text: string;
  answers: Answer[];
};

type ResultMap = {
  [key: string]: string;
};

export default function TestRun() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, { answerId: number; score: number }>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultMap, setResultMap] = useState<ResultMap>({});
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const res = await fetch(`${API_BASE_URL}tests/${id}/questions_with_answers/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const questionsData = await res.json();
        setQuestions(questionsData);

        const resultRes = await fetch(`${API_BASE_URL}tests/${id}/result/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resultData = await resultRes.json();
        setResultMap(resultData.result_data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAnswer = (questionId: number, answerId: number, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { answerId, score },
    }));
  };

  const nextQuestion = () => {
    const currentQuestion = questions[currentIndex];
    if (!answers[currentQuestion.id]) {
      Alert.alert("Увага", "Оберіть відповідь, щоб продовжити.");
      return;
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTest();
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const finishTest = () => {
    const totalScore = Object.values(answers).reduce((sum, item) => sum + item.score, 0);

    let selectedText = "";
    let closestKey: number | null = null;

    for (const key of Object.keys(resultMap)) {
      const numKey = parseInt(key);
      if (totalScore >= numKey && (closestKey === null || numKey > closestKey)) {
        closestKey = numKey;
        selectedText = resultMap[key];
      }
    }

    router.replace({
      pathname: "/test/testRun/testResult",
      params: {
        id_test: id,
        score: totalScore.toString(),
        resultText: selectedText,
      },
    });
    
  };

  // function getRandomImage(): string {
  //   const images = [
  //     "phonTest1",
  //     "phonTest2",
  //     "phonTest3",
  //     "phonTest4",
  //     "phonTest5",
  //   ];
  //   const randomIndex = Math.floor(Math.random() * images.length);
  //   return images[randomIndex];
  // }
  
  // useEffect(() => {
  //   setBackgroundImage(getRandomImage());
  // }, [currentIndex]);
  

  // const randomPhon = getRandomImage();

  const confirmExit = () => {
    Alert.alert("Вийти з тесту", "Усі відповіді буде втрачено. Продовжити?", [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Вийти",
        style: "destructive",
        onPress: () => router.back(),
      },
    ]);
  };

  if (loading) return <ActivityIndicator size="large" className="mt-20" />;

  const currentQuestion = questions[currentIndex];

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: `Питання ${currentIndex + 1}` }} />
      <ImageBackground 
        source={image.phonTest3}
        className="flex-1 w-full h-full" 
        resizeMode="cover"
      >
        <Text className="text-xl font-semibold mb-3 p-4 mt-[30%]">{currentQuestion.text}</Text>

        <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 120 }}>
          {currentQuestion.answers.map((a) => (
            <TouchableOpacity
              key={a.id}
              className={`p-3 mb-2 rounded border ${
                answers[currentQuestion.id]?.answerId === a.id
                  ? "bg-orange-100"
                  : "bg-orange-50"
              }`}
              onPress={() => handleAnswer(currentQuestion.id, a.id, a.score)}
            >
              <Text>{a.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Контейнер для кнопок */}
        <View className="absolute bottom-8 left-0 right-0 px-4">
          <View className="flex flex-row justify-between mb-2">
            <TouchableOpacity
              onPress={prevQuestion}
              disabled={currentIndex === 0}
              className="py-2 px-4 rounded"
            >
              <Text className="text-orange-900 text-xl font-ubuntu-bold">Назад</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={nextQuestion}
              className="px-4 py-2 rounded"
            >
              <Text className="text-orange-900 text-xl font-ubuntu-bold">
                {currentIndex === questions.length - 1 ? "Завершити" : "Далі"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={confirmExit}>
            <Text className="text-red-500 text-center font-ubuntu-medium underline">Вийти</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>

  );
}
