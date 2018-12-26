import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConfigProvider, Fator } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  model: Fator;
  key: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private configProvider: ConfigProvider) {
    if (this.navParams.data.Fator && this.navParams.data.key) {
      this.model = this.navParams.data.refeicao;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Fator();
    }
  }

  save() {
    this.saveFator()
    .then(() => {
      this.presentToast("Valores salvos.");
      this.navCtrl.pop();
    })
    .catch(() => {
      this.presentToast("Erro ao salvar os valores.");
    })
  }
  
  private saveFator() {
    if(this.key) {
      return this.configProvider.update(this.model);
    } else {
      return this.configProvider.insert(this.model);
    }
  }

  presentToast(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

}
