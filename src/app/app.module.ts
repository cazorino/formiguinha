import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RefeicaoPage } from '../pages/refeicao/refeicao';
import { CalculoRapidoPage } from '../pages/calculo-rapido/calculo-rapido';
import { ControlePage } from '../pages/controle/controle';

@NgModule({
  declarations: [
    MyApp,
    RefeicaoPage,
    CalculoRapidoPage,
    ControlePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RefeicaoPage,
    CalculoRapidoPage,
    ControlePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
