/* eslint-disable prettier/prettier */

import type{ Pokemon } from "../../domain/entities/pokemon";
import { getPokemonById } from "./get-pokemon";



export const getPokemonsByIds = async(ids: number[]): Promise<Pokemon[]> =>{
    try{
        const pokemonPromises: Promise<Pokemon>[] = ids.map( id => {
            return getPokemonById(id);
        });

      return Promise.all(pokemonPromises);

    }catch(error){
        console.log('error', error);
        throw new Error(`Error getting pokemon By  Ids: ${ids}`);
    }


   
};