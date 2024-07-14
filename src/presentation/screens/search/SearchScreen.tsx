/* eslint-disable no-trailing-spaces */
/* eslint-disable curly */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import {  View } from 'react-native';
import { globlaStyles } from '../../../config/theme/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import type{ Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { getPokemonsByNamesWithId } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export const SearchScreen = () => {

  const {top } = useSafeAreaInsets();
  const [term, setTerm] = useState('');

  const {isLoading, data: pokemonsNamesList = []} = useQuery({
    queryKey: ['pokemonsName', 'all'],
    queryFn: () => getPokemonsByNamesWithId(),
  });
  console.log('pokemonsNamesList', pokemonsNamesList);
  
  //useMemo => to memorize the list processing
  const pokemonByNameWithIdList = useMemo(()=>{
      // when it is a number
      if( !isNaN(Number(term))){
        const pokemon = pokemonsNamesList.find( pokemon => pokemon.id === Number(term));
        return pokemon ? [pokemon] : [];
      }
      if(term.length <= 3) return [];

      return pokemonsNamesList.filter( pokemon => 
        pokemon.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
      );
      
  }, [term]);

  return (
    <View style={[globlaStyles.globalMargin, { paddingTop: top + 10}]}>
        <TextInput
          placeholder='Search Pokemon...'
          mode='flat'
          autoFocus
          autoCorrect={false}
          onChangeText = {(value)=> setTerm(value)}
          value={term}
        />
        <ActivityIndicator style={{ paddingTop: top + 10}} />

        <Text>{JSON.stringify(pokemonByNameWithIdList, null, 2)}</Text>

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
