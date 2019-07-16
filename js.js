const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

let input = document.querySelector(".pokemon-input");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonImage = document.querySelector(".pokemon-image");
let pokemonMoves = document.getElementsByClassName("pokemon-moves");
// let clearMoves = document.getElementById("moves");
let pokeEvo = document.getElementById("evo");
let img2 = document.querySelector(".img2");
let header = document.getElementById("h2");

// let pokemove1 = document.getElementById("pokemon-moves1");
// let pokemove2 = document.getElementById("pokemon-moves2");
// let pokemove3 = document.getElementById("pokemon-moves3");
// let pokemove4 = document.getElementById("pokemon-moves4");

function getPokemonData() {
  pokemonImage.style.display = "inline";
  header.style.display = "inline";

  const moves = [];

  console.log(apiUrl + input.value);

  axios
    .get(apiUrl + input.value)
    .then(function(response) {
      console.log(response);
      pokemonName.innerHTML =
        response.data.forms[0].name + ", ID: " + response.data.id;
      var ID = response.data.id;
      pokemonImage.src = response.data.sprites.front_default;

      for (let i = 0; i < pokemonMoves.length; i++) {
        moves.push(response.data.moves[i].move.name);
        pokemonMoves[i].innerHTML = moves[i];
      }
      //   pokemove1.innerHTML = response.data.moves[0].move.name;
      //   pokemove2.innerHTML = response.data.moves[1].move.name;
      //   pokemove3.innerHTML = response.data.moves[2].move.name;
      //   pokemove4.innerHTML = response.data.moves[3].move.name;

      var apiEvo = `https://pokeapi.co/api/v2/pokemon-species/${ID}`;
      axios
        .get(apiEvo)
        .then(function(responseEvo) {
          console.log(responseEvo);
          var evoId = ID - 1;
          console.log(evoId);
          console.log(apiUrl + evoId);
          if (evoId == "0") {
            img2.style.display = "";
            pokeEvo.innerHTML = "Basic Pokemon";
            return;
          }
          axios.get(apiUrl + evoId).then(function(responseEvoImg) {
            img2.src = responseEvoImg.data.sprites.front_default;
            img2.style.display = "inline";
            if (pokeEvo.innerHTML == "Basic Pokemon" || evoId == "0") {
              img2.style.display = "";
            }
          });

          pokeEvo.innerHTML =
            "Evolved from: " + responseEvo.data.evolves_from_species.name;
        })
        .catch(function(error) {
          pokeEvo.innerHTML = "Basic Pokemon";
        });
    })

    .catch(function(error) {
      pokemonName.innerHTML = "(Pokémon has not yet been discovered)";
      pokemonImage.src = "";
      //   for (const key in pokemonMoves) {
      //     const element = pokemonMoves[key];
      //     console.log(element);
      for (let i = 0; i < pokemonMoves.length; i++) {
        pokemonMoves[i].innerHTML = "";
      }

      //   pokemonMoves.innerHTML = "";
      //   pokemove1.innerHTML = "";
      //   pokemove2.innerHTML = "";
      //   pokemove3.innerHTML = "";
      //   pokemove4.innerHTML = "";
      pokeEvo.innerHTML = "";
      img2.style.display = "";
      header.innerHTML = "";

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
