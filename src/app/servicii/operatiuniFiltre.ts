import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root',
})
export class OperatiuniFiltre{

    nume:string[] = [];
    magazin:string[] = [];
    filtru:boolean = false;
    private fixed = new BehaviorSubject<boolean>(false); // true is your initial value
    fixed$ = this.fixed.asObservable();

    alimenteazaNume(nume: string[]){
        this.nume = nume;
    }
    alimenteazaMagazin(magazin:string[]){
        console.log("magazin = ", magazin)
        this.magazin = magazin;
    }
    restituieNume() : string[]{
        return this.nume;
    }
    restituieMagazin() : string[]{
        return this.magazin;
    }
    modificaFiltruAdevarat(){
        this.fixed.next(true);
    }
    modificaFiltruFals(){
        this.fixed.next(false);
        this.alimenteazaNume([])
        this.alimenteazaMagazin([])
    }
}