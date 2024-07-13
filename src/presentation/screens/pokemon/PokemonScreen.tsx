/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { getPokemonById } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{}

export const PokemonScreen = ({navigation, route}:Props) => {

  const {pokemonId} = route.params;

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60, //1 hour
  });
  
  return (
    <View>
        <Text>{pokemon?.name}</Text>
    </View>
  );
};
