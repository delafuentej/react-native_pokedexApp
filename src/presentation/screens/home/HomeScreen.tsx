/* eslint-disable jsx-quotes */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import { View } from 'react-native';
import { Text , Button } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
// import Icon from 'react-native-vector-icons/Ionicons';





export const HomeScreen = () => {

  return (
    <View>
        <Text>HomeScreen</Text>
        <Button
          // icon={() => (<Icon name= 'camera-outline' size={25} color='green' />)}
          mode='contained'
          onPress={()=> console.log('pressed')}
        >Press Me
        </Button>
      
        
    </View>
  );
};
