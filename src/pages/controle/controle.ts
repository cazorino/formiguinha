import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ControleProvider, ControleList } from '../../providers/controle/controle';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@IonicPage()
@Component({
  selector: 'page-controle',
  templateUrl: 'controle.html',
})
export class ControlePage {
  pdfObj = null;
  nomeCompleto: string;
  idade: number;
  hospital: string;
  medico: string;
  controles: ControleList[];
  bodyData = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private plt: Platform, 
              private file: File, 
              private fileOpener: FileOpener,
              private controleProvider: ControleProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private datepipe: DatePipe,) { 
            
  }

  ionViewDidEnter() {
    this.controleProvider.getAll()
      .then((results) => {
        this.controles = results;
      });
  }

  limpar() {
    let alert = this.alertCtrl.create({
      title: 'Tem certeza?',
      message: 'Você quer mesmo deletar todos os registros?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim, eu quero',
          handler: () => {
            this.controles.forEach(element => {
              if (element.key.startsWith("controle_")) {
                this.controleProvider.remove(element.key)
                  .then(() => {
                    let index = this.controles.indexOf(element);
                    this.controles.splice(index, 1);
                  });
              }
            });
            this.presentToast("Os registros foram deletados!");
          }
        }
      ]
    });
    alert.present();
  }

  criarPdf() {
    var data = this.datepipe.transform(new Date(), "dd/MM/yyyy");
    this.controles.forEach(element => {
      var dataRow = [];
      if (element.key.startsWith("controle_")) {
        dataRow.push(element.controle.data);
        dataRow.push(element.controle.horario);
        dataRow.push(element.controle.nomeRefeicao);
        dataRow.push(element.controle.qtdCarbsConsumidos);
        dataRow.push(element.controle.resultadoInsulinaCarbs);
        dataRow.push(element.controle.resultadoInsulinaGlicemia);
        dataRow.push(element.controle.glicemiaExame);
        this.bodyData.push(dataRow);
      }   
    });

    var docDefinition = {
      content: [
        { text: 'Relatório de Contagem de Carboidratos', style: 'header', alignment: 'center' },

        { text: 'Gerado em ' + data + ' às ' + new Date().toTimeString(), alignment: 'right' },
        { text: 'via aplicativo "Formiguinha", faça o download em: link', alignment: 'right' },
  
        { text: '-----------------------------------------------------------------------------------------------------------------------------------------------', style: 'story', margin: [0, 15, 0, 15] },

        { text: 'Paciente: ' + this.nomeCompleto, style: 'subheader' },
        { text: 'Idade: ' + this.idade + ' anos', style: 'subheader' },
        { text: 'Hospital: ' + this.hospital, style: 'subheader' },
        { text: 'Médico: ' + this.medico, style: 'subheader' },

        { text: '-----------------------------------------------------------------------------------------------------------------------------------------------', style: 'story', margin: [0, 15, 0, 15] },
        { text: 'Registro do Controle Glicêmico', bold: true, alignment: 'center', fontSize: 12, margin: [0, 15, 0, 18] },
        { text: 'Descrição da ordem das colunas:', bold: true },
        { text: 'Data - Horário - Refeição - CHO Consumidos - Insulina Contagem - Insulina Correção - Glicemia', margin: [0, 15, 0, 15] },
        {
          table: {
            body: this.bodyData 
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 15]
        },
        subheader: {
          fontSize: 12,
          margin: [0, 15, 0, 0]
        },
        story: {
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.presentToast("PDF criado!");
  }

  baixarPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer);
        var binaryArray = utf8.buffer;
        var blob = new Blob([binaryArray], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'relatorio_Contagem_Carboidratos.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'relatorio_Contagem_Carboidratos.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
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
