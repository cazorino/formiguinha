import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class RefeicaoProvider {
  keyN: string;

  constructor(private storage: Storage) {

  }

  public insert(refeicao: Refeicao) {
    this.keyN = refeicao.name;
    return this.save(this.keyN, refeicao);
  }

  public update(key: string, refeicao: Refeicao) {
    return this.save(key, refeicao);
  }

  private save(key: string, refeicao: Refeicao) {
    return this.storage.set(key, refeicao);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {
    let refeicoes: RefeicaoList[] = [];

    return this.storage.forEach((value: Refeicao, key: string, interationNumber: Number) => {
      let refeicao = new RefeicaoList();
      refeicao.key = key;
      refeicao.refeicao = value;
      refeicoes.push(refeicao);
    })
      .then(() => {
        return Promise.resolve(refeicoes);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Refeicao {
  name: string;
  fatorSub: number;
  fatorDiv: number;
  fatorCarb: number;
}

export class RefeicaoList {
  key: string;
  refeicao: Refeicao;
}
