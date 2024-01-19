import { Injectable } from '@angular/core';
import { ElementLista } from '../model/elementLista';
import { ListaParticulara } from '../model/listaParticulara'


@Injectable({
  providedIn: 'root',
})
export class ListePArticulare {


  private elementeLista: ListaParticulara[] = [];
  private elementeListaLucru: ListaParticulara[] = [];
  private elementArhiva!:ListaParticulara;
  private listeParticulare:string [] = [];

  constructor() { }


  private elementLista: ListaParticulara = {
      id: 0,
      nume: '',
      lista: new Map()
  }

  salvareListaParticulara(listaParticulara: ListaParticulara){

  }
  salavreListeParticulare(numeLista:string){
    this.listeParticulare = this.recuperareListaListeParticulare()
    localStorage.getItem
  }
  recuperareListaListeParticulare():string[]{
    return localStorage.getItem('listeParticulare')
  }

  adaugaInListaParticulara(comanda: ListaParticulara) {

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
  alimenteazaListaLucru(listaLucru:ListaParticulara[]){
    this.elementeListaLucru = listaLucru;
    
  }

 stergeComanda( id:number){
//   this.elementeListaLucru.filter(index => index.id == id).forEach(
//     el => this.adaugaInArhiva(el)
//   )
  
  this.elementeListaLucru = this.elementeListaLucru.filter(index => index.id !== id)
  this.salvareLista();

 }

  recuperareComanda(id:number) :ElementLista{
   const elementeLista = this.elementeListaLucru;
   let elL!:ElementLista;
//    elementeLista.filter(a => a.id === id)
//    .map(a => elL = a )
    return elL;
  }

  modificaStare(id: number) {
    // this.elementeListaLucru
    //   .filter(a => a.id === id)
    //   .map(a => (a.gata = !a.gata));
      this.salvareLista();
  }

  modificareComanda(comanda:ElementLista){
    const index = this.elementeListaLucru.findIndex(index => index.id === comanda.id)
    // this.elementeListaLucru[index] = comanda;
    this.salvareLista();
  }

  salvareLista(){
    const comandaJSON = JSON.stringify(this.elementeListaLucru);
    localStorage.setItem('data', comandaJSON);
  }
//   salvareInMemorieElementArhiva(elArhiva: ElementLista)
//   {
//     this.elementArhiva = elArhiva;
//   }
//   returnareElementArhiva():ElementLista
//   {
//     return this.elementArhiva;
//   }
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
