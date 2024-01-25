import { Routes } from '@angular/router';
import { AdaugaInListaComponent } from './adauga-in-lista/adauga-in-lista.component';
import { ListaCumparaturiComponent } from './lista-cumparaturi/lista-cumparaturi.component';
import { RouterComponent } from './router/router.component';
import { VeziDetaliiComponent } from './vezi-detalii/vezi-detalii.component';
import { FiltreComponent } from './filtre/filtre.component';
import { BunVenitComponent } from './bun-venit/bun-venit.component';
import { ArhivaComponent } from './arhiva/arhiva.component';
import { CreareListaProprieComponent } from './creare-lista-proprie/creare-lista-proprie.component';
import { CautareListeParticulareComponent } from './cautare-liste-particulare/cautare-liste-particulare.component';
import { VizualizareListaParticularaComponent } from './vizualizare-lista-particulara/vizualizare-lista-particulara.component';
import { AdaugaInListaParticularaComponent } from './adauga-in-lista-particulara/adauga-in-lista-particulara.component';
import { DespreComponent } from './despre/despre.component';
import { VizualizareDetaliuListaParticularaComponent } from './vizualizare-detaliu-lista-particulara/vizualizare-detaliu-lista-particulara.component';
import { FiltreListaPersonalizataComponent } from './filtre-lista-personalizata/filtre-lista-personalizata.component';

export const routes: Routes = [
  { path: '', redirectTo: '/bunvenit', pathMatch: 'full' },
  { path: 'bunvenit', component: BunVenitComponent },
  { path: 'listacumparaturi', component: ListaCumparaturiComponent },
  { path: 'adaugelement', component: AdaugaInListaComponent },
  { path: 'detalii/:id', component:VeziDetaliiComponent},
  { path: 'detalii/:arhiva/:id', component:VeziDetaliiComponent},
  { path: 'filtre', component: FiltreComponent},
  { path: 'arhiva', component : ArhivaComponent},
  { path: 'crearelista', component : CreareListaProprieComponent},
  { path : 'vizualizareListeParticulare', component : CautareListeParticulareComponent},
  { path : 'listaParticulara/:nume', component : VizualizareListaParticularaComponent},
  { path : 'adaugareElementListaParticulara/:nume', component :AdaugaInListaParticularaComponent},
  { path : 'despre', component :DespreComponent},
  { path : 'detaliiparticular/:nume', component:VizualizareDetaliuListaParticularaComponent},
  { path :'filtrepersonalizate/:nume', component:FiltreListaPersonalizataComponent},
];
