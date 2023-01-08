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
        pokemonList.push(pokemon);
    }

    // Return object with the same names for keys as values
    return {
        getAll: getAll,
        add: add
    };
})();

// Print each pokemon on the website with their height
pokemonRepository.getAll().forEach(function(pokemon) {
    let output = `<p>${pokemon.name} (height: ${pokemon.height})`;
    // Label all huge pokemons
    if (pokemon.height > 1.5){
        output += " - It's so huge!</p>";
    } else {
        output += "</p>";
    }
    document.write(output);
});