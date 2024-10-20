import { galleryEl, loadMoreBtnEl, searchFormEl, params } from './js/utils/constants.js';
import ButtonService from './js/utils/btn-service';
import { getPhotos } from './js/pixabay-api.js';
import { updateGallery } from './js/render-functions';
import { showErrorToast } from './js/utils/toast.js';

const loadMoreBtnService = new ButtonService(loadMoreBtnEl);

searchFormEl.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';
  params.page = 1;

  loadMoreBtnService.hide();

  const form = event.currentTarget;
  const userQuery = form.elements.user_query.value.trim();
  if (userQuery === '') {
    showErrorToast('Search can\'t be empty');
    form.reset();
    return;
  }
  params.query = userQuery;

  try {
    document.getElementById('loader').style.display = 'flex';
    const data = await getPhotos(params);

    if (data.total === 0) {
      galleryEl.innerHTML = '';
      showErrorToast('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    params.maxPage = Math.ceil(data.total / params.perPage);

    updateGallery(data);

    if (params.maxPage > params.page) {
      loadMoreBtnService.show();
      loadMoreBtnEl.addEventListener('click', handleLoadMore);
    }
  } catch (err) {
    console.log(err);
  } finally {
    document.getElementById('loader').style.display = 'none';
    form.reset();
  }
}

async function handleLoadMore() {

  loadMoreBtnService.setLoading();
  params.page += 1;

  try {
    const data = await getPhotos(params);

    updateGallery(data);
    loadMoreBtnService.setNormal();

    if (params.maxPage === params.page) {
      loadMoreBtnService.hide();

      loadMoreBtnEl.removeEventListener('click', handleLoadMore);
    }
  } catch (err) {
    console.log(err);
  }
}