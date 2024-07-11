/* eslint-disable jsx-quotes */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import { View } from 'react-native';
import { Text , Button, ActivityIndicator } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';






export const HomeScreen = () => {


  const {isLoading, data = []} = useQuery({
    
      queryKey: ['pokemons'],
      queryFn: ()=> getPokemons(1),
      staleTime: 1000 * 60 * 60, //60 minutes
  });
  return (
    <View>
        <Text>HomeScreen</Text>

        { (isLoading) ? (<ActivityIndicator />) : (
          <Button
          mode='contained'
          onPress={()=> console.log('pressed')}
        >Press Me
        </Button>
        )
        }
    </View>
  );
};
