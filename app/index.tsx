import { Link } from "expo-router";
import { Text, View, TouchableOpacity, ImageBackground, Image } from "react-native";

import image from "@/constants/image";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      {/* Фонове зображення */}
      <ImageBackground 
        source={image.phonStandart} 
        className="flex-1 bg-cover justify-center items-center" 
        style={{ width: '100%', height: '100%' }}
      >
        {/* Текст і зображення супержінки поверх фону */}
        <View className="absolute bottom-105 w-full items-center px-6">
          {/* Супержінка */}
          <Image source={image.superwomen} className="w-96 h-96 rounded-xl mb-6" />

          {/* Текст */}
          <Text className="text-xl font-ubuntu-medium text-primary-dark-100 text-center px-8 mt-6">
            Ласкаво просимо до CalMi
          </Text>
          <Text className="text-sm font-ubuntu-medium text-primary-dark-100 text-center px-8 mt-2">
            Увійдіть, щоб відчути підтримку і знайти внутрішню силу
          </Text>


          {/* Кнопка переходу з обводкою та заливкою */}
          <TouchableOpacity className=" w-[180px] bg-blue-100 border border-primary-dark-400 px-8 py-3 rounded-2xl mt-20 shadow-sm shadow-primary-dark-200">
            <Link href="../login" className="text-center text-primary-dark-200 text-lg font-ubuntu-medium px-8">
              Увійти
            </Link>
          </TouchableOpacity>

          {/* <Link href="/(root)/(tabs)/home" className="text-blue-700 font-ubuntu-bold mt-4">Home Screen</Link> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}




// import { Link } from "expo-router";
// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View className="flex-1 items-center justify-center">
//       <Text>Bla bla bla</Text>
//       <Link href='/(root)/(tabs)/home'>Home</Link>
//     </View>
//   );
// }
