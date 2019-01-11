import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesquisarPage } from './pesquisar';

@NgModule({
  declarations: [
    PesquisarPage,
  ],
  imports: [
    IonicPageModule.forChild(PesquisarPage),
  ],
})
export class PesquisarPageModule {}
