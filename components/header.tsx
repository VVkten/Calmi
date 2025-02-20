import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import image from '@/constants/image';
import icon from '@/constants/icon';
import { Link } from 'expo-router';

const Header: React.FC = () => {
  return (
    <View className="flex-row justify-between items-center p-4">
      {/* Лого зліва */}
      <View className="w-40 h-40">
        <Image 
            source={image.logotextright} 
            className="w-full h-full object-contain rounded-lg"
        />
     </View>

      {/* Іконки справа */}
      <View className="w-40 h-40 rounded-lg overflow-hidden">
        <Link href="../settings/notification" className="mr-4">
          <Image
            source={icon.notification} // іконка сповіщень
            className="w-full h-full"
          />
        </Link>
       </View> 
       <View className='w-40 h-40 rounded-lg overflow-hidden'>
        <Link href="../settings/account" className="mr-4">
          <Image
            source={icon.account} // іконка акаунта
            className="w-full h-full"
          />
        </Link>
      </View>
    </View>
  );
};

export default Header;
