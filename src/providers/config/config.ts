import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigProvider {
  keyN: string = "fator_Config";
  
  constructor(private storage: Storage) { }

  //create
  public insert(fator: Fator) {
    return this.save(this.keyN, fator);
  }

  //update
  public update(fator: Fator) {
    return this.save(this.keyN, fator);
  }

  private save(key: string, fator: Fator) {
    return this.storage.set(key, fator);
  }


  //delete
  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {
    let fatores: FatorList[] = [];

    return this.storage.forEach((value: Fator, key: string, interationNumber: Number) => {
      let fator = new FatorList();
      fator.key = key;
      fator.fator = value;
      fatores.push(fator);
    })
      .then(() => {
        return Promise.resolve(fatores);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Fator {
  fs: number;
  fd: number;
  fc: number;
}

export class FatorList {
  key: string;
  fator: Fator;
}