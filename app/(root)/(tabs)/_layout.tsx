import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import Header from "../../../components/header";
import icons from "@/constants/icon";
import { SafeAreaView } from "react-native-safe-area-context";

const TabIcon = ({
  focused,
  icon,
//   title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
//   title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0095ff" : "#03528C"}
      resizeMode="contain"
      className="size-9"
    />
  </View>
);

const TabsLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-transparent" style={{ backgroundColor: 'transparent' }}>
      {/* Додаємо Header перед вкладками */}
      <Tabs
      screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white", 
            position: "absolute",
            borderTopColor: "#0061FF1A",
            borderTopWidth: 1,
            minHeight: 70,
            borderRadius: 20, 
            marginHorizontal: 15, 
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          //   elevation: 5, // Тінь для Android
            borderWidth: 1, // Товщина обводки
            borderColor: "rgba(0, 97, 255, 0.3)", // Обводка з легким синім відтінком
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} />
            ),
          }}
        />
        <Tabs.Screen
          name="exercise"
          options={{
            title: "exercise",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.exr} />
            ),
          }}
        />
        <Tabs.Screen
          name="book"
          options={{
            title: "book",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.book} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="tests"
          options={{
            title: "tests",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.tests} />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="help"
          options={{
            title: "help",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.siren} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;