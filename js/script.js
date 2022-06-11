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

  const newCard = document.createElement('div');
  newCard.id = `${title}-card`;
  newCard.className = 'h-48 w-full lg:w-5/12 flex flex-row';

  newCard.innerHTML = `
    <div
      class="basis-2/5 bg-center bg-cover rounded-t-none rounded-l"
      style="
        background-image: url(${image});
      "
    ></div>
    <div
      class="basis-3/5 border-r border-b border-gray-400 border-l-0 border-t bg-white rounded-b-none rounded-r p-4 flex flex-col justify-between transition ease-in-out duration-300"
    >
      <div class="mb-4 overflow-y-auto">
        <h3 class="text-gray-900 font-bold text-xl mb-2">${title}</h3>
        <p class="text-gray-700 text-base">${description}</p>
      </div>
      <label for="${title}-check" class="text-sm text-gray-900">
        <input type="checkbox" id="${title}-check" />
        Já comprei
      </label>
    </div>
  `;

  cardList.appendChild(newCard);

  const card = document.getElementById(`${title}-card`);

  document.getElementById(`${title}-check`).addEventListener('change', ({ target }) => {
    if (target.checked) {
      card.classList.add('opacity-25');
    } else {
      card.classList.remove('opacity-25');
    }
  });
}

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  addCard();
});
