import { AppState } from "../AppState.js"
import { Pokemon } from "../models/Pokemon.js"
import { Pop } from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class CaughtPokemonService {
    async catchPokemon() {
        const pokemon = AppState.activePokemon
        const res = await api.post('api/pokemon', pokemon)
        const newPokemon = new Pokemon(res.data)
        AppState.myPokemon.push(newPokemon)
        AppState.emit('myPokemon')
        Pop.success('Pokemon Caught!')
    }

    async getMyPokemon() {
        const res = await api.get('api/pokemon')
        const myCloudPokemon = res.data.map(pokemon => new Pokemon(pokemon))
        AppState.myPokemon = myCloudPokemon
        console.log(AppState.myPokemon);
        Pop.success('My Pokemon Loaded!')
    }

    setActivePokemon(pokemonId) {
        // @ts-ignore
        AppState.activePokemon = AppState.myPokemon.find(pokemon => pokemon.id == pokemonId)
    }

    async releasePokemon(pokemonId) {
        const res = await api.delete('api/pokemon/' + pokemonId)
        console.log(res);
        AppState.myPokemon = AppState.myPokemon.filter(pokemon => pokemon.id != pokemonId)
        Pop.success('Pokemon Released')
        console.log(AppState.myPokemon, pokemonId);
    }
}

export const caughtPokemonService = new CaughtPokemonService()