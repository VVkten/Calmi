import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import API_BASE_URL from '@/settings';

interface ExerciseCardProps {
  color: string;
  title: string;
  link: string;
  icon: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ icon, color, title, link }) => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View
          className="w-44 h-52 bg-white rounded-lg flex items-center justify-center p-2"
          style={{ borderWidth: 1, borderColor: color }}
        >
          <Image source={{ uri: `http://192.168.221.138:8080${icon}` }} className="w-20 h-20 mb-2" />
          <Text
            className="text-center text-base font-ubuntu-medium"
            style={{ color }}
          >
            {title}
          </Text>
          <Text
            className="text-xs font-ubuntu-regular"
            style={{ color }}
          >
            exercise
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ExerciseCard;
