import { Injectable } from '@angular/core';
import { ElementLista } from '../model/elementLista';
import { MatTableDataSource } from '@angular/material/table';
//  import fs from '../module/fs'

// import fs from 'fs'

@Injectable({
  providedIn: 'root',
})
export class OperatiuniLista {


  private elementeLista: ElementLista[] = [];

  constructor() { }


  private elementLista: ElementLista = {
    id: 0,
    nume: '',
    cantitate: 0,
    unitateMasura: '',
    magazin: '',
    gata: false,
    detalii: ',',
  };

  adaugaInLista(comenzi: ElementLista) {

    this.elementeLista = [];
    if (localStorage?.getItem('data')) {
      this.elementeLista = JSON.parse(
        localStorage.getItem('data')?.valueOf() as string
      );
    }
    this.elementeLista.push(comenzi);
    this.salvareLista(this.elementeLista)
  }

  recuperareLista() {
    if (localStorage?.getItem('data')) {
      return JSON.parse(localStorage.getItem('data')?.valueOf() as string);
    }
  }

 stergeComanda(listaComenziSortata:MatTableDataSource<ElementLista>, id:number){
  this.salvareLista(listaComenziSortata.data.filter(a => a.id !== id))
  return listaComenziSortata.data.filter(a => a.id !== id)
 }

  recuperareComanda(id:number) :ElementLista{
   const elementeLista = this.recuperareLista() as ElementLista[];
   let elL!:ElementLista;
   elementeLista.filter(a => a.id === id)
   .map(a => elL = a )
    return elL;
  }

  modificareComanda(comanda:ElementLista){
    this.elementeLista = this.recuperareLista()
    let listaFictiva: ElementLista[] = [];
     this.elementeLista.map(
      a => {
        if(a.id === comanda.id){
          listaFictiva.push(comanda)
        }
        else{
          listaFictiva.push(a)
        }
      } 
    )
    
    this.salvareLista(listaFictiva)
  }

  salvareLista(comenzi: ElementLista[]){
    const comandaJSON = JSON.stringify(comenzi);
    localStorage.setItem('data', comandaJSON);
  }
}
