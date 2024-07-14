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
import { getPokemonsByIds, getPokemonsByNamesWithId } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';

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

   // to consum the id list from pokemonByNameWithIdList and to call the action getPokemonsByIds
   const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonByNameWithIdList],
    queryFn: ()=> getPokemonsByIds(pokemonByNameWithIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5,

   });

  if(isLoading) return <FullScreenLoader />;

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
         {/* <Text>{JSON.stringify(pokemonByNameWithIdList, null, 2)}</Text> */}

        {
           (isLoadingPokemons) &&
           ( <ActivityIndicator style={{ paddingTop: top + 10}} />)
        }

       
   

        <FlatList
          data={pokemons}
          keyExtractor={(pokemon : Pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          style={{ paddingTop: top + 20}}
          showsVerticalScrollIndicator= {false}
          renderItem= {({item})=>(
           <PokemonCard  pokemon={item} />
        )}
        //to be able to scroll down
          ListFooterComponent={ <View style={{height: 120}} />}

        />
    </View>
  );
};
