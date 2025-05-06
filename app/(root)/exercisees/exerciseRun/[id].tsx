import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Platform,
  Alert,
  Button,
  ImageBackground,
  TouchableOpacity, // Імпортуємо Alert для показу модального вікна
} from "react-native";
import { useLocalSearchParams, Stack, useRouter, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import image from "@/constants/image";
import API_BASE_URL from '@/settings';


const { width } = Dimensions.get("window");

export default function ExerciseVideo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingLabel, setBreathingLabel] = useState("Начнем скоро...");

  const circleSize = useSharedValue(250);
  const deformValue = useSharedValue(1);
  const colorValue = useSharedValue(0);

  const echoOpacity = useSharedValue(0);
  const echoScale = useSharedValue(1);
  const pausePulse = useSharedValue(1);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorValue.value,
      [0, 1, 2],
      ["#b9faed", "#4fcaff",  "#97d4f8"]
    );

    return {
      width: circleSize.value * deformValue.value * pausePulse.value,
      height: circleSize.value * pausePulse.value,
      borderRadius: 999,
      backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    };
  });

  const echoStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: circleSize.value * deformValue.value,
      height: circleSize.value,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.3)",
      transform: [{ scale: echoScale.value }],
      opacity: echoOpacity.value,
    };
  });

  useEffect(() => {
    resetState();
    const fetchExercise = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}exercise/${id}/`, {
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
    pausePulse.value = 1;
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

  const triggerEcho = (durationMs) => {
    echoOpacity.value = withTiming(1, { duration: 100 });
    echoScale.value = withTiming(2, { duration: durationMs });
    echoOpacity.value = withTiming(0, { duration: durationMs });
  };

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

          pausePulse.value = 1;

          if (phase.toLowerCase().includes("вдих")) {
            runOnJS(setBreathingLabel)("Вдихніть");
            colorValue.value = withTiming(0, { duration: durationMs });
            deformValue.value = withTiming(1.2, { duration: durationMs });
            circleSize.value = withTiming(300, { duration: durationMs });
            runOnJS(triggerEcho)(durationMs);
          } else if (phase.toLowerCase().includes("видих")) {
            runOnJS(setBreathingLabel)("Видихніть");
            colorValue.value = withTiming(1, { duration: durationMs });
            deformValue.value = withTiming(0.9, { duration: durationMs });
            circleSize.value = withTiming(180, { duration: durationMs });
            runOnJS(triggerEcho)(durationMs);
          } else {
            runOnJS(setBreathingLabel)("Зупиніться");
            colorValue.value = withTiming(2, { duration: durationMs });
            deformValue.value = withTiming(1, { duration: durationMs });
            pausePulse.value = withRepeat(
              withSequence(
                withTiming(1.03, { duration: 500 }),
                withTiming(1, { duration: 500 })
              ),
              -1,
              true
            );
          }

          await wait(durationMs);
          pausePulse.value = 1; // скидання після паузи
        }
      }
    }

    runOnJS(setIsBreathing)(false);
    runOnJS(setBreathingLabel)("Завершено");
    router.replace({
      pathname: "/exercisees/exerciseRun/exerciseEnd",
      params: {
        id_ex: id,
        name: exercise?.name,
      },
    });
  };

  // Функція для показу підтвердження дострокового завершення
  const handleAbortExercise = () => {
    Alert.alert(
      "Завершити вправу?",
      "Ви дійсно хочете припинити вправу?",
      [
        {
          text: "Ні",
          style: "cancel",
        },
        {
          text: "Так",
          onPress: () => {
            router.replace(`/exercisees/${exercise.id}`);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
  }

  return (
    <>
      <Stack.Screen options={{ title: exercise?.name || "Дихання" }} />
      
      <ImageBackground source={image.phonGreenExrPro} className="flex-1 w-full h-full" resizeMode="cover">
      <SafeAreaView className="flex-1  justify-center items-center px-4">
        {countdown > 0 ? (
          <Text className="text-9xl font-ubuntu-bold">{countdown}</Text>
        ) : (
          <>
            
            <View style={{ position: "absolute" }}>
              <Animated.View style={echoStyle} />
            </View>
            <Animated.View style={animatedStyle}>
              <Text className="text-2xl font-semibold text-gray-800">
                {breathingLabel}
              </Text>
            </Animated.View>
          </>
        )}
        <View className="mt-14">
           <TouchableOpacity onPress={handleAbortExercise}>
              <Text className="text-blue-900 p-3 rounded-lg border border-blue-900 text-center font-ubuntu-medium bg-blue-50">Завершити вправу</Text>
            </TouchableOpacity>
        </View>
     
      </SafeAreaView>
       </ImageBackground>
    </>
  );
}
