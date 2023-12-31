import { AfterViewInit, Component, ViewChild, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ElementLista } from '../model/elementLista';
import { OperatiuniLista } from '../servicii/operatiuniLista';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { OperatiuniFiltre } from '../servicii/operatiuniFiltre';
import { Subscription } from 'rxjs';
import { BunVenitComponent } from '../bun-venit/bun-venit.component';

@Component({
  selector: 'app-lista-cumparaturi',
  standalone: true,
  imports: [MatListModule, MatTableModule, MatSortModule, CommonModule, NgIf],
  templateUrl: './lista-cumparaturi.component.html',
  styleUrl: './lista-cumparaturi.component.css',
})
export class ListaCumparaturiComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  coloane: string[] = [
    'nume',
    'cantitate',
    'unitateMasura',
    'magazin',
    'gata',
    'sterge',
  ];
  public listaComenziSortata = new MatTableDataSource<ElementLista>();
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription();
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private manipulareLista: OperatiuniLista,
    private operatiuniLista: OperatiuniLista,
    private router: Router,
    private gestiuneFiltre:OperatiuniFiltre,
    private bunVenitComponent:BunVenitComponent,
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("NgOnchange")
    this.listaComenziSortata.data = this.manipulareLista.retituieListaLucru();

    if(this.gestiuneFiltre.filtru)
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
    }
  }
  ngOnInit(): void {
    console.log("NgOnInit")
    this.listaComenziSortata.data = this.manipulareLista.retituieListaLucru();

    if(this.gestiuneFiltre.filtru)
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
    }
    this.subscription = this.bunVenitComponent.reload$
    .subscribe(reload => {if(reload){
      this.listaComenziSortata.data = this.manipulareLista.retituieListaLucru()}})
  }

  ngAfterViewInit() {
    console.log("AfterInit")
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
    // this.listaComenziSortata.data
    //   .filter(a => a.id === id)
    //   .map(a => (a.gata = !a.gata));
      this.operatiuniLista.modificaStare(id);
  }

  sterge(id: number) {
    this.operatiuniLista.stergeComanda(id); 
    this.listaComenziSortata.data = this.operatiuniLista.retituieListaLucru()
   
  }
  veziDetali(id:number){

    this.router.navigate(['/detalii/'+ id]);

  }
}
