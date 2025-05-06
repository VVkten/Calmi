import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

interface ArticleCardProps {
  id: number;
  title: string;
  description: string;
  link: string;
  color: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, description, link, color }) => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View className="w-full bg-white border rounded-lg p-4 mt-2" style={{ borderColor: color, borderWidth: 1 }}>
          <Text className="text-xl font-ubuntu-bold" style={{ color }}>
            {title}
          </Text>
          <Text className="mt-2" style={{ color }}>
            {description.length > 100 ? `${description.slice(0, 100)}...` : description}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ArticleCard;
