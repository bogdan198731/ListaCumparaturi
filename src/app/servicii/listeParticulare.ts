import { Injectable } from '@angular/core';
import { ElementLista } from '../model/elementLista';
import { ListaParticulara } from '../model/listaParticulara'


@Injectable({
    providedIn: 'root',
})
export class ListeParticulare {


    private elementeLista: ListaParticulara[] = [];
    private elementeListaLucru: ListaParticulara[] = [];
    private elementArhiva!: ListaParticulara;
    private listeParticulare: string[] = [];
    private comandaParticularaLucru :Map<string,string> = new Map() 
    workMap: Map<string,string[]> = new Map();

    constructor() { }

    private elementLista: ListaParticulara = {
        id: 0,
        nume: '',
        lista: new Map()
    }

    adaugareListaParticularaNoua(listaParticulara: ListaParticulara) {
        this.adaugareNumeInListaListeParticulare(listaParticulara.nume);
        this.adaugareStructuraListaParticulara(listaParticulara);
    }

    adaugareStructuraListaParticulara(listaParticulara: ListaParticulara) {
        localStorage.setItem(listaParticulara.nume, JSON.stringify(Array.from(listaParticulara.lista.entries())));
    }

    recuperareStructuraListaParticulara(nume: string) :Map<number,string> {
        const structuraSalvata = localStorage.getItem(nume);
        if(structuraSalvata){
            const intrariMap:[number,string][] = JSON.parse(structuraSalvata);
            return new Map(intrariMap);
        }
            return new Map();
    }

    adaugareNumeInListaListeParticulare(nume: string) {
        let numeListeParticulare: string[] = []
        numeListeParticulare = this.recuperareNumeListeParticulare();
        numeListeParticulare.push(nume)
        this.salvareNumeListeParticulare(numeListeParticulare)
        
    }

    salvareNumeListeParticulare(numeListeParticulare: string[]) {
        localStorage.setItem('numeListeParticulare', JSON.stringify(numeListeParticulare));
    }
    
    recuperareNumeListeParticulare() {
        if(localStorage.getItem('numeListeParticulare'))
        { return JSON.parse(
            localStorage.getItem('numeListeParticulare')?.valueOf() as string
        );}
        else{
            return [];
        }
    }
    recuperareComponenteListaParticulara(nume: string) : Map<string, string>[]{
        if(localStorage.getItem(nume + 'componente'))
        { const retrievedData = localStorage.getItem(nume+ 'componente') as string;
            const deserializedArray = JSON.parse(retrievedData) as Array<[string, string][]>;
            const arrayOfMaps: Array<Map<string, string>> = deserializedArray.map(entries => new Map(entries));
            return arrayOfMaps
        }
        else{
            return [];
        }
    }


    salvareComponeneteListaParticulara(nume:string, componenteListaParticulara: Array<Map<string,string>>) {
        const serializableArray = componenteListaParticulara.map(map => Array.from(map.entries())); 
        localStorage.setItem(nume+"componente", JSON.stringify(serializableArray));
    }
    salavreListeParticulare(numeLista: string) {
        this.listeParticulare = this.recuperareListaListeParticulare()
        localStorage.getItem
    }

    recuperareListaListeParticulare(): string[] {
        return JSON.parse(localStorage.getItem('listeParticulare')?.valueOf() as string);
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

    retituieListaLucru() {
        return this.elementeListaLucru;
    }
    alimenteazaListaLucru(listaLucru: ListaParticulara[]) {
        this.elementeListaLucru = listaLucru;

    }

    alimenteazaComandaParticularaLucru(comanda:Map<string,string>)
    {
        this.comandaParticularaLucru = comanda;
    }
    returneazaComandaParticularaLucru() :Map<string,string>{
        return this.comandaParticularaLucru;
    }
    stergeComanda(id: number) {
        this.elementeListaLucru = this.elementeListaLucru.filter(index => index.id !== id)
        this.salvareLista();
    }

    recuperareComanda(id: number): ElementLista {
        const elementeLista = this.elementeListaLucru;
        let elL!: ElementLista;
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

    modificareComanda(comanda: ElementLista) {
        const index = this.elementeListaLucru.findIndex(index => index.id === comanda.id)
        // this.elementeListaLucru[index] = comanda;
        this.salvareLista();
    }

    salvareLista() {
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
    adaugaInArhiva(comanda: ElementLista) {
        let arhiva: ElementLista[] = []
        if (localStorage?.getItem('arhiva')) {
            arhiva = JSON.parse(localStorage.getItem('arhiva')?.valueOf() as string);
        }
        arhiva.push(comanda)
        localStorage.setItem('arhiva', JSON.stringify(arhiva));
    }
    recuperareArhiva(): ElementLista[] {
        if (localStorage?.getItem('arhiva')) {
            return JSON.parse(localStorage.getItem('arhiva')?.valueOf() as string);
        }
        return [];
    }
}


