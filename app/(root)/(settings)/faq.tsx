import { Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '@/constants/image';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    {
      question: 'Що робити, якщо я відчуваю тривогу або розгубленість?',
      answer: 'Ви не самі. Зверніться до розділу "Підтримка спільноти" або напишіть нам — ми тут, щоб допомогти.',
    },
    {
      question: 'Чи мої дані залишаються конфіденційними?',
      answer: 'Так, ми гарантуємо анонімність. Ваші емоції, відповіді й активність — лише для вас.',
    },
    {
      question: 'Що робити, якщо я втомився від додатку?',
      answer: 'Зробіть паузу. Ми завжди будемо тут, коли будете готові повернутись.',
    },
    {
      question: 'Що робити, якщо мене щось тригернуло у додатку?',
      answer: 'Ми шкодуємо, що це сталося. Ви можете зробити паузу, перейти до спокійного розділу або звернутись у підтримку.',
    },
    {
        question: 'Для кого створений цей простір?',
        answer: 'Для всіх. Особливо для тих, хто хоче бути почутим, навіть у тиші.',
    },
    {
        question: 'Що робити, якщо я хочу поговорити з кимось наживо?',
        answer: 'Наразі ми не надаємо пряму комунікацію, але ви завжди можете звернутись до фахівців яких ми рекомендуємо. Ми можемо порекомендувати перевірені нами ресурси',
      },
  ];

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
   <SafeAreaView className="flex-1">
     <ImageBackground source={image.phonBlueW} className="flex-1 w-full h-full items-center justify-center px-6" resizeMode="cover">
           
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold text-blue-900 mb-10 mt-6 text-center">
          Часті питання про взаємодію і підтримку
        </Text>

        {questions.map((item, index) => (
          <View key={index} className="mb-4 mt-3 border-b border-blue-300 pb-3">
            <TouchableOpacity onPress={() => toggle(index)} className="flex-row justify-between items-center">
              <Text className="text-blue-900 text-lg font-ubuntu-regular flex-1">{item.question}</Text>
              <Text className="text-blue-900 font-ubuntu-bolt text-xl">{openIndex === index ? '−' : '+'}</Text>
            </TouchableOpacity>

            {openIndex === index && (
              <Text className="text-blue-900 text-base mt-2">{item.answer}</Text>
            )}
          </View>
        ))}
        <View>
            <Text className='text-base mt-6 font-ubuntu-medium text-center text-blue-900'>Якщо у Вас залишилися якісь питання, ви можете звернутись до нашої підтримки.</Text>
        </View>
      </ScrollView>
     </ImageBackground>
    </SafeAreaView>
  );
}
