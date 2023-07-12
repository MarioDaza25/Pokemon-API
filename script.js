async function fetchData(nombre) {
  try {
    nombre = typeof nombre !== 'string' ? nombre : nombre.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw 'Error al obtener los datos';
  }
}

function createCard(pokemon) {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card');
  
  const name = document.createElement('h2');
  name.textContent = pokemon.name;
  cardContainer.appendChild(name);

  const image = document.createElement('img');
  image.src = pokemon.sprites.front_default;
  cardContainer.appendChild(image);

  
  const abilities = document.createElement('p');
  abilities.textContent = 'Habilidades: '+`${pokemon.abilities.map(ability => ability.ability.name).join(', ')} `;
  cardContainer.appendChild(abilities);

  const weight = document.createElement('p');
  weight.textContent = `Peso: ${pokemon.weight} kg`;
  cardContainer.appendChild(weight);

  const height = document.createElement('p');
  height.textContent = `Altura: ${pokemon.height} m`;
  cardContainer.appendChild(height);

  return cardContainer;
}

async function displayData(nombre) {
  try {
    const data = await fetchData(nombre);

    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = '';

    const card = createCard(data);
    pokemonContainer.appendChild(card);
  } catch (error) {
    console.error(error);
  }
}

async function displayAllData() {
  const pokemonContainer = document.getElementById('pokemonContainer');
  pokemonContainer.innerHTML = '';

  for (let i = 1; i <= 100; i++) {
    try {
      const data = await fetchData(i);

      const card = createCard(data);
      pokemonContainer.appendChild(card);
    } catch (error) {
      console.error(`Error al obtener los datos del personaje con ID ${i}: ${error}`);
    }
  }
}

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const nombre = searchInput.value.trim();
  if (nombre === '') {
    displayAllData();
  } else {
    displayData(nombre);
  }
});

displayAllData()
