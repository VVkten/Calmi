import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

interface TestProps {
  link: string;
  title: string;
  color: string;
}

const TestLink: React.FC<TestProps> = ({ title, link, color }) => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity onPress={() => { }} className="w-full h-24 mb-2 border rounded-lg" style={{ borderColor: color }}>
        <View className="flex justify-center items-center w-full h-full rounded-md" style={{ backgroundColor: color }}>
          <Text className="text-white text-lg font-ubuntu-bold">{title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TestLink;
