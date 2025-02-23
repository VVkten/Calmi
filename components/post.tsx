import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import image from '@/constants/image';
import icon from '@/constants/icon';
import { Link } from 'expo-router';

interface PostProps {
  user_id: number;
  post_id: number;
  link: string;
}

const Post: React.FC<PostProps> = ({ user_id, post_id, link })  => {
  return (
    <Link href={link} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View className="p-4 w-full mx-auto">
            {/* Користувач */}
            <View className="flex-row items-center mb-2">
                <Image source={image.user} className="w-10 h-10 rounded-full" />
                <Text className="text-base text-primary-dark-100 font-ubuntu-medium ml-3">{user_id}</Text>
            </View>
    
            {/* Заголовок поста */}
            <Text className="text-xl text-primary-dark-100 font-ubuntu-bold">Title post</Text>
    
            {/* Текст поста */}
            <Text className="text-sm text-primary-dark-100 mt-1">
            Lorem ipsum dolor sit amet consectetur. Adipiscing amet in risus tristique id.
            </Text>
    
            {/* Дія з постом */}
            <View className="flex-row items-center justify-between mt-4">
            {/* Лайки з обводкою */}
                <View className="flex-row items-center border border-primary-dark-200 px-4 py-1 rounded-full">
                  <TouchableOpacity>
                    <Image source={icon.like} className="w-7 h-7" style={{ tintColor: '#03528C' }} />
                  </TouchableOpacity>                  
                  
                  <Text className="text-sm font-ubuntu-regular text-primary-dark-200 mx-2">000</Text>
                
                  <TouchableOpacity>
                      <Image source={icon.unlike} className="w-7 h-7" style={{ tintColor: '#03528C' }} />
                  </TouchableOpacity>
              </View>
      
              {/* Коментарі */}
              <TouchableOpacity className="ml-3">
                <Image source={icon.comment} className="w-7 h-7" style={{ tintColor: '#03528C' }} />
              </TouchableOpacity>

              {/* Поділитися (з правого боку) */}
              <TouchableOpacity className="ml-auto">
                <Image source={icon.share} className="w-7 h-7" style={{ tintColor: '#03528C' }} />
              </TouchableOpacity>
            </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
  
  export default Post;
  
