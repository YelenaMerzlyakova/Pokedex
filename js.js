const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let input = document.querySelector(".pokemon-input");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonImage = document.querySelector(".pokemon-image");
const pokemonMoves = document.querySelector(".pokemon-moves");

function getPokemonData() {
  console.log(apiUrl);
  axios
    .get(apiUrl + input.value)
    .then(function(response) {
      console.log(response);
      pokemonName.innerHTML =
        response.data.forms[0].name + " " + response.data.id;
      pokemonMoves.innerHTML = response.data.moves[0].move.name;
      pokemonImage.src = response.data.sprites.front_default;
    })
    .catch(function(error) {
      pokemonName.innerHTML = "(An error has occurred.)";
      pokemonImage.src = "";
    });
}

var button = document.querySelector(".pokemon-button");
button.addEventListener("click", getPokemonData);
