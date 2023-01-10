let pokemonRepository = (function() {
    let pokemonList = [
        {name: "Wartortle", height: 1, types: ["water"]},
        {name: "Charizard", height: 1.7, types: ["fire", "flying"]},
        {name: "Pikachu", height: 0.4, types: ["electric"]},
        {name: "Nidoking", height: 1.4, types: ["ground", "poison"]}
    ];

    // Return functions
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === "object") {
            if (Object.keys(pokemon).toString() === ["name", "height", "types"].toString()) {
                pokemonList.push(pokemon);
            }
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
        listItem.appendChild(button);
        uPokemonList.appendChild(listItem);
    }

    // Return object with the same names for keys as values
    return {
        getAll: getAll,
        add: add,
        getByName: getByName,
        addListItem: addListItem
    };
})();

// Add a pokemon to the array
pokemonRepository.add({name: "Glumanda", height: 0.6, types: ["fire"]});

// Print each pokemon on the website
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});