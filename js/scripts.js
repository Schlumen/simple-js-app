let pokemonList = [];
pokemonList = [
    {name: "Wartortle", height: 1, types: ["water"]},
    {name: "Charizard", height: 1.7, types: ["fire", "flying"]},
    {name: "Pikachu", height: 0.4, types: ["electric"]},
    {name: "Nidoking", height: 1.4, types: ["ground", "poison"]}
];

// Print each pokemon on the website with their height
for (let i = 0; i < pokemonList.length; i++){
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})`);
    // Label all huge pokemons
    if (pokemonList[i].height > 1.5){
        document.write(" - It's so huge!<br>");
    } else {
        document.write("<br>");
    }
}