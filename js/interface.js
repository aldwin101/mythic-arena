// call the function so characters show on page load
displayCharacters();

// import the function that gets character data from the JSON file
import { loadCharactersData } from "./charactersData.js";

// function to display characters on the page
export async function displayCharacters() { 
  const data = await loadCharactersData(); 
  const characters = data.characters; 
  const roster = document.querySelector('.character-roster'); 
  roster.innerHTML = ''; 

  // loop through each character and create its HTML structure
  characters.forEach((character, index)=> {
    const figure = document.createElement('figure');
    const dynamicNumber = index +1;
    figure.className = 'character-container';
    figure.innerHTML = `<img class="character-image char${dynamicNumber}" src="${character.image}" alt="${character.name}" >`;
    
    roster.appendChild(figure); // add character image to the roster
    

    // add click event listener to each character image
    figure.addEventListener('click', () => {

      // remove 'selected' class from all characters and add it to the clicked one
      document.querySelectorAll('.character-container')
      .forEach(fig => fig.classList.remove('selected'));
      figure.classList.add('selected');

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
  // simulate a click on the first character to display its details by default
  const defaultCharacter = document.querySelector('.char1');
  defaultCharacter.click();
}