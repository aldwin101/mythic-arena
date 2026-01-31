// call the function so characters show on page load
displayCharacters();

// import the function that gets character data from the JSON file
import { loadCharactersData } from "./charactersData.js";

// function to display characters on the page
export async function displayCharacters() { // async because it waits for data to load
  const data = await loadCharactersData(); // wait for character data to be loaded
  const characters = data.characters; // extract characters array from the data
  const roster = document.querySelector('.character-roster'); // select the roster container
  
  roster.innerHTML = ''; // clear existing content before adding new characters

  // loop through each character and create HTML elements
  characters.forEach((character, index)=> {
    const figure = document.createElement('figure');
    figure.className = 'character-container';

    const dynamicNumber = index +1;
    figure.innerHTML = `<img class="character-image char${dynamicNumber}" src="${character.image}" alt="${character.name}" >`;

    roster.appendChild(figure); // add the figure element to the roster
    
    // add click event listener to each character image
    figure.addEventListener('click', () => {
      const selectedImage = document.querySelector('.selected-character-image img');

      const descriptionBox = document.querySelector('.description-box');

      selectedImage.src = character.image;
      selectedImage.alt = character.name;

      descriptionBox.innerHTML = `
      <h2>${character.name}</h2>
      <p>${character.description}</p> 
      
      <div class="stat-health">
        <label>Health:</label>
        <meter id="health-meter" value="${character.stats.health}" min="0" max="100"></meter>
      </div>

      <div class="stat-attack">
        <label>Attack:</label>
        <meter id="attack-meter" value="${character.stats.attack}" min="0" max="100"></meter>
      </div>

      <div class="stat-defense">
        <label>Defense:</label>
        <meter id="defense-meter" value="${character.stats.defense}" min="0" max="100"></meter>
      </div>
      `;
    })
  })
}