async function loadCharData() {
  const response = await fetch('/characters.json');
  const data = await response.json();

  console.log(data);
}

loadCharData();