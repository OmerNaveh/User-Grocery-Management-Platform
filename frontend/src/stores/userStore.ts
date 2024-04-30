import { action, computed, makeObservable, observable } from "mobx";
import { persistentService } from "lib/localStorage";
import { User } from "types/user";

class UserStore {
  user: User | null = null;

  constructor() {
    this.init = this.init.bind(this);
    this.setUser = this.setUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);

    makeObservable(
      this,
      {
        user: observable,
        isLoggedIn: computed,
        setUser: action,
        init: action,
        updateUser: action,
        logout: action,
      },
      { autoBind: true }
    );
  }

  init() {
    const user = persistentService.getItem("dash_user");
    if (!!user) {
      this.user = JSON.parse(user);
    }
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setUser(user: User) {
    this.user = user;
    persistentService.setItem("dash_user", JSON.stringify(user));
  }

  updateUser(userDetails: Partial<User>) {
    if (!this.user) return;
    this.user = { ...this.user, ...userDetails };
    persistentService.setItem("dash_user", JSON.stringify(this.user));
  }

  logout() {
    this.user = null;
    persistentService.removeItem("dash_user");
  }
}

const userStore = new UserStore();
export default userStore;
