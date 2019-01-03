import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comer',
  templateUrl: 'comer.html',
})
export class ComerPage {
  alimentos: Array<{nome: string; unidade: string; carbs: number}>;
  allAlimentos: any;
  queryText: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
