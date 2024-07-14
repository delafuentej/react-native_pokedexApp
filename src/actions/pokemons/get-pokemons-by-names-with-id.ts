/* eslint-disable prettier/prettier */
import { pokeApi } from "../../config/api/pokeApi";
import { PokeAPIPaginatedResponse } from "../../infrastructure/interfaces/pokeApi.interfaces";



export const getPokemonsByNamesWithId = async() =>{

    try{
        const url = 'pokemon?limit=1000';
        const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    // to obtain fom data :pokemon id & pokemon name
    return data.results.map( (info)=> ({
        id: Number(info.url.split('/')[6]),
        name: info.name,
    }));
       
    }catch(error){
        console.log('error', error);
        throw new Error('Error getting pokemons By Names  with id');
    }

}