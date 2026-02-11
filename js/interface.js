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

  const savedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));

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

      localStorage.setItem('selectedCharacter', JSON.stringify(character));
    }
    // click event
    figure.addEventListener('click', handleCharacterSelection);

    // restore saved character
    if (savedCharacter && savedCharacter.id === character.id) {
      handleCharacterSelection();
    }
  });

  // default selection if nothing saved
  if (!savedCharacter) {
    const defaultCharacter = document.querySelector('.char1');
    defaultCharacter.click();
  }
}