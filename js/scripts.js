let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1300";

    // Return functions
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === "object") {
            pokemonList.push(pokemon);
        }
    }

    function getByName(search) {
        return pokemonList.filter(function(pokemon) {
            return pokemon.name.toLowerCase().includes(search.toLowerCase());
        });
    }

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

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

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
            console.log(e);
        })
    }

    function loadDetails() {

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
