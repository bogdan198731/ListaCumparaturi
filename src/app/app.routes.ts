import { Routes } from '@angular/router';
import { AdaugaInListaComponent } from './adauga-in-lista/adauga-in-lista.component';
import { ListaCumparaturiComponent } from './lista-cumparaturi/lista-cumparaturi.component';
import { BunVenitComponent } from './bun-venit/bun-venit.component';

export const routes: Routes = [
    { path: '', redirectTo: '/bunvenit', pathMatch: 'full' },
    { path: 'bunvenit', component: BunVenitComponent },
    { path: 'listacumparaturi', component: ListaCumparaturiComponent },
    { path: 'adaugelement', component: AdaugaInListaComponent },
];
