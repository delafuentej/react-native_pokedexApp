/* eslint-disable jsx-quotes */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import { StyleSheet, View } from 'react-native';
import { Text , Button, ActivityIndicator } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { BgImg } from '../../components/ui/BgImg';






export const HomeScreen = () => {


  const {isLoading, data = []} = useQuery({
    
      queryKey: ['pokemons'],
      queryFn: ()=> getPokemons(1),
      staleTime: 1000 * 60 * 60, //60 minutes
  });
  return (
    <View style={styles.bgImgPosition}>
      <BgImg />
   
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