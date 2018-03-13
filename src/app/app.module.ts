import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InterceptorModule } from '../interceptors/interceptor.module';
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';
    
import { CarsPage } from '../pages/cars/cars';
import { ApiProvider } from '../providers/api/api';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CarsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    InterceptorModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CarsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
