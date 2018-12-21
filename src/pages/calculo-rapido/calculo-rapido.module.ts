import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculoRapidoPage } from './calculo-rapido';

@NgModule({
  declarations: [
    CalculoRapidoPage,
  ],
  imports: [
    IonicPageModule.forChild(CalculoRapidoPage),
  ],
})
export class CalculoRapidoPageModule {}
