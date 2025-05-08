import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "@/constants/image";
import icon from "@/constants/icon";
import { Stack } from "expo-router";
import API_BASE_URL from "@/settings";

export default function TestDetail() {
  const { id } = useLocalSearchParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}tests/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTest(data);

        // Перевіряємо, чи збережено тест
        const profileRes = await fetch(`${API_BASE_URL}profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profileData = await profileRes.json();
        setIsSaved(profileData.saved_tests.some((t) => t.id === data.id));
      } catch (error) {
        console.error("Error fetching test:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchResults = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}save-result/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchTest();
    fetchResults();
  }, [id]);

  const toggleSaveTest = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt");
      const response = await fetch(`${API_BASE_URL}save-content/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "test",
          id: test.id,
        }),
      });

      const result = await response.json();
      if (result.status === "saved") {
        setIsSaved(true);
      } else if (result.status === "removed") {
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Error saving test:", error);
    }
  };

  const getRandomImage = (): string => {
    const images = ["phonTest1", "phonTest2", "phonTest3", "phonTest4", "phonTest5"];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const randomPhon = getRandomImage();

  const navigateToTest = () => {
    console.log(`Navigating to test: ${test.id}`);
    router.navigate(`/test/testRun/${test.id}`);
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="flex justify-center items-center h-full"
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: test?.title || "TEST" }} />
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={image[randomPhon]}
          className="flex-1 w-full h-full"
          resizeMode="cover"
        >
          <ScrollView className="flex-1 p-5">
            <View className="p-4 mb-10 mx-0 mt-[25%]">
              <Text className="text-2xl font-ubuntu-bold text-orange-800">{test.title}</Text>
               {/* Кнопка ЗБЕРЕЖЕННЯ */}
           
              <View className="flex-row items-center mt-3">
                <Text className="text-lg text-orange-800 font-ubuntu-medium">CalMi</Text>
                <Image source={icon.tick} className="w-6 h-6 ml-2" />
                <View className="items-center ml-[60%] mb-5">
                    <TouchableOpacity
                        className="mt-1 py-1 px-4 rounded-lg items-end"
                        onPress={toggleSaveTest}
                      >
                        <Image
                          source={isSaved ? icon.likeTrue : icon.like}
                          className="w-8 h-8" // розмір іконки
                          resizeMode="contain"
                          tintColor='#9a3412'
                        />
                      </TouchableOpacity>
                    </View>
              </View>
              <Text className="text-sm font-ubuntu-regular mt-3 text-orange-700">{test.description}</Text>
            </View>

            {/* Кнопка Пройти тест */}
            <View className="mt-[10%] w-[80%] items-center ml-[10%]">
              <TouchableOpacity
                onPress={navigateToTest}
                className="bg-orange-50 p-5 rounded-2xl items-center border border-orange-900"
              >
                <Text className="text-base font-ubuntu-medium text-orange-900">Пройти тест</Text>
              </TouchableOpacity>
            </View>

            {/* Результати */}
            <View className="mt-10 mb-2">
              {results.length > 0 && (
                <View className="p-2 rounded-lg">
                  <Text className="text-xl font-ubuntu-bold text-orange-900">Ваші результати:</Text>
                  <View className="mt-3">
                    <ScrollView>
                      <View className="flex-row justify-between border-b border-orange-700 py-2">
                        <Text className="font-ubuntu-medium text-orange-800">Дата</Text>
                        <Text className="font-ubuntu-medium text-orange-800">Результат</Text>
                      </View>
                      {results.map((result, index) => (
                        <View key={index} className="flex-row justify-between border-b border-orange-700 py-2">
                          <Text className="text-orange-700">{formatDate(result.passed_at)}</Text>
                          <Text className="text-orange-700 w-1/2">{result.result_data}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
