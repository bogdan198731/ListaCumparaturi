import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ElementLista } from '../model/elementLista';
import { OperatiuniLista } from '../servicii/operatiuniLista';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OperatiuniFiltre } from '../servicii/operatiuniFiltre';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RouterComponent } from '../router/router.component';

@Component({
  selector: 'app-lista-cumparaturi',
  standalone: true,
  imports: [MatListModule, MatTableModule, MatSortModule, CommonModule, NgIf,
    RouterLink],
  templateUrl: './lista-cumparaturi.component.html',
  styleUrl: './lista-cumparaturi.component.scss',
})
export class ListaCumparaturiComponent implements OnInit, OnDestroy {
  coloane: string[] = [
    'nume',
    'cantitate',
    'unitateMasura',
    'magazin',
    'gata',
    'sterge',
  ];
  isFixed: boolean = false;
  // subscription: Subscription = new Subscription();

  private reload = new BehaviorSubject<boolean>(false); // true is your initial value
  reload$ = this.reload.asObservable();
  public listaComenziSortata = new MatTableDataSource<ElementLista>();
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription();
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private manipulareLista: OperatiuniLista,
    private operatiuniLista: OperatiuniLista,
    private router: Router,
    private gestiuneFiltre:OperatiuniFiltre,
    private routerComponent:RouterComponent,
    private operatiuniFiltre : OperatiuniFiltre
  ) {}


  ngOnInit(): void {
    this.listaComenziSortata.data = this.manipulareLista.retituieListaLucru();
    this.subscription = this.routerComponent.reload$
    .subscribe(reload => {if(!reload){
      {this.gestiuneFiltre.filtru = false;
        if(this.gestiuneFiltre.restituieNume().length > 0)
        { const nume = this.gestiuneFiltre.restituieNume();
          this.listaComenziSortata.data = this.listaComenziSortata.data.filter(
            comanda => nume.includes(comanda.nume)
          )
        }
        if(this.gestiuneFiltre.restituieMagazin().length > 0)
        { const magazin = this.gestiuneFiltre.restituieMagazin();
          this.listaComenziSortata.data = this.listaComenziSortata.data.filter( 
            comanda => magazin.includes(comanda.magazin)
          )
        }
        if(this.gestiuneFiltre.restituieStatus().length > 0){
          const status = this.gestiuneFiltre.restituieStatus();
          this.listaComenziSortata.data = this.listaComenziSortata.data.filter( 
            comanda => status.includes(comanda.gata)
          )
        }
      }
    }
    })
    this.subscription = this.operatiuniFiltre.fixed$
    .subscribe(fixed => this.isFixed = fixed)
  }

  ngAfterViewInit() {
    this.listaComenziSortata.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.operatiuniLista.salvareLista();
    this.subscription.unsubscribe();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  modificaStare(id: number) {
    this.operatiuniLista.modificaStare(id);
  }

  sterge(id: number) {
    this.operatiuniLista.stergeComanda(id); 
    this.listaComenziSortata.data = this.operatiuniLista.retituieListaLucru()
  }
  veziDetali(id:number){
    this.router.navigate(['/detalii/'+ id]);
  }
  scoateFiltre(){  
    this.listaComenziSortata.data = this.manipulareLista.retituieListaLucru()
    this.operatiuniFiltre.modificaFiltruFals();
    this.reload.next(true)
    this.router.navigate(['/listacumparaturi']);
  }
  adaugaFiltre(){  
    this.router.navigate(['/filtre']);
    this.reload.next(false)
  }
}
