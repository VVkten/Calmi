import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResponse {
  jwt: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

// Функція для логіну
export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('login/', { email, password });
    const token = response.data.jwt;

    // Зберігаємо токен в AsyncStorage
    await AsyncStorage.setItem('jwt', token);

    return token;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

// Функція для реєстрації
export const register = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>('register/', { email, password });
    return response.data;
  } catch (error) {
    console.error('Registration failed', error);
    throw error;
  }
};

// Функція для отримання даних користувача
export const getUserData = async (): Promise<User> => {
  try {
    // Отримуємо токен з AsyncStorage
    const token = await AsyncStorage.getItem('jwt');

    if (!token) {
      throw new Error('No token found');
    }

    // Використовуємо токен для запиту до API
    const response = await axiosInstance.get<User>('user/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data', error);
    throw error;
  }
};

// Функція для logout
export const logout = async (): Promise<void> => {
  try {
    // Видаляємо JWT токен з AsyncStorage
    await AsyncStorage.removeItem('jwt');
    console.log('Logout successful');
  } catch (error) {
    console.error('Failed to log out', error);
    throw error;
  }
};
