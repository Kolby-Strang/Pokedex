import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import { caughtPokemonService } from "../services/CaughtPokemonService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

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
        caughtPokemonService.setActivePokemon(pokemonId)
        // @ts-ignore
        bootstrap.Offcanvas.getOrCreateInstance('#my-pokemon-canvas').hide()
    }

    async releasePokemon(pokemonId) {
        try {
            const yes = await Pop.confirm('Are you sure you want to delete this pokemon?')
            if (!yes) return
            await caughtPokemonService.releasePokemon(pokemonId)
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }
}

function _drawMyPokemon() {
    const pokemon = AppState.myPokemon
    let content = ''
    pokemon.forEach(p => content += p.listCard)
    setHTML('my-pokemon-container', content)
}