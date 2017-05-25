import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MissionDetailsPage } from '../pages/mission-details/mission-details';
import { MissionListPage } from '../pages/mission-list/mission-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MissionListServiceProvider } from '../providers/mission-list-service/mission-list-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';

import { HttpModule }    from '@angular/http';

/*
 * Configuring the deep links in the application
 * Invalid URLS are redirected to login page temporarily
 */
export const deepLinkConfig: DeepLinkConfig = {
  links: [
    { component: LoginPage, name: 'Login Page', segment: '*' },
    { component: LoginPage, name: 'Login Page', segment: 'login' },
    { component: DashboardPage, name: 'Dashboard Page', segment: 'dashboard' },
    { component: MissionListPage, name: 'Missions Page', segment: 'missions' },
    { component: MissionDetailsPage, name: 'Mission Details Page', segment: 'missions/:id', defaultHistory: [ MissionListPage ] },
  ]
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    MissionDetailsPage,
    MissionListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, deepLinkConfig),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    MissionDetailsPage,
    MissionListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    MissionListServiceProvider,
    LoadingServiceProvider
  ]
})
export class AppModule {}
