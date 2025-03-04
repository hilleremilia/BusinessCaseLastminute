import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { theme } from './config/theme.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from './navigation';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
