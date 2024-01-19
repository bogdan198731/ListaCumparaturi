import { Routes } from '@angular/router';
import { AdaugaInListaComponent } from './adauga-in-lista/adauga-in-lista.component';
import { ListaCumparaturiComponent } from './lista-cumparaturi/lista-cumparaturi.component';
import { RouterComponent } from './router/router.component';
import { VeziDetaliiComponent } from './vezi-detalii/vezi-detalii.component';
import { FiltreComponent } from './filtre/filtre.component';
import { BunVenitComponent } from './bun-venit/bun-venit.component';
import { ArhivaComponent } from './arhiva/arhiva.component';
import { CreareListaProprieComponent } from './creare-lista-proprie/creare-lista-proprie.component';

export const routes: Routes = [
  { path: '', redirectTo: '/bunvenit', pathMatch: 'full' },
  { path: 'bunvenit', component: BunVenitComponent },
  { path: 'listacumparaturi', component: ListaCumparaturiComponent },
  { path: 'adaugelement', component: AdaugaInListaComponent },
  { path: 'detalii/:id', component:VeziDetaliiComponent},
  { path: 'detalii/:arhiva/:id', component:VeziDetaliiComponent},
  { path: 'filtre', component: FiltreComponent},
  { path: 'arhiva', component : ArhivaComponent},
  { path: 'crearelista', component : CreareListaProprieComponent}
];
