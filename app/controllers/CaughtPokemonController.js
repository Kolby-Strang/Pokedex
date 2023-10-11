import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import { caughtPokemonService } from "../services/CaughtPokemonService.js";
import { Pop } from "../utils/Pop.js";

export class CaughtPokemonController {
    constructor() {
        AppState.on('account', this.getMyPokemon)
        AppState.on('myPokemon', _drawMyPokemon)
    }


    async catchPokemon() {
        try {
            caughtPokemonService.catchPokemon()
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }

    async getMyPokemon() {
        try {
            await caughtPokemonService.getMyPokemon()
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }

    setActivePokemon(pokemonId) {
        // TODO Finish this
    }
}

function _drawMyPokemon() {
    const pokemon = AppState.myPokemon
    let content = ''
    pokemon.forEach(p => content += p.listCard)
}