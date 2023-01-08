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

    // Return object with the same names for keys as values
    return {
        getAll: getAll,
        add: add,
        getByName: getByName
    };
})();

// Add a pokemon to the array
pokemonRepository.add({name: "Glumanda", height: 0.6, types: ["fire"]});

// Print each pokemon on the website with their height
document.write("<h2>All Pokemons</h2>");
printToDocument(pokemonRepository.getAll());

// Search for pokemons and print them
document.write("<h2>Pokemons containing \"ar\" in their names</h2>");
printToDocument(pokemonRepository.getByName("AR"));

// Function to print pokemons on the website with their height
function printToDocument(pokemons) {
    pokemons.forEach(function(pokemon) {
        let output = `<p>${pokemon.name} (height: ${pokemon.height})`;
        // Label all huge pokemons
        if (pokemon.height > 1.5){
            output += " - It's so huge!</p>";
        } else {
            output += "</p>";
        }
        document.write(output);
    });
}