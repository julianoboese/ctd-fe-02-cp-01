const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const suggestionsButton = document.getElementById('suggestions-button');
const imageSuggestions = document.getElementById('image-suggestions');
const imageInput = document.getElementById('image');
const submitButton = document.getElementById('submit-card');
const cardList = document.getElementById('card-list');

suggestionsButton.addEventListener('click', async () => {
  const item = titleInput.value;

  const response = await fetch(`https://damp-beach-97624.herokuapp.com/search?item=${item}`);
  const responseData = await response.json();

  const images = responseData.results.splice(0, 3).map(({ urls }) => urls.small);

  images.forEach((imageUrl) => {
    const newImage = document.createElement('img');

    newImage.src = imageUrl;

    newImage.addEventListener('click', () => {
      imageInput.value = newImage.src;
    });

    imageSuggestions.appendChild(newImage);
  });
});

function addCard() {
  const title = titleInput.value;
  const description = descriptionInput.value;
  const image = imageInput.value;

  const newCard = document.createElement('li');
  newCard.innerHTML = `
    <div id="${title}-card">
      <h3>${title}</h3>
      <p>${description}</p>
      <img src=${image} />
      <label>
        <input type="checkbox" id="${title}-check" />
        Já comprei
      </label>
    </div>
  `;

  cardList.appendChild(newCard);
}

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  addCard();
});
