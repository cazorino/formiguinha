import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import _ from 'lodash';

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
    this.queryText = '';
    this.alimentos = [
      { nome: 'Arroz Branco', unidade: 'escumadeira', carbs: 80 },
      { nome: 'arroz integral', unidade: 'escumadeira', carbs: 50 },
      { nome: 'macarrão', unidade: 'pegador', carbs: 150 },
      { nome: 'macarrão com molho', unidade: 'pegador', carbs: 200 }
    ];

    this.allAlimentos = this.alimentos;
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
}
