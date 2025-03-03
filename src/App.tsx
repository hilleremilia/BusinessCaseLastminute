import * as React from 'react';
import { Navigation } from './navigation/intex.tsx';
import { PaperProvider } from 'react-native-paper';
import { theme } from './config/theme.ts';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
};

export default App;
