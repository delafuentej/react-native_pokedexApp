/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import {  StyleSheet, View } from 'react-native';
import { Text , Button, ActivityIndicator } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { BgImg } from '../../components/ui/BgImg';
import { Pokemon } from '../../../domain/entities/pokemon';
import { FlatList } from 'react-native-gesture-handler';
import { globlaStyles } from '../../../config/theme/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';






export const HomeScreen = () => {

    const {top} = useSafeAreaInsets();

  const {isLoading, data: pokemons = []} = useQuery({
    
      queryKey: ['pokemons'],
      queryFn: ()=> getPokemons(1),
      staleTime: 1000 * 60 * 60, //60 minutes
  });
  return (
    <View  style={globlaStyles.globalMargin}>
      <BgImg style={styles.bgImgPosition}/>

      <FlatList 
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

        />
   
    </View>
  );
};
const styles = StyleSheet.create({
  bgImgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,


  }
})