import { Stack } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.1.3:2024/graphql',
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen
          name='(home)'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ApolloProvider>
  );
}
