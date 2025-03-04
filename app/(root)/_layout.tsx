import { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
