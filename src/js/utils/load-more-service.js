export default class LoadMoreService {
  static HIDDEN_CLASS = 'is-hidden';

  constructor(buttonEl, loaderEl) {
    this.button = buttonEl;
    this.loader = loaderEl;
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

  setMoreBtn(){
    this.showBtn();
    this.hideLoader()
  }

  showLoaderNoMoreElement() {
    this.prevText = this.loader.textContent;
    this.loader.textContent = "We're sorry, but you've reached the end of search results.";
  }

  setLoaderNormal() {
    this.loader.textContent = this.prevText;
  }
}

