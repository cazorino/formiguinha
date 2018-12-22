import { Component } from '@angular/core';

import { RefeicaoPage } from '../refeicao/refeicao';
import { CalculoRapidoPage } from '../calculo-rapido/calculo-rapido';
import { ControlePage } from '../controle/controle';
import { ConfigPage } from '../config/config';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RefeicaoPage;
  tab2Root = CalculoRapidoPage;
  tab3Root = ControlePage;
  tab4Root = ConfigPage;

  constructor() {

  }
}