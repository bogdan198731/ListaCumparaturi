import { Injectable } from '@angular/core';
import { ElementLista } from '../model/elementLista';


@Injectable({
  providedIn: 'root',
})
export class OperatiuniLista {


  private elementeLista: ElementLista[] = [];
  private elementeListaLucru: ElementLista[] = [];
  private elementArhiva!:ElementLista;

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

  adaugaInLista(comanda: ElementLista) {

    this.elementeLista = [];
    if (localStorage?.getItem('data')) {
      this.elementeLista = JSON.parse(
        localStorage.getItem('data')?.valueOf() as string
      );
    }
    this.elementeListaLucru.push(comanda);
    this.salvareLista();
  }

  recuperareLista() {
    if (localStorage?.getItem('data')) {
      this.elementeListaLucru = JSON.parse(localStorage.getItem('data')?.valueOf() as string);
    }
  }

  retituieListaLucru(){
    return this.elementeListaLucru;
  }
  alimenteazaListaLucru(listaLucru:ElementLista[]){
    this.elementeListaLucru = listaLucru;
    
  }

 stergeComanda( id:number){
  this.elementeListaLucru.filter(index => index.id == id).forEach(
    el => this.adaugaInArhiva(el)
  )
  
  this.elementeListaLucru = this.elementeListaLucru.filter(index => index.id !== id)
  this.salvareLista();

 }

  recuperareComanda(id:number) :ElementLista{
   const elementeLista = this.elementeListaLucru;
   let elL!:ElementLista;
   elementeLista.filter(a => a.id === id)
   .map(a => elL = a )
    return elL;
  }

  modificaStare(id: number) {
    this.elementeListaLucru
      .filter(a => a.id === id)
      .map(a => (a.gata = !a.gata));
      this.salvareLista();
  }

  modificareComanda(comanda:ElementLista){
    const index = this.elementeListaLucru.findIndex(index => index.id === comanda.id)
    this.elementeListaLucru[index] = comanda;
    this.salvareLista();
  }

  salvareLista(){
    const comandaJSON = JSON.stringify(this.elementeListaLucru);
    localStorage.setItem('data', comandaJSON);
  }
  salvareInMemorieElementArhiva(elArhiva: ElementLista)
  {
    this.elementArhiva = elArhiva;
  }
  returnareElementArhiva():ElementLista
  {
    return this.elementArhiva;
  }
  adaugaInArhiva(comanda:ElementLista)
  {
    let arhiva:ElementLista[] = []
    if (localStorage?.getItem('arhiva')) {
      arhiva = JSON.parse(localStorage.getItem('arhiva')?.valueOf() as string);
    }
    arhiva.push(comanda)
    localStorage.setItem('arhiva', JSON.stringify(arhiva));
  }
  recuperareArhiva() : ElementLista[]
  {
    if (localStorage?.getItem('arhiva')) {
      return JSON.parse(localStorage.getItem('arhiva')?.valueOf() as string);
    }
    return [];
  }
}
