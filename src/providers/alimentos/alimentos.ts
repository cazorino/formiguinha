import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AlimentosProvider {
  keyN: string;

  constructor(private storage: Storage) {

  }
  
  public insert(alimento: Alimento) {
    this.keyN = "meusAlimentos_" + alimento.nome;
    return this.save(this.keyN, alimento);
  }

  public update(key: string, alimento: Alimento) {
    return this.save(key, alimento);
  }

  private save(key: string, alimento: Alimento) {
    return this.storage.set(key, alimento);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {
    let alimentos: AlimentoList[] = [];

    return this.storage.forEach((value: Alimento, key: string, interationNumber: Number) => {
      let alimento = new AlimentoList();
      alimento.key = key;
      alimento.alimento = value;
      alimentos.push(alimento);
    })
      .then(() => {
        return Promise.resolve(alimentos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Alimento {
  nome: string;
  unidade: string;
  carbs: number;
  quantidade: number;
}

export class AlimentoList {
  key: string;
  alimento: Alimento;
}

