/* eslint-disable prettier/prettier */
import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";



// export const loadingDelay = async() => {
//     return new Promise(resolve => setTimeout(resolve, 2000));
// };

export const getPokemons = async(): Promise<Pokemon[]>=> {

        // await loadingDelay();
    try{
        const url = '/pokemon';
        const {data} = await pokeApi.get(url);
        console.log('data', data);

        return [];
    }catch(error){
        throw new Error('Error getting pokemons')
    }
}