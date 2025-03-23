import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Деталі вправи {id}</Text>
    </View>
  );
}
