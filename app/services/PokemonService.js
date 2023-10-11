import { AppState } from "../AppState.js";
import { Pokemon } from "../models/Pokemon.js";
import { pokeApi } from "./AxiosService.js"

class PokemonService {

    async getPokemon() {
        const res = await pokeApi.get('pokemon')
        AppState.pokePage = res.data
        console.log(AppState.pokePage);
    }

    async setActivePokemon(pokeUrl) {
        const res = await pokeApi.get(pokeUrl)
        AppState.activePokemon = new Pokemon(res.data)
    }
}

export const pokemonService = new PokemonService()