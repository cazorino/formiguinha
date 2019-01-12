import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-pesquisar',
  templateUrl: 'pesquisar.html',
})

export class PesquisarPage {
  alimentos: Array<{nome: string; unidade: string; carbs: number}>;
  allAlimentos: any;
  queryText: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              private alertCtrl: AlertController) {
    this.queryText = '';
    this.inicializarAlimentos();

    this.allAlimentos = this.alimentos;
  }

  selecionaAlimento(alimento: any) {
    this.presentPrompt(alimento);
  }

  presentPrompt(alimento: any) {
    let alert = this.alertCtrl.create({
      title: 'Quantas ' + alimento.unidade + '?',
      inputs: [
        {
          name: 'unit',
          placeholder: 'quantidade de ' + alimento.unidade,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: data => {
            this.navCtrl.getPrevious().data.meuAlimento = 'funcionou';
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  filterAlimento(ali: any) {
    const val = ali.target.value;
      
    if (val && val.trim() != '') {
      this.alimentos = _.values(this.allAlimentos);
      this.alimentos = this.alimentos.filter((alimento) => {
        return (alimento.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.alimentos = this.allAlimentos;
    }
  }
  

  inicializarAlimentos() {
    this.alimentos = [
      { nome: 'Arroz Branco', unidade: 'escumadeiras', carbs: 80 },
      { nome: 'arroz integral', unidade: 'escumadeiras', carbs: 50 },
      { nome: 'macarrão', unidade: 'pegadores', carbs: 150 },
      { nome: 'macarrão com molho', unidade: 'pegadores', carbs: 200 }
    ];
  }
}
