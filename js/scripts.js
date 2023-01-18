let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1300";
    let loadBar = document.querySelector(".lds-dual-ring");
    let modalContainer = document.querySelector("#modal-container");

    // Return functions

    // This function return the entire pokemon array
    function getAll() {
        return pokemonList;
    }

    // This function adds (pushes) a pokemon object to the pokemon array
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
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
            showModal(pokemon);
        });
    }

    // This function fetches all pokemons from the api
    // ands adds them ton the array using the add function
    function loadList() {
        showLoadingMessage();
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
        }).finally(function() {
            hideLoadingMessage();
        });
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
            item.weight = details.weight;
        }).catch(function(e) {
            console.error(e);
        });
    }

    // This function shows a loading animation
    function showLoadingMessage() {
        loadBar.classList.remove("lds-dual-ring-hidden");
        loadBar.classList.add("lds-dual-ring-visible");
    }

    // This function hides the loading animation
    function hideLoadingMessage() {
        loadBar.classList.remove("lds-dual-ring-visible");
        loadBar.classList.add("lds-dual-ring-hidden");
    }

    // This function shows a modal with the pokemon details
    function showModal(pokemon) {
        modalContainer.innerHTML = "";
        modalContainer.addEventListener("click", (e) => {
            if (e.target === modalContainer) {
                hideModal();
            }
        });

        let modal = document.createElement("div");
        modal.classList.add("modal");

        let closeButton = document.createElement("button");
        closeButton.classList.add("modal-close");
        closeButton.innerText = "CLOSE";
        closeButton.addEventListener("click", hideModal);

        let modalTitle = document.createElement("h3");
        modalTitle.innerText = pokemon.name;

        let modalPicture = document.createElement("img");
        modalPicture.src = pokemon.imageUrl;

        let types = "";
        pokemon.types.forEach(function(type) {
            types += type.type.name + " ";
        });

        let modalText = document.createElement("p");
        modalText.innerText = `Height: ${pokemon.height}\nWeight: ${pokemon.weight}\nTypes: ${types}`;

        modal.appendChild(closeButton);
        modal.appendChild(modalTitle);
        modal.appendChild(modalPicture);
        modal.appendChild(modalText);

        modalContainer.appendChild(modal);
        modalContainer.classList.add("is-visible");
    }

    // This function hides the pokemon details modal
    function hideModal() {
        modalContainer.classList.remove("is-visible");
    }

    // Return object with the same names for keys as values
    return {
        getAll: getAll,
        add: add,
        getByName: getByName,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,
        modalContainer: modalContainer
    };
})();

// Load Pokemons from the API and print each pokemon on the website
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// Add event listener to close modal on esc key press
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pokemonRepository.modalContainer.classList.contains("is-visible")) {
        pokemonRepository.hideModal();
    }
})