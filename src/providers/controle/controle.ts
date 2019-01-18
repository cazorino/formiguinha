import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class ControleProvider {
  keyN: string;

  constructor(private storage: Storage,
              private datepipe: DatePipe) {

  }

  public insert(controle: Controle) {
    let datahora = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    this.keyN = "controle_" + datahora;
    return this.save(this.keyN, controle);
  }

  public update(key: string, controle: Controle) {
    return this.save(key, controle);
  }

  private save(key: string, controle: Controle) {
    return this.storage.set(key, controle);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {
    let controles: ControleList[] = [];

    return this.storage.forEach((value: Controle, key: string, interationNumber: Number) => {
      let controle = new ControleList();
      controle.key = key;
      controle.controle = value;
      controles.push(controle);
    })
      .then(() => {
        return Promise.resolve(controles);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Controle {
  data: string;
  nomeRefeicao: string;
  qtdCarbsConsumidos: number;
  resultadoInsulinaCarbs: number;
  resultadoInsulinaGlicemia: number;
  glicemiaExame: number;
}

export class ControleList {
  key: string;
  controle: Controle;
}
