const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

let input = document.querySelector(".pokemon-input");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonImage = document.querySelector(".pokemon-image");
let pokemonMoves = document.getElementsByClassName("pokemon-moves");
let clearMoves = document.getElementById("moves");
let pokeEvo = document.getElementById("evo");

function getPokemonData() {
    pokemonImage.style.display = "inline";
    const moves = [];

    console.log(apiUrl + input.value);

    axios.get(apiUrl + input.value)
        .then(function(response) {
            pokemonName.innerHTML = response.data.forms[0].name + " ID: " + response.data.id;
            var ID = response.data.id;

            pokemonImage.src = response.data.sprites.front_default;
            for (let i = 0; i < 4; i++) {
                moves.push(response.data.moves[i].move.name);
                pokemonMoves[i].innerHTML = moves[i];
            }

            var apiEvo = `https://pokeapi.co/api/v2/pokemon-species/${ID}`;
            axios
                .get(apiEvo)
                .then(function(responseEvo) {
                    //pokeEvo.innerHTML = responseEvo.data.evolves_from_species.name;
                    if (responseEvo.data.evolves_from_species == null) {
                        pokeEvo.innerHTML = "Basic Pokemon";
                    } else {
                        pokeEvo.innerHTML = responseEvo.data.evolves_from_species.name;
                    }
                })
        })
        .catch(function(error) {
            pokemonName.innerHTML = "(An error has occurred.)";
            pokemonImage.src = '';
            //pokeEvo.innerHTML = "";
            clearMoves.innerHTML = "";
            pokemonImage.style.display = "none";
        });
}

var button = document.querySelector(".pokemon-button");
button.addEventListener("click", getPokemonData);
input.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        getPokemonData();
    }
});