const savedCharacter = JSON.parse(
  localStorage.getItem('selectedCharacter')
);

document.querySelector('.player-name').textContent =
  savedCharacter.name;

document.querySelector('.player-img').src =
  savedCharacter.image;

document.querySelector('.player-health').value =
  savedCharacter.stats.health;