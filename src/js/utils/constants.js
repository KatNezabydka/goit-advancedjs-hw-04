import LoadMoreService from './load-more-service.js';

export const searchFormEl = document.querySelector('.js-search-form');
export const galleryEl = document.querySelector('.js-gallery');
export const loadMoreBtnEl = document.querySelector('.js-load-more');
export const loaderEl = document.querySelector('.loader')

export const params = {
  page: 1,
  perPage: 15,
  maxPage: 1,
  query: '',
};
export const loadMoreService = new LoadMoreService(loadMoreBtnEl, loaderEl);
