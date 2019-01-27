import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { PesquisarPage } from '../pesquisar/pesquisar';
import { AlimentosProvider, AlimentoList } from '../../providers/alimentos/alimentos';
import { Refeicao } from '../../providers/refeicao/refeicao';
import { Storage } from '@ionic/storage';
import { Controle, ControleProvider } from '../../providers/controle/controle';
import { DatePipe } from '@angular/common';

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
  controle: Controle;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              private alimentosProvider: AlimentosProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private storage: Storage,
              private datepipe: DatePipe,
              private controleProvider: ControleProvider,
              public loadingCtrl: LoadingController) {
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
          subTitle: '<br>Aplique <b>' + this.resultado.toFixed(2) + ' UI </b>',
          message: 'Resultado da Glicemia: ' + this.resultadoGlicemia.toFixed(2) + '<b> + </b>Resultado do CHO: ' + this.resultadoCarbs.toFixed(2),
          buttons: [
            {
              text: 'Descartar',
              role: 'cancel',
            },
            {
              text: 'Salvar',
              handler: () => {
                this.controle = new Controle();
                this.controle.data = this.datepipe.transform(new Date(), "dd/MM/yyyy");
                this.controle.horario = this.datepipe.transform(new Date(), "HH:mm");
                this.controle.nomeRefeicao = this.refeicao.name;
                this.controle.qtdCarbsConsumidos = this.somaCarbs;
                this.controle.resultadoInsulinaCarbs = this.resultadoCarbs.toFixed(2);
                this.controle.resultadoInsulinaGlicemia = this.resultadoGlicemia.toFixed(2);
                this.controle.glicemiaExame = this.glicemia;
                this.controleProvider.insert(this.controle);
                this.presentToast("Dados salvos. Até a próxima refeição!");
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
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Abrindo lista de alimentos...'
    });

    loading.present();

    setTimeout(() => {
      let myModal = this.modalCtrl.create(PesquisarPage);
      myModal.present();
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 4000);
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
