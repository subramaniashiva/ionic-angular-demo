import { User } from './auth-service';

export class AuthServiceProviderMock {

  public login() {}

  private handleError() {}

  public getUserInfo(): User {
    return {name: '', gender: ''};
  }

  public logout() {}
}
