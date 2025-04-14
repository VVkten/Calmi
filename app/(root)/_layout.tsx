import React, { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://192.168.46.138:8080/api/";

export default function AppLayout() {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        console.log('Токен з AsyncStorage:', token);

        if (token) {
          // Перевірка токена через API
          const response = await axios.get(`${API_BASE_URL}user/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setIsLogged(true);
          } else {
            setIsLogged(false);
          }
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        console.log("Failed to read token:", error);
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isLogged && segments[0] !== "hello") {
        router.replace("/hello");
      } else if (isLogged && segments[0] === "hello") {
        router.replace("/");
      }
    }
  }, [loading, isLogged, segments]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size="large" color="#6B21A8" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
