import { Component } from '@angular/core';

import { RefeicaoPage } from '../refeicao/refeicao';
import { CalculoRapidoPage } from '../calculo-rapido/calculo-rapido';
import { ControlePage } from '../controle/controle';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RefeicaoPage;
  tab2Root = CalculoRapidoPage;
  tab3Root = ControlePage;

  constructor() {

  }
}