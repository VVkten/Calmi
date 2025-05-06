import { Link } from "expo-router";
import { Text, View, TouchableOpacity, ImageBackground, Image, ScrollView } from "react-native";

import image from "@/constants/image";
import { SafeAreaView } from "react-native-safe-area-context";
import icon from "@/constants/icon";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      {/* Фонове зображення */}
      <ImageBackground 
        source={image.phonNiseBlue} 
        className="flex-1 bg-cover" 
        style={{ width: '100%', height: '100%' }}
      >
        <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        >
               
        {/* Текст і зображення супержінки поверх фону */}
        <View className="w-full px-6 mt-12">
          <Text className="text-2xl font-ubuntu-medium text-primary-dark-100 text-left p-2">
            Ласкаво просимо до CalMi
          </Text>
          
          <Text className="text-xl mt-3 font-ubuntu-medium text-left text-blue-950 p-2">Ми ще не знайомі ближче, але це неважливо.</Text>
          
          <Text className="text-base mt-3 w-full font-ubuntu-medium text-left text-blue-950 p-2 m-0">Якщо ти зараз у скруті — не залишайся наодинці.</Text>

          <View className="flex-row items-start px-4 py-2">
            <Image source={icon.phone} tintColor="#172554" className="w-7 h-7 rounded-xl mr-5 mt-1" />
            <View>
              <Text className="text-lg font-ubuntu-italic text-blue-950">Зателефонуй нам:</Text>
              <Text className="text-lg font-ubuntu-bold text-blue-950 mt-1 mx-10">
                0 800 XXX XXX{"\n"}0 800 XXX XXX{"\n"}0 800 XXX XXX
              </Text>
            </View>
          </View>

          <View className="flex-row items-start px-4 py-2">
            <Image source={icon.mess} tintColor="#172554" className="w-7 h-7 rounded-xl mr-5 mt-1" />
            <View>
              <Text className="text-lg font-ubuntu-italic text-blue-950">Напиши нам:</Text>
              <Text className="text-base font-ubuntu-bold text-blue-950 mt-1 mx-10">
                calmiHeakth@gmail.com{"\n"}tg: @calmihealth
              </Text>
            </View>
          </View>

          <Text className="text-sm font-ubuntu-medium text-primary-dark-100 p-2 mt-2">А поки — просто зроби вдих. Глибокий. І повільний видих. Ще раз. І ще.</Text>

          <Text className="text-base font-ubuntu-medium text-primary-dark-100 text-center px-2 mt-6">
            Знай що ми поруч. Навіть якщо поки що тільки за екраном.</Text>

          {/* <View className="items-center">
            <Image source={image.sociali} className="w-72 h-72 rounded-xl" />
          </View> */}

          <View className="flex-row items-center justify-center mt-32">
            <Text className="text-lg font-ubuntu-medium text-primary-dark-100">
              Маєш акаунт?
            </Text>
            <Link
              href="../login"
              className="text-blue-800 text-start text-base font-ubuntu-medium ml-2"
            >
              Увійти
            </Link>
          </View>

          <View className="flex-row items-center justify-center">
            <Text className="text-lg font-ubuntu-medium text-primary-dark-100">
            Новий тут?
            </Text>
            <Link
              href="../signup"
              className="text-blue-800 text-base font-ubuntu-medium ml-2"
            >
              Зареєструватися
            </Link>
          </View>
        </View>
          </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}