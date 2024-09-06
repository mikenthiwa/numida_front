import { Stack } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_GRAPHQL_URL,
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
