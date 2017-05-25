import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MissionListPage } from '../pages/mission-list/mission-list';

// Interface for page component.
export interface PageComponentInterface {
  title: string,
  component: any,
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make Login page the root (or first) page.
  rootPage = LoginPage;

  pages: Array<PageComponentInterface>;

  /**
   * @constructor
   * @param {Platform} platform
   * @param {MenuController} menu
   * @param {StatusBar} statusBar
   * @param {SplashScreen} splashScreen
   * @param {AuthServiceProvider} auth
   * @param {LoadingServiceProvider} loadingService
   */
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthServiceProvider,
    public loadingService: LoadingServiceProvider
  ) {
    this.initializeApp();

    // set our app's pages for the side nav menu.
    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Photos', component: DashboardPage },
      { title: 'Available Missions', component: MissionListPage },
      { title: 'My Missions', component: DashboardPage },
      { title: 'Chat', component: DashboardPage },
    ];
  }

  /**
   * Initializes the app.
   * Hides the splash screen after the platform is ready.
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  /**
   * Open a specific page.
   * Closes the menu before opening the page.
   * @param {pageComponentInterface} page - Page to be opened.
   */
  openPage(page:PageComponentInterface) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }


  /**
   * Logs out the user from the application.
   * Calls the logoout method from auth service.
   */
  logout() {
    this.loadingService.showLoading();
    this.auth.logout().then((val) => {
      if(val) {
        this.openPage({title: 'Logout', component: LoginPage});
      }
    }).catch((err) => {
      // Ideally should be logged to error logging service
      console.error('error while loggin out ', err);
    });
    this.loadingService.dismissLoading();
  }

}
