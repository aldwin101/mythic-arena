export async function loadCharactersData() {
  const response = await fetch('../characters.json');
  const charactersData = await response.json();
  return charactersData;
}
