import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

import { MissionListPage } from '../mission-list/mission-list';

// Messages related to login screen
const messages = {
  loading: 'Loading...',
  OkButton: 'OK',
  signUp: 'Sign Up',
  forgotPass: 'Forgot Password',
  fbSignIn: 'FB Sign In',
  termsCond: 'Terms and Conditions',
  clickedTerms: 'Clicked Terms and Conditions',
  clickedFbSign: 'Clicked FB Sign In',
  clickedforPass: 'Clicked Forgot Password',
  clickedSignUp: 'Clicked SignUp',
  loginfailed: 'Login Failed',
  emailPassWrong: 'Email or Password is Wrong',
  error: 'Error',
  defaultAlert: 'Alert'
};

/**
 * @interface - User credential
 * @param {string} email - Email of the user.
 * @param {string} password - Password of the user.
 */
interface CredentialsInterface {
  email: string,
  password: string
}

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

/**
 * Class Managing the Login Page of the application.
 */
export class LoginPage {

  // Credentials of the user.
  credentials:CredentialsInterface = { email: '', password: ''};

  /**
   * @constructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {AuthServiceProvider} auth
   * @param {AlertController} alertCtrl
   * @param {LoadingServiceProvider} loadingService
   */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthServiceProvider,
    public alertCtrl: AlertController,
    public loadingService: LoadingServiceProvider) {
  }


  /**
   * Shows the alert window to the user.
   * @param {string} title - Title of the alert. Default is Alert.
   * @param {string} subTitle - Body of the alert.
   */
  showAlert(title:string=messages.defaultAlert, subTitle:string) {
    let alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: [messages.OkButton]
    });

    alert.present(prompt);
  }


  /**
   * Invoked when clicking the SignUp button.
   * Shows an alert for now.
   * Implementation pending.
   */
  public signUp() {
    this.loadingService.showLoading(messages.loading);
    this.showAlert(messages.signUp, messages.clickedSignUp);
    this.loadingService.dismissLoading();
  }

  /**
   * Invoked when clicking the forgot password button.
   * Shows an alert for now.
   * Implementation pending.
   */
  public forgotPass() {
    this.loadingService.showLoading(messages.loading);
    this.showAlert(messages.forgotPass, messages.clickedforPass);
    this.loadingService.dismissLoading();
  }

  /**
   * Invoked when clicking the FB Signin button.
   * Shows an alert for now.
   * Implementation pending.
   */
  public fbSignIn() {
    this.loadingService.showLoading(messages.loading);
    this.showAlert(messages.fbSignIn, messages.clickedFbSign);
    this.loadingService.dismissLoading();
  }

  /**
   * Invoked when clicking the terms and conditions button.
   * Shows an alert for now.
   * Implementation pending.
   */
  public termsConditions() {
    this.showAlert(messages.termsCond, messages.clickedTerms);
  }


  /**
   * Invoked when clicking the login buttin.
   * Shows a loading screen and invokes the Auth Service.
   * If succesful from Auth Service, move to List View page.
   * If not succesful from Auth Service, shows an alert.
   */
  public login() {
    this.loadingService.showLoading(messages.loading);
    this.auth.login(this.credentials)
      .then((res) => {
        if(res) {
          this.navCtrl.setRoot(MissionListPage);
        } else {
          this.showAlert(messages.loginfailed, messages.emailPassWrong);
        }
      })
      .catch((err) => {
        this.showAlert(messages.error, err);
      })
      .then(() => {
        this.loadingService.dismissLoading();
      });
  }

}
