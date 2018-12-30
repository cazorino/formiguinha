import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConfigProvider, Fator, FatorList } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  model: Fator;
  key: string = "fatoresConfig";
  fatores: FatorList[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private configProvider: ConfigProvider) {
  }

  ionViewDidEnter() {
    this.configProvider.getAll()
      .then((results) => {
        this.fatores = results;
      });
  }

  filtraFator(item: FatorList) {
    return item.key.startsWith("fatoresConfig");
    /*if (item.key.startsWith("fatoresConfig")) {
      this.model.fs = item.fator.fs;
      this.model.fd = item.fator.fd;
      this.model.fc = item.fator.fc;
      return true;
    } else {
      this.model = new Fator();
      return false;
    }*/
  }

  save() {
    this.saveFator()
    .then(() => {
      this.presentToast("Valores salvos.");
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
