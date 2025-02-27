import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  email: string;
  name: string;
}

export const updateUserData = async (updatedData: User): Promise<User> => {
  try {
    const token = await AsyncStorage.getItem('jwt');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axiosInstance.put<User>('user/update/', updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Відправка токену у заголовках
      },
    });

    return response.data;  // Повертаємо оновлені дані користувача
  } catch (error) {
    console.error('Failed to update user data', error);
    throw error;
  }
};
