const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const imageInput = document.getElementById('image');
const button = document.getElementById('submit-card');
const cardList = document.getElementById('card-list');

function addCard() {
  const title = titleInput.value;
  const description = descriptionInput.value;
  const image = imageInput.value;

  const newCard = document.createElement('li');
  newCard.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <img src=${image} />
  `;

  cardList.appendChild(newCard);
}

button.addEventListener('click', (event) => {
  event.preventDefault();
  addCard();
});
