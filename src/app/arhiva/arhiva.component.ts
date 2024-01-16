import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
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
import { RouterComponent } from '../router/router.component';

@Component({
  selector: 'app-arhiva',
  standalone: true,
  imports: [MatListModule, MatTableModule, MatSortModule, CommonModule, NgIf],
  templateUrl: './arhiva.component.html',
  styleUrl: './arhiva.component.css'
})
export class ArhivaComponent  implements OnInit {
  coloane: string[] = [
    'nume',
    'cantitate',
    'unitateMasura',
    'magazin',
    'gata',
    // 'sterge',
  ];
  public listaComenziSortata = new MatTableDataSource<ElementLista>();
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription();
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private manipulareLista: OperatiuniLista,
    private router: Router,
    private gestiuneFiltre:OperatiuniFiltre,
    private routerComponent:RouterComponent,
  ) {}


  ngOnInit(): void {
    this.listaComenziSortata.data = this.manipulareLista.recuperareArhiva();

  }

  ngAfterViewInit() {
    this.listaComenziSortata.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  veziDetali(id:number){
    this.manipulareLista.salvareInMemorieElementArhiva(this.listaComenziSortata.data.filter(el=> el.id === id)[0])
    const arhiva = 'arhiva'
    this.router.navigate(['/detalii/' + arhiva + id]);

  }
}

