/* eslint-disable prettier/prettier */
import {pokeApi} from '../../config/api/pokeApi';
import type { Pokemon } from '../../domain/entities/pokemon';
import type {PokeAPIPokemon} from '../../infrastructure/interfaces/pokeApi.interfaces'
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';


export const getPokemonById = async( id: number) : Promise<Pokemon> => {

    try{

        const {data} = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);

        const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);

        return pokemon;


    }catch(error){
    console.log('error', error);
        throw new Error(`Error getting pokemon by Id:${id}`);
    }
}