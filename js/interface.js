// import the function that loads character data
import { loadCharactersData } from "./charactersData.js";

// function to display characters on the page
export async function displayCharacters() {
  const data = await loadCharactersData();
  const characters = data.characters;
  const roster = document.querySelector('.character-roster');
  
  roster.innerHTML = '';

  characters.forEach((character, index)=> {
    const figure = document.createElement('figure');
    figure.className = 'character-container';

    const dynamicNumber = index +1;
    figure.innerHTML = `<img class="character-image char${dynamicNumber}" src="${character.image}" alt="${character.name}" >
    <figcaption> ${character.name} - ${character.description}
    </figcaption>`;

    roster.appendChild(figure);
  })
}

displayCharacters();