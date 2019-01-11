import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RefeicaoPage } from '../pages/refeicao/refeicao';
import { CalculoRapidoPage } from '../pages/calculo-rapido/calculo-rapido';
import { ControlePage } from '../pages/controle/controle';
import { ConfigPage } from '../pages/config/config';
import { ConfigProvider } from '../providers/config/config';
import { RefeicaoProvider } from '../providers/refeicao/refeicao';
import { EditaRefeicaoPage } from '../pages/edita-refeicao/edita-refeicao';
import { ComerPage } from '../pages/comer/comer';
import { PesquisarPage } from '../pages/pesquisar/pesquisar';

@NgModule({
  declarations: [
    MyApp,
    RefeicaoPage,
    CalculoRapidoPage,
    ControlePage,
    ConfigPage,
    ComerPage,
    EditaRefeicaoPage,
    PesquisarPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RefeicaoPage,
    CalculoRapidoPage,
    ControlePage,
    ConfigPage,
    ComerPage,
    EditaRefeicaoPage,
    PesquisarPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    RefeicaoProvider
  ]
})
export class AppModule {}
