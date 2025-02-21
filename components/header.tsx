import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import image from '@/constants/image';
import icon from '@/constants/icon';
import { Link } from 'expo-router';

const Header: React.FC = () => {
  return (
    <View className="flex-row justify-between items-center p-4">
    {/* Лого зліва */}
    <View className="w-[125px] h-14">
      <Image 
        source={image.logotextright} 
        className="w-full h-full object-contain rounded-lg"
      />
    </View>

    {/* Іконки справа */}
    <View className="flex-row space-x-4">
      <Link href="../settings/notification">
        <View className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-transparent hover:border-blue-500 flex items-center justify-center">
          <Image
            source={icon.notification} 
            className="w-8 h-8"
          />
        </View>
      </Link>
      
      <Link href="../settings/account">
        <View className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center">
          <Image
            source={icon.account} 
            className="w-8 h-8"
          />
        </View>
      </Link>
    </View>
  </View>
  );
};

export default Header;
