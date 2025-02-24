import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

interface ArticleCardProps {
  id: number;
  link: string;
  color: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({id, link, color}) => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View
          className="w-full bg-white border rounded-lg shadow-lg p-4 mt-2"
          style={{ borderColor: color, borderWidth: 1 }}
        >
          <Text className="text-xl font-ubuntu-bold" style={{ color }}>
            Paper title
          </Text>
          <Text className="italic text-ubuntu-regular" style={{ color }}>
            Paper author
          </Text>
          <Text className="mt-2" style={{ color }}>
            Lorem ipsum dolor sit amet consectetur. Volutpat orci egestas
            ultricies tincidunt ultricies est tempus porta sed...
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ArticleCard;
