import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

interface ArticleCardProps {
  id: number;
  link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({id, link}) => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View className="w-full bg-white border border-primary-dark-200 rounded-lg shadow-lg p-4 mt-2">
          <Text className="text-xl font-ubuntu-bold text-primary-dark-100">Paper title</Text>
          <Text className="italic text-ubuntu-regular text-primary-dark-100">Paper author</Text>
          <Text className="text-primary-dark-100 mt-2">
            Lorem ipsum dolor sit amet consectetur. Volutpat orci egestas ultricies tincidunt ultricies est tempus porta sed...
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ArticleCard;
