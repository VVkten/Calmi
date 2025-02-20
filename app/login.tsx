import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React from 'react';
import image from '@/constants/image';
import LinearGradient from 'react-native-linear-gradient';
import { Link } from 'expo-router';


const login = () => {
  // Приклад звізку з бекендом, запит на сервер
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert('Помилка', 'Будь ласка, введіть email та пароль');
  //     return;
  //   }

  //   try {
  //     const userData = await loginUser(email, password);
  //     Alert.alert('Успішний вхід', `Вітаємо, ${userData.username}!`);
  //     // Перенаправлення або збереження токену тут
  //   } catch (error) {
  //     Alert.alert('Помилка', error.message);
  //   }
  // };


  return (
    <View className="flex-1 justify-center items-center bg-blue-100">
      <ImageBackground 
        source={image.phonStandart} 
        className="flex-1 bg-cover justify-center items-center" 
        style={{ width: '100%', height: '100%' }}
      >
        <View className='flex-1 justify-center items-center'  style={{ top: -25 }}>
          {/* Лого */}
          <View className="items-center mb-6">
            <View className="w-40 h-40 rounded-lg justify-center items-center overflow-hidden"  style={{ top: -25 }}>
              <Image 
                source={image.iconplustext} 
                className="w-full h-full object-contain rounded-lg"
              />
            </View>
          </View>
      
          {/* Вхід */}
          <Text className="text-2xl font-ubuntu-medium text-primary-dark-100 mb-4"  style={{ top: -10 }}>Вхід</Text>
      
          {/* Поля вводу */}
          <TextInput 
            placeholder="Електрона пошта"
            className="font-ubuntu-medium w-[320px] bg-[#ffffff95] p-4 rounded-xl shadow-sm shadow-primary-dark-200 text-primary-dark-400 mb-3 border border-primary-dark-400 mx-auto"
            style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
          />
          <TextInput 
            placeholder="Пароль"
            secureTextEntry
            className="w-[320px] bg-[#ffffff95] p-4 rounded-xl shadow-sm shadow-primary-dark-200 text-primary-dark-400 mb-2 border border-primary-dark-400 font-ubuntu-medium mx-auto"
            style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
          />
      
          {/* Забули пароль (зліва) */}
          <Link href="/forgotpassword" className="text-sm text-primary-dark-200 ml-2 font-ubuntu-medium self-start">Forgot password?</Link>
      
          {/* Кнопка входу */}
          <TouchableOpacity className="w-[320px] bg-[#ffffffc6] border border-primary-dark-400 p-4 mt-4 rounded-xl shadow-md"
            style={{ zIndex: 10 }}>
            <Text className="text-center text-lg font-ubuntu-medium text-primary-dark-100">Увійти</Text>
          </TouchableOpacity>
      
          {/* Реєстрація (внизу екрану) */}
          <Text className="text-sm font-ubuntu-medium text-primary-dark-200 absolute bottom-6"
            style={{ zIndex: 1 }} >
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary-dark-400 font-ubuntu-medium">Sign Up</Link>
          </Text>

        </View>
        
    </ImageBackground>
  </View>
  
  );
}

export default login;
