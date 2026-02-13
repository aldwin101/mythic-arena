const savedSelectedCharacter = JSON.parse(
  localStorage.getItem('selectedCharacter')
);

document.querySelector('.player-name').textContent =
  savedSelectedCharacter.name;

document.querySelector('.player-health').value =
  savedSelectedCharacter.stats.health;

document.querySelector('.player-img').src =
  savedSelectedCharacter.image;

  
// If player is facing left, flip it to face right
if (savedSelectedCharacter.facing === "left") {
  document.querySelector('.player-img').classList.add('face-right');
}

// Load randon enemy data and display
document.addEventListener("DOMContentLoaded", async () => {

  const response = await fetch('./characters.json'); 
  const data = await response.json(); // Load character data from JSON file
  const characters = data.characters; // Access the characters array from the loaded data

  // Check if enemy already saved
  let savedEnemy = JSON.parse(localStorage.getItem("enemy"));

  // Ensure savedEnemy is not the same as savedSelectedCharacter
  if (savedEnemy.id === savedSelectedCharacter.id) {
    // If they are the same, select a different random enemy
    let differentEnemy = characters[Math.floor(Math.random() * characters.length)];
    while (differentEnemy.id === savedSelectedCharacter.id) {
      differentEnemy = characters[Math.floor(Math.random() * characters.length)];
    }
    localStorage.setItem("enemy", JSON.stringify(differentEnemy));
    savedEnemy = differentEnemy;
  }

if (savedEnemy.facing === "right") {
    document.querySelector('.enemy-img').classList.add('face-left');
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
