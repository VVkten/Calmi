import { View, Text, Image, ActivityIndicator, ImageBackground, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import image from '@/constants/image';
import icon from '@/constants/icon';
import API_BASE_URL from '@/settings';

interface UserData {
  name: string;
  email: string;
  photo?: string;
}

const DEFAULT_AVATAR = icon.user2;

const Account: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [lastTestResult, setLastTestResult] = useState<any | null>(null);  // Додано для зберігання результату тесту
  const router = useRouter();
  const [testDetails, setTestDetails] = useState<any | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      if (!lastTestResult?.test) return;
  
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}tests/${lastTestResult.test}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Не вдалося отримати дані тесту");
        }
  
        const data = await response.json();
        setTestDetails(data);
      } catch (error) {
        console.error("Помилка при завантаженні тесту:", error);
      }
    };
  
    fetchTest();
  }, [lastTestResult]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (!token) {
          console.log('Токен не знайдено');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}user/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Не вдалося отримати дані користувача');
        }

        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchLastTestResult = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (!token) {
          console.log('Токен не знайдено');
          return;
        }

        const response = await fetch(`${API_BASE_URL}last_test_result/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Не вдалося отримати останній результат тесту');
        }

        const data = await response.json();
        setLastTestResult(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLastTestResult();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwt');
      setUserData(null);
      router.replace('/hello');
    } catch (error) {
      console.log('Помилка при виході:', error);
      router.replace('/hello');
    }
  };

  const openModal = (text: string) => {
    setModalText(text);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-blue-100">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-lg font-semibold text-gray-700 mt-4">Завантаження...</Text>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-blue-100">
        <Text className="text-lg font-semibold text-red-500">Помилка при завантаженні даних</Text>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);  // Створюємо об'єкт Date з ISO рядка
    return date.toLocaleDateString("uk-UA", {
      // year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={image.blueDot}
        className="flex-1 w-full h-full items-center p-5"
        resizeMode="cover"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <View className="flex-1 m-0">
            <View className="flex-row items-center mt-5">
              <Image
                source={userData.photo ? { uri: `http://192.168.221.138:8080${userData.photo}` } : DEFAULT_AVATAR}
                className="w-36 h-36"
                style={{ objectFit: 'contain' }}
              />
              <View className="ml-4">
                <Text className="text-xl font-ubuntu-regular text-primary-dark-100">{userData.name}</Text>
                <Text className="text-lg font-ubuntu-regular text-primary-dark-200">{userData.email}</Text>
              </View>
            </View>

            <View className="mt-[5%] w-full">

              {/* Інші кнопки */}
              <TouchableOpacity onPress={() => router.push('/myinf')} className="flex-row justify-between items-center py-3 border-b border-blue-950/50">
                <Text className="text-lg text-blue-950/80">Моя інформація</Text>
                <Image source={icon.userC} className="w-8 h-8 mb-[-3%]" tintColor="#03528C" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/forgotpassword')} className="flex-row justify-between items-center py-3 border-b border-blue-950/50">
                <Text className="text-lg text-blue-950/80">Змінити пароль</Text>
                <Image source={icon.key} className="w-8 h-8 mb-[-3%]" tintColor="#03528C" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogout} className="flex-row justify-between items-center py-3 border-b border-blue-950/50">
                <Text className="text-lg text-blue-950/80">Вийти з акаунту</Text>
                <Image source={icon.logi} className="w-8 h-8 mb-[-3%]" tintColor="#03528C" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/dellacc')} className="flex-row justify-between items-center py-3 border-b border-blue-950/50">
                <Text className="text-lg text-blue-950/80">Видалити акаунт</Text>
                <Image source={icon.deletea} className="w-8 h-8 ml-40 mb-[-3%]" tintColor="#03528C" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openModal('Для отримання додаткової інформації про нашу послугу можна звернутися за номером +380 12 345 67 90')} className="flex-row justify-between items-center py-3 border-b border-blue-950/50">
                <Text className="text-lg text-blue-950/80">Підтримка спільноти</Text>
                <Image source={icon.comment} className="w-8 h-8 ml-36 mb-[-3%]" tintColor="#03528C" />
              </TouchableOpacity>

                {/* Existing buttons */}
  
              <TouchableOpacity onPress={() => router.push('/(root)/(settings)/savedArticles')} className="flex-row justify-between items-center py-3 border-b border-blue-950/50">
                <Text className="text-lg text-blue-950/80">Збережені статті</Text>
                <Image source={icon.article} className="w-8 h-8 mb-[-3%]" tintColor="#03528C" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/(root)/(settings)/savedExercises')} className="flex-row justify-between items-center py-3 border-b border-blue-950/50">
                <Text className="text-lg text-blue-950/80">Збережені вправи</Text>
                <Image source={icon.exercise} className="w-8 h-8 mb-[-3%]" tintColor="#03528C" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/(root)/(settings)/savedTests')} className="flex-row justify-between items-center py-3 border-b border-blue-950/50">
                <Text className="text-lg text-blue-950/80">Збережені тести</Text>
                <Image source={icon.test} className="w-8 h-8 mb-[-3%]" tintColor="#03528C" />
              </TouchableOpacity>

            </View>
             {/* Додавання секції для останнього результату тесту */}
             {/* {lastTestResult && (
                <View className="py-3">
                  <Text className="text-lg text-blue-950/80">Останній результат тесту:</Text>
                  <Text className="text-lg text-blue-950/80">{lastTestResult.result_data}</Text>
                  <Text className="text-lg text-blue-950/80">Тест ID: {lastTestResult.test}</Text>
                </View>
              )} */}
              {lastTestResult && (
                <View className="py-3">
                  <Text className="text-lg font-ubuntu-bold text-blue-900">Останній пройдений тест:</Text>
                  {testDetails && (
                  <TouchableOpacity onPress={() => router.push(`/test/${testDetails.id}`)}>
                  <View className='flex-row items-center mt-1'>
                    <View>
                      <Text className="text-base mr-2 text-blue-900 font-ubuntu-medium mt-1">
                        {testDetails.title}
                      </Text>
            
                    <Text className='font-ubuntu-mediumitalic mr-6 text-sm text-blue-900'>{formatDate(lastTestResult.passed_at)}</Text>
                    </View>
                    
                    <View className='w-[45%]'>
                      <Text className="text-base text-blue-900">
                            {lastTestResult.result_data.slice(0, 35)}...
                          </Text>                    
                        </View>

                  </View> 
                  </TouchableOpacity>     )}                
                
                </View> 
              )}

            <View className="w-full h-6 ml-[2%] mb-0 flex-row justify-center items-center">
              <Link href="/faq" className="text-primary-dark-200 text-sm mx-2">FAQ</Link>
              <Text className="text-gray-700 text-sm">|</Text>
              <Link href="/support" className="text-primary-dark-200 text-sm mx-2">Правила використання</Link>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 justify-end">
            <View className="bg-blue-50 p-5 border border-blue-900 rounded-t-2xl min-h-[30%] max-h-[50%]">
              <Text className="text-lg mt-6 font-bold text-blue-900">{modalText}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default Account;
