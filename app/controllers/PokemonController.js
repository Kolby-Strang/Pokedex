import { AppState } from "../AppState.js";
import { pokemonService } from "../services/PokemonService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class PokemonController {
    constructor() {
        console.log('Poke Loaded');
        this.getPokemon()
        AppState.on('pokePage', _drawPokeList)
        AppState.on('activePokemon', _drawActivePokemon)
    }

    async getPokemon() {
        try {
            await pokemonService.getPokemon()
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }

    async setActivePokemon(pokeUrl) {
        try {
            await pokemonService.setActivePokemon(pokeUrl)
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }
}

function _drawPokeList() {
    //@ts-ignore
    const pokemon = AppState.pokePage.results
    let content = ''
    pokemon.forEach(p => content += `<button class="btn d-block" onclick="app.PokemonController.setActivePokemon('${p.url}')">${p.name}</button>`)
    setHTML('pokemon-list', content)
}

function _drawActivePokemon() {
    const pokemon = AppState.activePokemon
    if (pokemon == null) return
    setHTML('active-pokemon-container', pokemon.activeCard)
}