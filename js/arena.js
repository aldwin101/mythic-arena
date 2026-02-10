const savedCharacter = JSON.parse(
  localStorage.getItem('selectedCharacter')
);

document.querySelector('.player-name').textContent =
  savedCharacter.name;

document.querySelector('.player-health').value =
  savedCharacter.stats.health;

document.querySelector('.player-img').src =
  savedCharacter.image;