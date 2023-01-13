let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1300";

    // Return functions

    // This function return the entire pokemon array
    function getAll() {
        return pokemonList;
    }

    // This function adds (pushes) a pokemon object to the pokemon array
    function add(pokemon) {
        if (typeof pokemon === "object") {
            pokemonList.push(pokemon);
        }
    }

    // This function returns a pokemon array with all pokemons
    // that include the "search" term in their Name
    function getByName(search) {
        return pokemonList.filter(function(pokemon) {
            return pokemon.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    // This function adds a button to the website with the pokemon name
    // and an event listener that calls the showDetails function on click
    function addListItem(pokemon) {
        let uPokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        button.addEventListener("click", function() {
            showDetails(pokemon);
        });
        listItem.appendChild(button);
        uPokemonList.appendChild(listItem);
    }

    // This function logs the given pokemon details on the console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
    }

    // This function fetches all pokemons from the api
    // ands adds them ton the array using the add function
    function loadList() {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        })
    }

    // This function adds details to a specific pokemon object on the array
    // using the deatilsUrl of the pokemon object to get the details from the api
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    }

    // Return object with the same names for keys as values
    return {
        getAll: getAll,
        add: add,
        getByName: getByName,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// Load Pokemons from the API and print each pokemon on the website
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
