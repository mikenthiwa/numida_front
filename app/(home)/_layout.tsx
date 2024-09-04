import React from 'react';
import { Stack } from 'expo-router';

const HomeLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
