/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import {  View } from 'react-native';
import { globlaStyles } from '../../../config/theme/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import type{ Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { getPokemonsByNamesWithId } from '../../../actions/pokemons';

export const SearchScreen = () => {
  const {top } = useSafeAreaInsets();

  const {isLoading, data: pokemonsNamesList = []} = useQuery({
    queryKey: ['pokemonsName', 'all'],
    queryFn: () => getPokemonsByNamesWithId(),
  });
  console.log('pokemonsNamesList', pokemonsNamesList);

  return (
    <View style={[globlaStyles.globalMargin, { paddingTop: top + 10}]}>
        <TextInput 
          placeholder='Search Pokemon...'
          mode='flat'
          autoFocus
          autoCorrect={false}
          onChangeText = {(value)=> console.log(value)}
          value={''}
        />
        <ActivityIndicator style={{paddingTop: 20}} />

        <FlatList
          data={[] as Pokemon[]}
          keyExtractor={(pokemon : Pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          style={{ paddingTop: top + 20}}
          showsVerticalScrollIndicator= {false}
          renderItem= {({item})=>(
           <PokemonCard  pokemon={item} />
        )}

        />
    </View>
  );
};
