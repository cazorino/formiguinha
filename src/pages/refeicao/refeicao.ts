import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RefeicaoProvider, RefeicaoList } from '../../providers/refeicao/refeicao';
import { EditaRefeicaoPage } from '../edita-refeicao/edita-refeicao';
import { ComerPage } from '../comer/comer';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-refeicao',
  templateUrl: 'refeicao.html',
})
export class RefeicaoPage {
  refeicoes: RefeicaoList[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private refeicaoProvider: RefeicaoProvider,
              private toastCtrl: ToastController,
              private storage: Storage) {
  }

  ionViewDidEnter() {
    this.refeicaoProvider.getAll()
      .then((results) => {
        this.refeicoes = results;
      });
  }

  filtraRefeicao(item: RefeicaoList) {
    return item.key.startsWith("refeicao_");
  }

  comer(item: RefeicaoList) {
    this.storage.set("escolhaRefeicao_", item.refeicao);
    this.navCtrl.push(ComerPage);
  }

  addRefeicao(n: string) {
    this.navCtrl.push(EditaRefeicaoPage, { n });
  }

  editRefeicao(item: RefeicaoList) {
    this.navCtrl.push(EditaRefeicaoPage, { key: item.key, refeicao: item.refeicao });
  }

  removeRefeicao(item: RefeicaoList) {
    this.refeicaoProvider.remove(item.key)
      .then(() => {
        let index = this.refeicoes.indexOf(item);
        this.refeicoes.splice(index, 1);
        this.presentToast("Refeição Excluída.");
      });
  }

  presentToast(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }
}
