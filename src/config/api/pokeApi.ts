/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from 'axios';

export const pokeApi = axios.create({
        baseURL: 'https://pokeapi.co/api/v2/',
});