import { AppState } from "../AppState.js"

export class Pokemon {
    constructor(data) {
        this.name = data.name
        this.nickName = data.name
        this.img = data.sprites?.front_default || data.img
        this.weight = data.weight
        this.height = data.height
        this.types = data.types
    }


    get activeCard() {
        return `
        <div class="row p-5">
            <div class="col-12 poke-info-card text-center">
              <p>${this.name}</p>
            </div>
            <div class="col-12 d-flex justify-content-center">
              <img class="img-fluid pokemon-img" src="${this.img}" alt="${this.name}">
            </div>
            <div class="col-12">
              <div class="row poke-info-card p-3">
                <div class="col-6">
                  <p>Height: ${this.height}</p>
                </div>
                <div class="col-6">
                  <p>Weight: ${this.weight}</p>
                </div>
                <div class="col-6">
                  <p>Types: ${this.calculateTypes}</p>
                </div>
                <div class="col-12 text-end">
                  ${AppState.account ? '<button onclick="app.CaughtPokemonController.catchPokemon()" class="btn btn-danger">Catch</button>' : ''}
                </div>
              </div>
            </div>
        <div>
        `
    }

    get calculateTypes() {
        let content = []
        this.types.forEach(type => content.push(type.type.name))
        return content.join(', ')
    }
}