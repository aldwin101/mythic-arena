//event listener for arena page
document.addEventListener('DOMContentLoaded', async () => {
  const savedSelectedCharacter = JSON.parse(
    localStorage.getItem('selectedCharacter')
  );

  document.querySelector('.player-name').textContent = savedSelectedCharacter.name;
  document.querySelector('.player-img').src = savedSelectedCharacter.image;

  if (savedSelectedCharacter.facing === 'left') {
    document.querySelector('.player-img').classList.add('face-right');
  }

  const playerHealth = document.querySelector('.player-health');

  
// maxHealth setup for player
if (!savedSelectedCharacter.stats.maxHealth) {
  savedSelectedCharacter.stats.maxHealth = savedSelectedCharacter.stats.health;
  savedSelectedCharacter.stats.health = savedSelectedCharacter.stats.maxHealth;

  //save the updated character with maxHealth back to localStorage
  localStorage.setItem('selectedCharacter', JSON.stringify(savedSelectedCharacter));
}


  playerHealth.max = savedSelectedCharacter.stats.maxHealth;
  playerHealth.value = savedSelectedCharacter.stats.health;

  const response = await fetch('./characters.json');
  const data = await response.json();
  const characters = data.characters;

  let savedEnemy = JSON.parse(localStorage.getItem('enemy'));


  //select a random enemy if there isn't one saved or if the saved enemy is the same as the selected character
  if (!savedEnemy || savedEnemy.id === savedSelectedCharacter.id) {
    do {
      savedEnemy = characters[Math.floor(Math.random() * characters.length)];
    } while (savedEnemy.id === savedSelectedCharacter.id);

    localStorage.setItem('enemy', JSON.stringify(savedEnemy));
  }

  document.querySelector('.enemy-name').textContent = savedEnemy.name;
  document.querySelector('.enemy-img').src = savedEnemy.image;

  const enemyHealth = document.querySelector('.enemy-health');

  // maxHealth setup for enemy
  if (!savedEnemy.stats.maxHealth) {
    savedEnemy.stats.maxHealth = savedEnemy.stats.health;
    savedEnemy.stats.health = savedEnemy.stats.maxHealth;

  //save the updated enemy with maxHealth back to localStorage
    localStorage.setItem('enemy', JSON.stringify(savedEnemy));
  }

  enemyHealth.max = savedEnemy.stats.maxHealth;
  enemyHealth.value = savedEnemy.stats.health;

  if (savedEnemy.facing === 'right') {
    document.querySelector('.enemy-img').classList.add('face-left');
  }
});

// clear localStorage when "End Match" button is clicked
const endMatchBtn = document.querySelector('.end-match-btn');
endMatchBtn.addEventListener('click', () => {
  localStorage.removeItem('selectedCharacter');
  localStorage.removeItem('enemy');
});

// attack button event listener
const attackBtn = document.querySelector('.attack-button');
attackBtn.addEventListener('click', () => {

  const playerString = localStorage.getItem('selectedCharacter');
  const enemyString = localStorage.getItem('enemy');

  const savedCharacter = JSON.parse(playerString);
  const savedEnemy = JSON.parse(enemyString);

  const playerHealth = document.querySelector('.player-health');
  const enemyHealth = document.querySelector('.enemy-health');

  const roll = Math.floor(Math.random() * 10) + 1; // simulate a dice roll (1-10)
  const AdditionalAttackChance = roll === 1; // 10% chance for an additional attack

// calculate attack values with potential bonus from the dice roll
  const playerAttack = savedCharacter.stats.attack +
    (AdditionalAttackChance ? savedCharacter.stats.attack * 0.1 : 0);

  const enemyAttack = savedEnemy.stats.attack +
    (AdditionalAttackChance ? savedEnemy.stats.attack * 0.1 : 0);

  // player attacks first
  const updatedEnemyHealth = enemyHealth.value - playerAttack; // subtract player damage from enemy
  savedEnemy.stats.health = Math.max(0, updatedEnemyHealth); // prevent negative health
  enemyHealth.value = savedEnemy.stats.health; // update enemy UI health

  // enemy attacks back only if still alive
  if (savedEnemy.stats.health > 0) {
    const updatedPlayerHealth = playerHealth.value - enemyAttack; 
    savedCharacter.stats.health = Math.max(0, updatedPlayerHealth); 
    playerHealth.value = savedCharacter.stats.health; 
  }

  // allow health bars to update before checking for victory/defeat conditions
  setTimeout(() => {
    const gameStatus = document.querySelector('.game-status');

    if (enemyHealth.value === 0 && playerHealth.value > 0) {
      gameStatus.textContent = "Victory! You won!";
      attackBtn.disabled = true; 
    }
    else if (playerHealth.value === 0 && enemyHealth.value > 0) {
      gameStatus.textContent = "Defeat! You lost!";
      attackBtn.disabled = true; 
    }
    else if (playerHealth.value === 0 && enemyHealth.value === 0) {
      gameStatus.textContent = "It's a draw!";
      attackBtn.disabled = true;
    }
  }, 200); 
});