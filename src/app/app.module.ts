import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

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
    { component: HelloIonicPage, name: 'Dashboard Page', segment: 'dashboard' },
    { component: ListPage, name: 'Missions Page', segment: 'missions' },
    { component: ItemDetailsPage, name: 'Mission Details Page', segment: 'missions/:id', defaultHistory: [ ListPage ] },
  ]
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
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
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
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
