import { Injectable } from '@angular/core';
import { ElementLista } from '../model/elementLista';
//  import fs from '../module/fs'

// import fs from 'fs'


@Injectable({
  providedIn: 'root',
})
export class OperatiuniLista {


  constructor() { }

  scrieInLista(comenzi: ElementLista[]) {

    console.log("test scrie Json")
    var comandaJSON = JSON.stringify(comenzi);

    localStorage.setItem("data", comandaJSON);
    console.log("test comandaJSON ", comandaJSON)

  }

  recuperareLista() {

    if (localStorage?.getItem("data")) {
      return JSON.parse(localStorage.getItem("data")?.valueOf() as string);
      
    }
  }

}
