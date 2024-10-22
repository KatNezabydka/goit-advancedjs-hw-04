import { lightbox } from './utils/lightbox.js';
import { galleryEl } from './utils/constants.js';

function createCardsMarkup(cards) {
  return cards
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-card">
           <a class="gallery-link" href="${largeImageURL}">
                <img
                class="gallery-img"
                src="${webformatURL}"
                alt="${tags}"
                />
           </a>
          <div class="info">
            <p class="info-item"><b>Likes</b> ${likes}</p>
            <p class="info-item"><b>Views</b> ${views}</p>
            <p class="info-item"><b>Comments</b> ${comments}</p>
            <p class="info-item"><b>Downloads</b> ${downloads}</p>
          </div>
        </li>`,
    )
    .join('');
}

function updateGallery(data) {
  const photosMarkup = createCardsMarkup(data.hits);
  galleryEl.insertAdjacentHTML('beforeend', photosMarkup);
  lightbox.refresh();
}

function configureScroll() {
  const galleryItem = document.querySelector('.gallery-card');
  if (!galleryItem) return;
  const cardHeight = galleryItem.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export {updateGallery, configureScroll};