import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
// import { AdaugaInListaComponent } from './adauga-in-lista/adauga-in-lista.component';
// import { ListaCumparaturiComponent } from './lista-cumparaturi/lista-cumparaturi.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { OperatiuniLista } from '../servicii/operatiuniLista';
import { OperatiuniFiltre } from '../servicii/operatiuniFiltre';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-router',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
     ],
  templateUrl: './router.component.html',
  styleUrl: './router.component.scss',
})
export class RouterComponent implements OnInit, OnDestroy{

  isFixed: boolean = false;
  subscription: Subscription = new Subscription();

  private reload = new BehaviorSubject<boolean>(false); // true is your initial value
  reload$ = this.reload.asObservable();

  constructor(private operatiuniLista: OperatiuniLista, private operatiuniFiltre : OperatiuniFiltre, private router: Router, ){
    this.operatiuniLista.recuperareLista();
  }
  ngOnInit(): void {
    this.subscription = this.operatiuniFiltre.fixed$
    .subscribe(fixed => this.isFixed = fixed)
  }
  ngOnDestroy(): void {
    this.operatiuniLista.salvareLista();
    this.subscription.unsubscribe();
  }
  scoateFiltre(){  
    this.operatiuniFiltre.modificaFiltruFals();
    this.reload.next(true)
    this.router.navigate(['/listacumparaturi']);

  }
  adaugaFiltre(){  
    this.router.navigate(['/filtre']);
    this.reload.next(false)

  }

}
