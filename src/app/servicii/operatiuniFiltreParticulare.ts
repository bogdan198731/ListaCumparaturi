import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root',
})
export class OperatiuniFiltreParticulare{
    workMap: Map<string,string[]> = new Map();
    nume:string[] = [];
    magazin:string[] = [];
    status:boolean[] = [];
    filtru:boolean = false;
    private fixed = new BehaviorSubject<boolean>(false); // true is your initial value
    fixed$ = this.fixed.asObservable();


    modificaFiltruAdevarat(){
        this.filtru = true;
        this.fixed.next(this.filtru);
        
    }
    modificaFiltruFals(){
        this.filtru = false;
        this.fixed.next(this.filtru);
        this.workMap = new Map();
    }
    alimentareWorkMap(workMap: Map<string,string[]>){
        this.modificaFiltruAdevarat()
        this.workMap = workMap;
    }
    returnareWorkMap(): Map<string,string[]>{
        return this.workMap;
    }
}