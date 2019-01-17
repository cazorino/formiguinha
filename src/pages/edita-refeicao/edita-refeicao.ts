import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RefeicaoProvider, Refeicao } from '../../providers/refeicao/refeicao';

@IonicPage()
@Component({
  selector: 'page-edita-refeicao',
  templateUrl: 'edita-refeicao.html',
})
export class EditaRefeicaoPage {
  model: Refeicao;
  key: string;
  n: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private refeicaoProvider: RefeicaoProvider,
              private toastCtrl: ToastController) {
    this.n = navParams.get('n');
    if (this.navParams.data.refeicao && this.navParams.data.key) {
      this.model = this.navParams.data.refeicao;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Refeicao();
    }
  }
  
  save() {
    if (this.validaFatores()) {
      this.saveRefeicao()
        .then(() => {
          this.presentToast("Refeição salva.");
          this.navCtrl.pop();
        })
        .catch(() => {
          this.presentToast("Erro ao salvar a refeição.");
        })
    }
  }

  private saveRefeicao() {
    if(this.key) {
      return this.refeicaoProvider.update(this.key, this.model);
    } else {
      return this.refeicaoProvider.insert(this.model);
    }
  }

  validaFatores() {
    var retorno: boolean = true;
    // verifica nome
    if (this.model.name == "" || this.model.name == null || this.model.name == undefined) {
      this.presentToast("Coloque um nome para sua refeição!");
      retorno = false;
    }
    //verificação se fatores são vazios ou nulos
    if (this.model.fatorSub == 0 || this.model.fatorSub == null || this.model.fatorSub == undefined) {
      this.presentToast("Configure os fatores desta refeição corretamente!");
      retorno = false;
    }
    if (this.model.fatorDiv == 0 || this.model.fatorDiv == null || this.model.fatorDiv == undefined) {
      this.presentToast("Configure os fatores desta refeição corretamente!");
      retorno = false;
    }
    if (this.model.fatorCarb == 0 || this.model.fatorCarb == null || this.model.fatorCarb == undefined) {
      this.presentToast("Configure os fatores desta refeição corretamente!");
      retorno = false;
    }
    return retorno;
  }

  presentToast(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }
}
