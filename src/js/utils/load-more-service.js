export default class LoadMoreService {
  static HIDDEN_CLASS = 'is-hidden';

  constructor(buttonEl, loaderEl) {
    this.button = buttonEl;
    this.loader = loaderEl;
  }

  init(){
    this.hideBtn();
    this.setLoaderNormal();
    this.hideLoader();
  }
  hideBtn() {
    this.button.classList.add(LoadMoreService.HIDDEN_CLASS);
  }

  showBtn() {
    this.button.classList.remove(LoadMoreService.HIDDEN_CLASS);
  }

  hideLoader() {
    this.loader.classList.add(LoadMoreService.HIDDEN_CLASS);
  }

  showLoader() {
    this.loader.classList.remove(LoadMoreService.HIDDEN_CLASS);
  }

  setLoading() {
    this.hideBtn();
    this.showLoader();
  }

  showLoaderNoMoreElement() {
    this.loader.textContent = "We're sorry, but you've reached the end of search results.";
    this.showLoader()
  }

  setLoaderNormal() {
    this.loader.textContent = "Loading images, please wait...";
  }
}

