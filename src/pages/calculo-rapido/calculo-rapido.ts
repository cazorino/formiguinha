import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConfigPage } from '../config/config';
import { ConfigProvider, FatorList } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-calculo-rapido',
  templateUrl: 'calculo-rapido.html',
})
export class CalculoRapidoPage {
  tipoCalculo: any;
  carboidratos: any;
  glicemia: any;
  resultado: number;
  resultadoG: number;
  resultadoC: number;
  disabledC: boolean;
  disabledG: boolean;
  //fatores 
  fs: number;
  fd: number;
  fc: number;
  fatores: FatorList[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private configProvider: ConfigProvider) {  }

  ionViewDidEnter() {
    this.configProvider.getAll()
      .then((results) => {
        this.fatores = results;
      });
    try {
      this.fatores.forEach(element => {
        if (element.key.startsWith("fatoresConfig")) {
          this.fs = element.fator.fs;
          this.fd = element.fator.fd;
          this.fc = element.fator.fc;
        }
        //verificação se fatores são vazios ou nulos
        if (this.fs == 0 || this.fs == null || this.fs == undefined) {
          this.presentToast("Configure os fatores antes de usar essa função");
          this.navCtrl.push(ConfigPage);
        }
        if (this.fd == 0 || this.fd == null || this.fd == undefined) {
          this.presentToast("Configure os fatores antes de usar essa função");
          this.navCtrl.push(ConfigPage);
        }
        if (this.fc == 0 || this.fc == null || this.fc == undefined) {
          this.presentToast("Configure os fatores antes de usar essa função");
          this.navCtrl.push(ConfigPage);
        }
      });
    } catch(err) {
      this.presentToast("Configure os fatores antes de usar essa função");
      this.navCtrl.push(ConfigPage);
    }
  }      


  presentToast(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  calcular() {
    if (this.tipoCalculo == null) {
      this.presentToast("Selecione um tipo de cálculo");
    }
    if (this.tipoCalculo == "G") {
      if (this.glicemia == null || this.glicemia == "") {
          this.presentToast("Insira o valor da sua glicemia");
          this.resultado = null;
      } else {
        this.resultado = (this.glicemia - 50) / 150;
      }
    }
    if (this.tipoCalculo == "C") {
      if (this.carboidratos == null || this.carboidratos == "") {
        this.presentToast("Insira o valor de carboidratos consumidos");
        this.resultado = null;
      } else {
        this.resultado = this.carboidratos / 400;
      }
    }
    if (this.tipoCalculo == "A") {
      if (this.glicemia == null || this.carboidratos == null || this.glicemia == "" || this.carboidratos == "") {
        this.presentToast("Os valores de carboidrato e glicemia não podem ficar vazios");
        this.resultado = null;
      } else {
        this.resultadoG = (this.glicemia - 50) / 100;
        this.resultadoC = this.carboidratos / 100;
        this.resultado = this.resultadoG + this.resultadoC;
      }
    }
  }

  mudouSelect(valor: any) {
    this.glicemia, this.carboidratos, this.resultado = null;
    if (valor == "G") {
      this.disabledC = true;
      this.disabledG = false;
    }
    if (valor == "C") {
      this.disabledC = false;
      this.disabledG = true;
    }
    if (valor == "A") {
      this.disabledG = false;
      this.disabledC = false;
    }
  }
}
