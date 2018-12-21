import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ControlePage } from './controle';

@NgModule({
  declarations: [
    ControlePage,
  ],
  imports: [
    IonicPageModule.forChild(ControlePage),
  ],
})
export class ControlePageModule {}
