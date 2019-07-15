const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let input = document.querySelector(".pokemon-input");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonImage = document.querySelector(".pokemon-image");
let pokemonMoves = document.getElementsByClassName("pokemon-moves");

function getPokemonData() {
  const moves = [];
  console.log(apiUrl);
  axios
    .get(apiUrl + input.value)
    .then(function(response) {
      console.log(response);
      pokemonName.innerHTML =
        response.data.forms[0].name + " " + response.data.id;

      pokemonImage.src = response.data.sprites.front_default;
      for (let i = 0; i < 4; i++) {
        moves.push(response.data.moves[i].move.name);

        console.log(moves);
        pokemonMoves[i].innerHTML = moves[i];
        console.log(pokemonMoves[i]);
      }
    })

    .catch(function(error) {
      pokemonName.innerHTML = "(An error has occurred.)";
      pokemonImage.src = "";
      pokemonMoves[i].innerHTML = "tetsst"; /*error not yet working*/
    });
}

var button = document.querySelector(".pokemon-button");
button.addEventListener("click", getPokemonData);
input.addEventListener("keypress", function(e) {
  if (e.keyCode == 13) {
    getPokemonData();
  }
});
