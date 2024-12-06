import {makeAutoObservable} from "mobx";

class AppStatusStore {
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this)
  }

  callApi() {
    this.isLoading = true;
  }

  completeApi() {
    this.isLoading = false;
  }
}

const appStatusStore = new AppStatusStore();
export default appStatusStore;