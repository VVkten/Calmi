import React, { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        setIsLogged(!!token);
      } catch (error) {
        console.error("Failed to read token:", error);
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

  return <Slot />;
}
