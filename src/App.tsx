/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';

import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();



export const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeContextProvider>
        <StackNavigator />
    </ThemeContextProvider>
  </QueryClientProvider>
  );
};
