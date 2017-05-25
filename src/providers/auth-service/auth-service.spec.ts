import { User } from './auth-service';

export class AuthServiceProviderMock {

  public login() {}

  public getUserInfo(): User {
    return {name: '', gender: ''};
  }

  public logout() {}
}
