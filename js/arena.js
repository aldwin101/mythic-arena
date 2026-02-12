const savedCharacter = JSON.parse(
  localStorage.getItem('selectedCharacter')
);

document.querySelector('.player-name').textContent =
  savedCharacter.name;

document.querySelector('.player-health').value =
  savedCharacter.stats.health;

document.querySelector('.player-img').src =
  savedCharacter.image;


document.addEventListener("DOMContentLoaded", async () => {

  const response = await fetch('./characters.json'); 
  const data = await response.json(); // Load character data from JSON file
  const characters = data.characters; // Access the characters array from the loaded data

  // Check if enemy already saved
  let savedEnemy = JSON.parse(localStorage.getItem("enemy"));

  // If not, create random enemy
  if (!savedEnemy) {
    const randomEnemy =
      characters[Math.floor(Math.random() * characters.length)];

    localStorage.setItem("enemy", JSON.stringify(randomEnemy));
    savedEnemy = randomEnemy;
  }

  // Display enemy
  const enemyHealth = document.querySelector(".enemy-health");

  document.querySelector(".enemy-name").textContent =
    savedEnemy.name;

  document.querySelector(".enemy-img").src =
    savedEnemy.image;

  enemyHealth.max = savedEnemy.stats.health;
  enemyHealth.value = savedEnemy.stats.health;

});
