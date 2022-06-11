const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const suggestionsButton = document.getElementById('suggestions-button');
const imageSuggestions = document.getElementById('image-suggestions');
const imageInput = document.getElementById('image');
const submitButton = document.getElementById('submit-card');
const cardList = document.getElementById('card-list');

suggestionsButton.addEventListener('click', async () => {
  imageSuggestions.innerHTML = `
  <svg class="animate-spin h-10 w-10" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  `;

  const item = titleInput.value;

  const response = await fetch(`https://damp-beach-97624.herokuapp.com/search?item=${item}`);
  const responseData = await response.json();

  const imagesData = responseData.images_results.splice(0, 3).map((image) => image.thumbnail);

  const images = document.createElement('div');

  imagesData.forEach((imageUrl) => {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'block h-40 w-40 my-4 bg-center bg-cover rounded-lg p-2 shadow-lg cursor-pointer hover:scale-110 transition ease-in-out duration-300';

    imageContainer.style.backgroundImage = `url(${imageUrl})`;

    imageContainer.addEventListener('click', () => {
      imageInput.value = imageContainer.style.backgroundImage.slice(5, -2);
      imageSuggestions.innerHTML = '';
    });

    images.appendChild(imageContainer);
  });

  imageSuggestions.innerHTML = '';
  imageSuggestions.appendChild(images);
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
  titleInput.value = '';
  descriptionInput.value = '';
  imageInput.value = '';
});
