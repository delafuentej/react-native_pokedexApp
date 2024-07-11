/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';

import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';

export const App = () => {
  return (
   <ThemeContextProvider>
       <StackNavigator />
   </ThemeContextProvider>

  );
};
