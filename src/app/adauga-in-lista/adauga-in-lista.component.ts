import { Component, forwardRef } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule, MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatInput, MatInputModule } from '@angular/material/input';
import { ElementLista } from '../model/elementLista';
import { OperatiuniLista } from '../servicii/operatiuniLista';
import { Router } from '@angular/router';





@Component({
  selector: 'app-adauga-in-lista',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, 
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    forwardRef(() => AdaugaInListaComponent), 
    ],
  templateUrl: './adauga-in-lista.component.html',
  styleUrl: './adauga-in-lista.component.scss',
  providers:[{provide: {MatFormFieldControl, MatInput}, useExisting: AdaugaInListaComponent}]
})


export class AdaugaInListaComponent {

  private elementLista:ElementLista = {
    id:0,
    nume:"",
    cantitate:0,
    unitateMasura: "",
    magazin:"",
    gata:false,
    detalii:","
};

index = 0;

private elementeLista:ElementLista[] = [];

  nume = new FormControl("")
  cantitate = new FormControl("")
  unitateMasura = new FormControl("")
  magazin = new FormControl("")
  detalii = new FormControl("")
 
  constructor( private formBilder :FormBuilder, private operatiuniLista:OperatiuniLista,
    private router: Router){ }

public formularComanda : FormGroup = this.formBilder.group(
   {nume:this.nume,
    cantitate:this.cantitate,
    unitateMasura:this.unitateMasura,
    magazin:this.magazin,
    detalii:this.detalii,
   },
   {
    updateOn:'change' 
   }

)


  adaugInLista()
  { if (localStorage?.getItem("index"))
   {this.index = Number(localStorage?.getItem("index")) + 1}
   else{this.index = 1}
   

    this.elementeLista = []
    if(localStorage?.getItem("data"))
    {
    console.log("test comandaJSON ", localStorage?.getItem("data"))
    this.elementeLista = JSON.parse(localStorage.getItem("data")?.valueOf() as string);
    console.log("test dublu ", this.elementeLista)
  }
    this.elementLista.nume = this.formularComanda.get('nume')?.value
    this.elementLista.cantitate = this.formularComanda.get('cantitate')?.value
    this.elementLista.unitateMasura = this.formularComanda.get('unitateMasura')?.value
    this.elementLista.magazin = this.formularComanda.get('magazin')?.value
    this.elementLista.detalii = this.formularComanda.get('detalii')?.value
    this.elementLista.gata = false;
    this.elementLista.id = this.index;
    localStorage.setItem("index", this.index.toString())
    this.elementeLista.push(this.elementLista)
   
    this.operatiuniLista.scrieInLista(this.elementeLista);
    this.router.navigate(['/listacumparaturi'])
  } 

}
