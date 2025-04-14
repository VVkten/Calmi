import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import image from '@/constants/image';


const API_BACK = 'http://192.168.46.138:8080/api/';


interface SendCodeResponse {
  success: boolean;
  code?: string;
  message?: string;
}

interface VerifyCodeResponse {
  success: boolean;
  message?: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}

const sendCode = async (email: string): Promise<SendCodeResponse> => {
  try {
    const response = await fetch(`${API_BACK}send-code/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Помилка на сервері при надсиланні коду: ${errorText}`);
    }

    const data = await response.json();

    if (data.success) {
      return { success: true, code: data.code };
    } else {
      throw new Error(data.message || 'Невідома помилка при надсиланні коду');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка відправки коду:', error.message);
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'Невідома помилка' };
    }
  }
};

const verifyCode = async ( email: string, code: string, setToken: (token: string) => void): Promise<VerifyCodeResponse> => {
  try {
    const response = await fetch(`${API_BACK}verify-code/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Помилка на сервері при перевірці коду: ${errorText}`);
    }

    const data = await response.json();

    if (data.success) {
      setToken(data.token); 
      return { success: true };
    } else {
      throw new Error(data.message || 'Невірний код');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка перевірки коду:', error.message);
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'Невідома помилка' };
    }
  }
};

const resetPassword = async (email: string, newPassword: string, token: string): Promise<ResetPasswordResponse> => {
  try {
    const response = await fetch(`${API_BACK}reset-password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email, new_password: newPassword }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Помилка на сервері при скиданні пароля: ${errorText}`);
    }

    const data = await response.json();

    if (data.success) {
      return { success: true };
    } else {
      throw new Error(data.message || 'Невідома помилка при скиданні пароля');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка скидання пароля:', error.message);
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'Невідома помилка' };
    }
  }
};

const ResetPasswordForm: React.FC = () => {
  const [step, setStep] = useState(1); // Кроки: 1 - email, 2 - code, 3 - new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendCode = async () => {
    setErrorMessage(''); // Скидаємо попереднє повідомлення про помилки

    const sendCodeResult = await sendCode(email);

    if (!sendCodeResult.success) {
      setErrorMessage(sendCodeResult.message || 'Помилка при відправленні коду');
    } else {
      setStep(2); // Переходимо до етапу введення коду
    }
  };

  const handleVerifyCode = async () => {
    setErrorMessage(''); // Скидаємо попереднє повідомлення про помилки

    const verifyCodeResult = await verifyCode(email, code, setToken);

    if (!verifyCodeResult.success) {
      setErrorMessage(verifyCodeResult.message || 'Невірний код');
    } else {
      setStep(3); // Переходимо до етапу введення нового пароля
    }
  };

  const handleResetPassword = async () => {
    setErrorMessage(''); // Скидаємо попереднє повідомлення про помилки

    if (newPassword !== confirmPassword) {
      setErrorMessage('Паролі не співпадають');
      return;
    }

    const resetPasswordResult = await resetPassword(email, newPassword, token);

    if (!resetPasswordResult.success) {
      setErrorMessage(resetPasswordResult.message || 'Помилка при скиданні пароля');
    } else {
      alert('Пароль успішно змінено!');
      router.push('/login');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-blue-100">
      <ImageBackground 
        source={image.phonGreen} 
        className="flex-1 bg-cover justify-center items-center" 
        style={{ width: '100%', height: '100%' }}
      >
        <Text className="text-2xl font-ubuntu-medium text-green-900 mb-4" style={{ top: -30 }}>
          Відновлення паролю
        </Text>

        {step === 1 && (
          <View className="mb-10">
            <Text className="text-green-900 font-ubuntu-medium mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Введіть ваш email"
              className="w-[320px] bg-[#ffffff95] p-4 rounded-2xl shadow-sm border border-green-700 mx-auto"
              style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
            />
            <TouchableOpacity 
              onPress={handleSendCode} 
              className="w-[200px] ml-[15%] bg-[#ffffffc6] border border-green-600 p-4 mt-4 rounded-xl shadow-md shadow-green-800"
            >
              <Text className="text-center text-lg font-ubuntu-medium text-green-900">Надіслати код</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View className="mb-10">
            <Text className="text-green-900 font-ubuntu-medium mb-1">Код</Text>
            <TextInput
              value={code}
              onChangeText={(text) => setCode(text)}
              placeholder="Введіть код"
              className="w-[320px] bg-[#ffffff95] p-4 rounded-2xl shadow-sm border border-green-700 mx-auto"
              style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
            />
            <TouchableOpacity 
              onPress={handleVerifyCode} 
              className="w-[200px]  ml-[15%] bg-[#ffffffc6] border border-green-600 p-4 mt-4 rounded-xl shadow-md shadow-green-800"
            >
              <Text className="text-center text-lg font-ubuntu-medium text-green-900">Перевірити код</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View className="mb-10">
            <Text className="text-green-900 font-ubuntu-medium mb-1">Новий пароль</Text>
            <TextInput 
              placeholder="Введіть новий пароль"
              secureTextEntry
              className="w-[320px] bg-[#ffffff95] p-4 rounded-2xl shadow-sm border border-green-700 mx-auto"
              style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <Text className="w-[320px] font-ubuntu-italic text-xs text-green-800 mt-2">
              Пароль повинен містити не менше 8 символів, включаючи число та спеціальний символ.
            </Text>

            <Text className="text-green-900 font-ubuntu-medium mb-1 mt-4">Підтвердіть пароль</Text>
            <TextInput
              placeholder="Підтвердіть пароль"
              secureTextEntry
              className="w-[320px] bg-[#ffffff95] p-4 rounded-2xl shadow-sm border border-green-700 mx-auto"
              style={{ paddingLeft: 15, paddingRight: 15, fontFamily: 'Ubuntu-Medium' }}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <Text className="w-[320px] font-ubuntu-italic text-xs text-green-800 mt-2">
              Паролі повинні співпадати
            </Text>

            <TouchableOpacity 
              onPress={handleResetPassword} 
              className="w-[200px]  ml-[15%] bg-[#ffffffc6] border border-green-600 p-4 mt-4 rounded-xl shadow-md shadow-green-800"
            >
              <Text className="text-center text-lg font-ubuntu-medium text-green-900">Змінити пароль</Text>
            </TouchableOpacity>
          </View>
        )}

        {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}

        <Link href="/login" className="text-green-800 font-ubuntu-medium mt-4 shadow-md shadow-green-500">
          Скасувати
        </Link>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ResetPasswordForm;