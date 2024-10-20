import { galleryEl, loadMoreBtnEl, params } from './utils/constants.js';
import ButtonService from './utils/btn-service';
import { getPhotos } from './pixabay-api.js';
import { updateGallery } from './render-functions';
import { showErrorToast } from './utils/toast.js';

const loadMoreBtnService = new ButtonService(loadMoreBtnEl);

export async function handleSearch(event) {
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