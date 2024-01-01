import { CommonModule } from '@angular/common';
import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import {
  MatFormFieldModule,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { OperatiuniLista } from '../servicii/operatiuniLista';
import { ElementLista } from '../model/elementLista';
import { OperatiuniFiltre } from '../servicii/operatiuniFiltre';
import { ListaCumparaturiComponent } from '../lista-cumparaturi/lista-cumparaturi.component';


@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    forwardRef(() => FiltreComponent),
  ],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.css'
})

export class FiltreComponent implements OnInit{
  numeLista:string[] = [];
  magazinLista:string[] = [];

  nume = new FormControl('');
  numeSalvat = new FormControl('');
  magazin = new FormControl('');
  magazinSalvat = new FormControl('');
  listaComenzi:ElementLista[] = [];

  constructor(    private formBilder: FormBuilder,
    private operatiuniLista: OperatiuniLista,
    private router: Router,
    private gestiuneFiltre:OperatiuniFiltre,

    ){

  }
  ngOnInit(): void {
    this.numeLista = [];
    this.magazinLista = [];
    this.listaComenzi = this.operatiuniLista.retituieListaLucru();
    this.listaComenzi.forEach(el => 
      { this.numeLista.push(el.nume)
        this.magazinLista.push(el.magazin)
    })
    this.numeLista = [... new Set(this.numeLista)];
    this.magazinLista = [... new Set(this.magazinLista)];
    
  }

  aplicaFiltre(){
    const numeBrut  = this.nume.value as unknown as string[];
    let numeLocal:string[] = [];
    const magazinBrut = this.magazin.value as unknown as string[];
    let magazinLocal:string[] = [];
    try{

      numeLocal = numeBrut;

  }
    catch{
      numeLocal = []
    }
    try{
      magazinLocal = magazinBrut; 
    }
    catch{
      magazinLocal = [];
    }

    this.gestiuneFiltre.alimenteazaNume(numeLocal);
    this.gestiuneFiltre.alimenteazaMagazin(magazinLocal);
    this.gestiuneFiltre.filtru = true
    this.gestiuneFiltre.modificaFiltruAdevarat();    
    this.router.navigate(['/listacumparaturi']);
  }

}
