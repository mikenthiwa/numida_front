import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';

const HomeLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='apply-loan/index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
