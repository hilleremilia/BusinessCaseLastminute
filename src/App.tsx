import * as React from 'react';
import { Navigation } from './navigation/intex.tsx';
import { PaperProvider } from 'react-native-paper';
import { theme } from './config/theme.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;
