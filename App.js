import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation/Navigation';
import {colors} from './src/services/constant';

function App() {
  return (
    <SafeAreaProvider style={{backgroundColor: colors.PRIMARY}}>
      <Navigation />
    </SafeAreaProvider>
  );
}
export default App;
