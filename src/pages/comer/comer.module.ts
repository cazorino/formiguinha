import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComerPage } from './comer';

@NgModule({
  declarations: [
    ComerPage,
  ],
  imports: [
    IonicPageModule.forChild(ComerPage),
  ],
})
export class ComerPageModule {}
