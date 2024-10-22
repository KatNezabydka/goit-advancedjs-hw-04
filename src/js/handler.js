import { galleryEl, loadMoreService, loadMoreBtnEl, params } from './utils/constants.js';
import { getPhotos } from './pixabay-api.js';
import { configureScroll, updateGallery } from './render-functions';
import { showErrorToast } from './utils/toast.js';

export async function handleSearch(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';
  params.page = 1;
  loadMoreService.init();

  const form = event.currentTarget;
  const userQuery = form.elements.user_query.value.trim();
  if (userQuery === '') {
    showErrorToast('Search can\'t be empty');
    form.reset();
    return;
  }
  params.query = userQuery;

  try {
    loadMoreService.showLoader();
    const data = await getPhotos(params);
    loadMoreService.hideLoader();

    if (data.total === 0) {
      galleryEl.innerHTML = '';
      showErrorToast('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    params.maxPage = Math.ceil(data.total / params.perPage);

    updateGallery(data);
    if (params.maxPage > params.page) {
      loadMoreService.showBtn();
      loadMoreBtnEl.addEventListener('click', handleLoadMore);
    }
  } catch (err) {
    console.log(err);
  } finally {
    form.reset();
  }
}

async function handleLoadMore() {
  params.page += 1;

  try {
    loadMoreService.setLoading();
    const data = await getPhotos(params);
    loadMoreService.hideLoader();

    updateGallery(data);
    configureScroll();

    if (params.maxPage === params.page) {
      loadMoreService.showLoaderNoMoreElement();
      loadMoreBtnEl.removeEventListener('click', handleLoadMore);
    } else {
      loadMoreService.showBtn();
    }
  } catch (err) {
    console.log(err);
  }
}