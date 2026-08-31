console.log("Hello World Pokémon");

async function obtenerPersonajes() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();

    const promesasDetalles = data.results.map(pokemon => 
        fetch(pokemon.url).then(res => res.json())
    );

    const pokemonDetalles = await Promise.all(promesasDetalles);
    console.log('Personajes:', pokemonDetalles);
    return pokemonDetalles;
}

console.log(obtenerPersonajes());

function pintarPersonajes(personajes) {
    console.log("Pintando personajes:", personajes);
    let tarjetasHTML = "";
    console.log("Tarjetas HTML:", tarjetasHTML);
    personajes.forEach(personaje => {
        const tipos = personaje.types.map(t => t.type.name).join(", ");
        const habilidades = personaje.abilities.map(a => a.ability.name).join(", ");
        const imagen = personaje.sprites.other["official-artwork"].front_default || personaje.sprites.front_default;
        const peso = personaje.weight;
        const experiencia = personaje.base_experience;

        tarjetasHTML += `
        <div class="card">
            <img src="${imagen}" alt="${personaje.name}">
            <div class="card-info">
                <h3>${personaje.name}</h3>
                <p class="species">Tipos: ${tipos}</p>
                <p class="status">Habilidades: ${habilidades}</p>
                <p class="status">Peso: ${peso}</p>
                <p class="status">Exp. Base: ${experiencia}</p>
            </div>
        </div>
        `;
    });
    document.getElementById("main-container").innerHTML = tarjetasHTML;
}

obtenerPersonajes().then(pintarPersonajes);