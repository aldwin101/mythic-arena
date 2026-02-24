// call the function so characters show on page load
displayCharacters();

// import the function that gets character data from the JSON file
import { loadCharactersData } from './charactersData.js';

// function to display characters on the page
export async function displayCharacters() { 
  const data = await loadCharactersData(); 
  const characters = data.characters; 
  const roster = document.querySelector('.character-roster'); 
  roster.innerHTML = '';
  
  // get the saved character from localStorage to restore selection on page load
  const savedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));

  // loop through characters and create figure elements for each
  characters.forEach((character, index) => {
    const figure = document.createElement('figure');
    const dynamicNumber = index + 1;
    figure.className = 'character-container';
    figure.innerHTML = `
      <img class='character-image char${dynamicNumber}' 
        src='${character.image}' 
        alt='${character.name}'>
    `;
    
    roster.appendChild(figure);

    // function to handle character selection
    function handleCharacterSelection() {
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
        
        <div class='stat-health'>
          <label>Health:</label>
          <meter class='health-meter' value='${character.stats.health}' min='0' max='100'></meter>
        </div>

        <div class='stat-attack'>
          <label>Attack:</label>
          <meter class='attack-meter' value='${character.stats.attack}' min='0' max='100'></meter>
        </div>

        <div class='stat-defense'>
          <label>Defense:</label>
          <meter class='defense-meter' value='${character.stats.defense}' min='0' max='100'></meter>
        </div>
      `;

      // save selected character to localStorage for use in arena page
      localStorage.setItem('selectedCharacter', JSON.stringify(character));
    }
    // click event listener for character selection
    figure.addEventListener('click', handleCharacterSelection);

    // restore selection on page load if it matches the character
    if (savedCharacter && savedCharacter.id === character.id) {
      handleCharacterSelection();
    }
  });

  // default to first character if no saved selection or if saved selection doesn't match any character
  if (!savedCharacter) {
    const defaultCharacter = document.querySelector('.char1');
    defaultCharacter.click();
  }
}