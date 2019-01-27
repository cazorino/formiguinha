import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RefeicaoProvider, RefeicaoList } from '../../providers/refeicao/refeicao';
import { EditaRefeicaoPage } from '../edita-refeicao/edita-refeicao';
import { ComerPage } from '../comer/comer';
import { Storage } from '@ionic/storage';
import { ControleProvider, Controle } from '../../providers/controle/controle';
import { DatePipe } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-refeicao',
  templateUrl: 'refeicao.html',
})
export class RefeicaoPage {
  refeicoes: RefeicaoList[];
  controle: Controle;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private refeicaoProvider: RefeicaoProvider,
              private controleProvider: ControleProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private datepipe: DatePipe,
              private storage: Storage) {
  }

  ionViewDidEnter() {
    this.refeicaoProvider.getAll()
      .then((results) => {
        this.refeicoes = results;
      });
  }

  presentPrompt(item: RefeicaoList) {
    let alert = this.alertCtrl.create({
      title: 'Qual o valor da glicemia pós 2 horas?',
      inputs: [
        {
          name: 'gli',
          placeholder: 'valor da glicemia',
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
            this.controle = new Controle();
            this.controle.data = this.datepipe.transform(new Date(), "dd/MM/yyyy");
            this.controle.horario = this.datepipe.transform(new Date(), "HH:mm");
            this.controle.nomeRefeicao = item.refeicao.name + ' - Pós';
            this.controle.qtdCarbsConsumidos = null;
            this.controle.resultadoInsulinaCarbs = null;
            this.controle.resultadoInsulinaGlicemia = null;
            this.controle.glicemiaExame = data.gli;
            this.controleProvider.insert(this.controle);
            this.presentToast("Valor da glicemia inserido!");
          }
        }
      ]
    });
    alert.present();
  }

  remover(item: RefeicaoList) {
    let alert = this.alertCtrl.create({
      title: 'Tem certeza?',
      message: 'Você quer mesmo remover essa refeição?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim, eu quero',
          handler: () => {
            this.removeRefeicao(item);
          }
        }
      ]
    });
    alert.present();
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
