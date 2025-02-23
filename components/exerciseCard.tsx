import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

interface ExerciseCardProps {
  icon: any;
  title: string;
  link: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ icon, title, link }) => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View className="w-32 h-36 bg-white rounded-lg shadow-lg flex items-center justify-center p-2 border border-primary-dark-200">
          <Image source={icon} className="w-20 h-20 mb-2" />
          <Text className="text-primary-dark-200 font-ubuntu-medium">{title}</Text>
          <Text className="text-primary-dark-100 text-xs text-ubuntu-regular">exercise</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ExerciseCard;
