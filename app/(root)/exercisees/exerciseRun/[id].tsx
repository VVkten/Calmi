import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function ExerciseVideo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingLabel, setBreathingLabel] = useState("Начнем скоро...");

  const API_BASE_URL = "http://192.168.46.138:8080/api/exercise/";

  const circleSize = useSharedValue(250);
  const deformValue = useSharedValue(1);
  const colorValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorValue.value,
      [0, 1, 2],
      ["#9de3ff", "#009efa", "#a2cee1"]
    );

    return {
      width: circleSize.value * deformValue.value,
      height: circleSize.value,
      borderRadius: 999,
      backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    };
  });

  useEffect(() => {
    resetState();
    const fetchExercise = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setExercise(data);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  const resetState = () => {
    setCountdown(3);
    setIsBreathing(false);
    setBreathingLabel("Зараз почнемо...");
    circleSize.value = 250;
    deformValue.value = 1;
    colorValue.value = 0;
  };

  useEffect(() => {
    if (loading || !exercise) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      startBreathingAnimation();
    }
  }, [countdown, loading, exercise]);

  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  const startBreathingAnimation = async () => {
    const pattern = exercise?.breathing_pattern;
    if (!pattern) return;

    setIsBreathing(true);
    const cycles = Object.values(pattern);

    for (let i = 0; i < 2; i++) {
      for (const step of cycles) {
        const phases = Object.entries(step);
        for (const [phase, duration] of phases) {
          const seconds = parseInt(duration);
          const durationMs = seconds * 1000;

          if (phase.toLowerCase().includes("вдих")) {
            runOnJS(setBreathingLabel)("Вдихніть");
            colorValue.value = withTiming(0, { duration: durationMs });
            deformValue.value = withTiming(1.2, { duration: durationMs });
            circleSize.value = withTiming(300, { duration: durationMs });
          } else if (phase.toLowerCase().includes("видих")) {
            runOnJS(setBreathingLabel)("Видихніть");
            colorValue.value = withTiming(1, { duration: durationMs });
            deformValue.value = withTiming(0.9, { duration: durationMs });
            circleSize.value = withTiming(180, { duration: durationMs });
          } else {
            runOnJS(setBreathingLabel)("Зупиніться");
            colorValue.value = withTiming(2, { duration: durationMs });
            deformValue.value = withTiming(1, { duration: durationMs });
          }

          await wait(durationMs);
        }
      }
    }

    runOnJS(setIsBreathing)(false);
    runOnJS(setBreathingLabel)("Завершено 🧘");
    setTimeout(() => {
      router.push("/exercisees/exerciseRun/exerciseEnd");
    }, 2000);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
  }

  return (
    <>
      <Stack.Screen options={{ title: exercise?.name || "Дихання" }} />
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-4">
        {countdown > 0 ? (
          <Text className="text-9xl font-ubuntu-bold">{countdown}</Text>
        ) : (
          <>
            <Animated.View style={animatedStyle}>
              <Text className="text-lg font-semibold text-gray-800">
                {breathingLabel}
              </Text>
            </Animated.View>
            {!isBreathing && breathingLabel === "Завершено 🧘" && (
              <Text className="text-xl mt-6">Завершено 🧘</Text>
            )}
          </>
        )}
      </SafeAreaView>
    </>
  );
}
