/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import {  StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import { BgImg } from '../../components/ui/BgImg';
import { Pokemon } from '../../../domain/entities/pokemon';
import { FlatList } from 'react-native-gesture-handler';
import { globlaStyles } from '../../../config/theme/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';


export const HomeScreen = () => {

    const {top} = useSafeAreaInsets();
    const queryClient = useQueryClient();

    // basic form http request:
  //   const {isLoading, data: pokemons = []} = useQuery({
  //     queryKey: ['pokemons'],
  //     queryFn: ()=> getPokemons(1),
  //     staleTime: 1000 * 60 * 60, //60 minutes
  // });


// with infinitscroll:
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
      queryKey: ['pokemons', 'infinite'],
      initialPageParam: 0,
      // http request: queryFn
      // queryFn: ( params )=> getPokemons(params.pageParam),
      queryFn: async( params )=> {
        const pokemons = await getPokemons(params.pageParam);

        pokemons.forEach( pokemon => {
            queryClient.setQueryData(['pokemon',pokemon.id], pokemon);
        });
        return pokemons;
      },
      getNextPageParam: (lastPage, pages) => pages.length,
      staleTime: 1000 * 60 * 60, //60 minutes
      // to cache update beforehand
      
  });
  return (
    <View  style={globlaStyles.globalMargin}>
      <BgImg style={styles.bgImgPosition}/>

      {/*  with infinite scroll */}
      <FlatList 
          data={data?.pages.flat() ?? []}
          keyExtractor={(pokemon : Pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          ListHeaderComponent={()=>(
            <Text variant="displayMedium">Pokedex</Text>
          )}

          style={{ paddingTop: top + 20}}
          onEndReachedThreshold={0.7}
          onEndReached ={() => fetchNextPage()}
          showsVerticalScrollIndicator= {false}
          renderItem= {({item})=>(
           <PokemonCard  pokemon={item} />
        )}

        />

      {/* <FlatList 
          data={pokemons}
          keyExtractor={(pokemon : Pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          ListHeaderComponent={()=>(
            <Text variant="displayMedium">Pokedex</Text>
          )}

          style={{ paddingTop: top + 20}}
          renderItem= {({item})=>(
           <PokemonCard  pokemon={item} />
        )}

        /> */}
   
    </View>
  );
};
const styles = StyleSheet.create({
  bgImgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,


  },
});