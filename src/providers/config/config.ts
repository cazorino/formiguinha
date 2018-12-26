import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigProvider {
  constructor(private storage: Storage) { }

  //create
  public insert(fator: Fator) {
    return this.save(fator);
  }

  //update
   public update(fator: Fator) {
    return this.save(fator);
  }

  private save(fator: Fator) {
    return this.storage.set(fator.name, fator);
  }

  //delete
  public remove(key: string) {
    return this.storage.remove(key);
  }

  //select
  public select(key: string) {
    return this.storage.get(key);
  }
}

export class Fator {
  name: string = "fatoresConfig";
  fs: number;
  fd: number;
  fc: number;
}