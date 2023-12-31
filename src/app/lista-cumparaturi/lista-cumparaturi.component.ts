import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ElementLista } from '../model/elementLista';
import { OperatiuniLista } from '../servicii/operatiuniLista';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-lista-cumparaturi',
  standalone: true,
  imports: [MatListModule, MatTableModule, MatSortModule, CommonModule, NgIf],
  templateUrl: './lista-cumparaturi.component.html',
  styleUrl: './lista-cumparaturi.component.css'
})
export class ListaCumparaturiComponent implements  AfterViewInit,OnInit {
  coloane: string[] = ['nume', 'cantitate', 'unitateMasura', 'magazin', 'gata', 'sterge'];
  public listaComenziSortata = new MatTableDataSource<ElementLista>();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private manipulareLista: OperatiuniLista, private operatiuniLista:OperatiuniLista,) {

  }
  ngOnInit(): void {
    this.listaComenziSortata.data = this.manipulareLista.recuperareLista();
    console.log("listaComenzi onInit", this.listaComenziSortata)
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
    console.log("anounce sort")
  }

  modificaStare(id:number){
    console.log("id = ",id)
    console.log(this.listaComenziSortata.data.
      filter(a => a.id === id))
    this.listaComenziSortata.data.
    filter(a => a.id === id).map(a=> a.gata = !a.gata)

  }

  sterge(id:number){
    const listaFictiva =  this.listaComenziSortata.data.filter(a => a.id !== id)
    this.listaComenziSortata.data = listaFictiva
    this.operatiuniLista.scrieInLista(listaFictiva);

    // this.router.navigate(['/listacumparaturi'])

  }
}