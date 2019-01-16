import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { PesquisarPage } from '../pesquisar/pesquisar';
import { AlimentosProvider, AlimentoList } from '../../providers/alimentos/alimentos';

@IonicPage()
@Component({
  selector: 'page-comer',
  templateUrl: 'comer.html',
})

export class ComerPage {
  alimentos: AlimentoList[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              private alimentosProvider: AlimentosProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.alimentosProvider.getAll()
      .then((results) => {
        this.alimentos = results;
      });
  }

  filtraMeusAlimentos(item: AlimentoList) {
    return item.key.startsWith("meusAlimentos_");
  }

  removeAlimento(item: AlimentoList) {
    this.alimentosProvider.remove(item.key)
      .then(() => {
        let index = this.alimentos.indexOf(item);
        this.alimentos.splice(index, 1);
        this.presentToast("Alimento removido.");
      })
  }

  pesquisar() {
    let myModal = this.modalCtrl.create(PesquisarPage);
    myModal.present();
  }

  doRefresh(refresher) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  
  presentToast(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

}
