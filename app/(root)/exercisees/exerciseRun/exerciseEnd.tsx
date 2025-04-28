import image from '@/constants/image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';


const exerciseEnd = () => {
  const { id_ex, name } = useLocalSearchParams<{ id_ex: string; name: string }>();

  

  return (
    <>
     <SafeAreaView className="flex-1">
          <Stack.Screen options={{ title: `${name}` }} />
          <ImageBackground
            source={image.phonGreenExr}
            className="flex-1 w-full h-full items-center justify-center px-5"
            resizeMode="cover"
          >
            <Text className="text-2xl text-orange-900 font-ubuntu-medium mb-1">Ви завершили вправу</Text>
            <Text className="text-xl text-orange-900 font-ubuntu-italic mb-6">{name}</Text>

            {/* <Text className="text-base text-orange-900 font-ubuntu-medium text-center">{resultText}</Text> */}
    
            <TouchableOpacity
              className="mt-10 bg-orange-50 border border-orange-800 px-6 py-3 rounded"
              onPress={() => router.back()}
            >
              <Text className="text-orange-800">Зрозуміло!</Text>
            </TouchableOpacity>
          </ImageBackground>
        </SafeAreaView>
  </>
  )
}

export default exerciseEnd