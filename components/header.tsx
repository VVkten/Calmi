import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import image from '@/constants/image';
import icon from '@/constants/icon';
import { useRouter } from 'expo-router';

const Header: React.FC = () => {
  const router = useRouter();

  // Функція для переходу на сторінку акаунта
  const handleAccountPress = () => {
    router.push('/(root)/(settings)/account');
  };

  return (
    <View className="flex-row justify-between items-center p-4 w-full bg-transparent">
      {/* Лого зліва */}
      <View className="w-[125px] h-14">
        <Image 
          source={image.logotextright} 
          className="w-full h-full object-contain rounded-lg"
        />
      </View>

      {/* Іконки справа */}
      <View className="flex-row items-center">
        {/* Сповіщення */}
        {/* <View>
          <Link href="/(root)/(settings)/notification">
            <View className="w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center border border-primary-dark-200 mr-8">
              <Image
                source={icon.notification} 
                className="w-8 h-8"
              />
            </View>
          </Link>
        </View> */}

        {/* Акаунт */}
        <View>
          <TouchableOpacity onPress={handleAccountPress}>
            <View className=" w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center border border-primary-dark-200">
              <Image
                source={icon.account} 
                className="w-8 h-8"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
