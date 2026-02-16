//event listener for arena page
document.addEventListener('DOMContentLoaded', async () => {
  const savedSelectedCharacter = JSON.parse(
    localStorage.getItem('selectedCharacter')
  );

  // If no character is selected, redirect to character selection page
  if (!savedSelectedCharacter) {
    window.location.href = 'character-select.html';
    return;
  }

  document.querySelector('.player-name').textContent = savedSelectedCharacter.name;
  document.querySelector('.player-img').src = savedSelectedCharacter.image;

  if (savedSelectedCharacter.facing === 'left') {
    document.querySelector('.player-img').classList.add('face-right');
  }

  const playerHealth = document.querySelector('.player-health');
  playerHealth.max = savedSelectedCharacter.stats.health;
  playerHealth.value = savedSelectedCharacter.stats.health;

  const response = await fetch('./characters.json');
  const data = await response.json();
  const characters = data.characters;

  let savedEnemy = JSON.parse(localStorage.getItem('enemy'));

  // If no enemy is saved or the saved enemy is the same as the selected character, pick a new random enemy
  if (!savedEnemy || savedEnemy.id === savedSelectedCharacter.id) {
    do {
      savedEnemy = characters[Math.floor(Math.random() * characters.length)];
    } while (savedEnemy.id === savedSelectedCharacter.id);

    localStorage.setItem('enemy', JSON.stringify(savedEnemy));
  }

  document.querySelector('.enemy-name').textContent = savedEnemy.name;
  document.querySelector('.enemy-img').src = savedEnemy.image;

  const enemyHealth = document.querySelector('.enemy-health');
  enemyHealth.max = savedEnemy.stats.health;
  enemyHealth.value = savedEnemy.stats.health;

  if (savedEnemy.facing === 'right') {
    document.querySelector('.enemy-img').classList.add('face-left');
  }
});

// Clear localStorage when "End Match" button is clicked
const endMatchBtn = document.querySelector('.end-match-btn');
endMatchBtn.addEventListener('click', () => {
  localStorage.removeItem('selectedCharacter');
  localStorage.removeItem('enemy');
});


const attackBtn = document.querySelector('.attack-button');
attackBtn.addEventListener('click', () => {

  const playerString = localStorage.getItem('selectedCharacter');
  const enemyString = localStorage.getItem('enemy');

  const savedcharacter = JSON.parse(playerString);
  const savedEnemy = JSON.parse(enemyString);

  const playerHealth = document.querySelector('.player-health');
  const enemyHealth = document.querySelector('.enemy-health');

  const roll = Math.floor(Math.random() * 10) + 1; // Simulate a dice roll (1-10)
  const AdditionalAttackChance = roll === 1; // 10% chance for an additional attack

  const playerAttack = savedcharacter.stats.attack + (AdditionalAttackChance ? savedcharacter.stats.attack * 0.1 : 0); 
  const enemyAttack = savedEnemy.stats.attack + (AdditionalAttackChance ? savedEnemy.stats.attack * 0.1 : 0); 

  playerHealth.value -= enemyAttack;
  enemyHealth.value -= playerAttack;

  setTimeout(() => {
    const gameStatus = document.querySelector('.game-status');
    if (enemyHealth.value === 0 && playerHealth.value > 0) {
        gameStatus.textContent = "Victory! You won!";
        attackBtn.disabled = true;
    } else if (playerHealth.value === 0 && enemyHealth.value > 0) {
        gameStatus.textContent = "Defeat! You lost!";
    } else if (playerHealth.value === 0 && enemyHealth.value === 0) {
        gameStatus.textContent = "It's a draw!";
      attackBtn.disabled = true;
    }
}, 200);
})



