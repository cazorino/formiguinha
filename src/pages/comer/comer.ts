import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { PesquisarPage } from '../pesquisar/pesquisar';

@IonicPage()
@Component({
  selector: 'page-comer',
  templateUrl: 'comer.html',
})

export class ComerPage {
  alimentos: Array<{nome: string; unidade: string; carbs: number}>;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    //this.alimento = this.navParams.get('meuAlimento');
  }

  pesquisar() {
    let myModal = this.modalCtrl.create(PesquisarPage);
    myModal.present();
  }
}
