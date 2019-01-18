import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { PesquisarPage } from '../pesquisar/pesquisar';
import { AlimentosProvider, AlimentoList } from '../../providers/alimentos/alimentos';
import { Refeicao } from '../../providers/refeicao/refeicao';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-comer',
  templateUrl: 'comer.html',
})

export class ComerPage {
  alimentos: AlimentoList[];
  refeicao: Refeicao;
  resultado: number;
  resultadoGlicemia: number;
  resultadoCarbs: number;
  somaCarbs: number = 0;
  glicemia: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              private alimentosProvider: AlimentosProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private storage: Storage) {
    // pega dados da refeição escolhida  
    this.storage.get('escolhaRefeicao_').then((val) => {
      this.refeicao = val;
    });
  }

  ionViewDidEnter() {
    this.alimentosProvider.getAll()
      .then((results) => {
        this.alimentos = results;
      });
  }

  calcular() {
    if (this.glicemia != null && this.glicemia != "" && this.glicemia != undefined) {
      try {
        //calculo Glicemia
        this.resultadoGlicemia = (this.glicemia - this.refeicao.fatorSub) / this.refeicao.fatorDiv;
        //calculo carbs
        this.alimentos.forEach(element => {
          if (this.filtraMeusAlimentos(element)) {
            this.somaCarbs = this.somaCarbs + (element.alimento.carbs * element.alimento.quantidade);
          }
        });
        this.resultadoCarbs = this.somaCarbs / this.refeicao.fatorCarb;
        //resultado final
        this.resultado = this.resultadoGlicemia + this.resultadoCarbs;
        //exibe resultado
        let alert = this.alertCtrl.create({
          title: 'Resultado',
          subTitle: '<br>Aplique <b>' + this.resultado + ' UI </b>',
          message: 'Resultado da Glicemia: ' + this.resultadoGlicemia + '<b> + </b>Resultado do CHO: ' + this.resultadoCarbs,
          buttons: [
            {
              text: 'Descartar',
              role: 'cancel',
            },
            {
              text: 'Salvar',
              handler: () => {
                console.log('Agree clicked');
              }
            }
          ]
        });
        alert.present();
        this.limpaMeusAlimentos();
      } catch (error) {
        let alert = this.alertCtrl.create({
          title: 'Erro! :(',
          subTitle: 'Apresente este erro ao desenvolvedor',
          message: error,
          buttons: ['OK']
        });
        alert.present();
      }
    } else {
      this.presentToast("Insira o valor da sua glicemia");
    }
  }

  limpaMeusAlimentos() {
    //limpa todos os meus alimentos da lista
    this.alimentos.forEach(element => {
      if (this.filtraMeusAlimentos(element)) {
        this.removeAlimento(element);
      } 
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
      });
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
