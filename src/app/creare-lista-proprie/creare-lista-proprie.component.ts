import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListeParticulare } from '../servicii/listeParticulare';
import { ListaParticulara } from '../model/listaParticulara'
import { Router } from '@angular/router';

@Component({
  selector: 'app-creare-lista-proprie',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor,
    MatFormFieldModule, FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    forwardRef(() => CreareListaProprieComponent)
  ],
  providers: [
    {
      provide: { MatFormFieldControl, MatInput },
      useExisting: CreareListaProprieComponent,
        
    },
  ],
  templateUrl: './creare-lista-proprie.component.html',
  styleUrl: './creare-lista-proprie.component.scss'
})
export class CreareListaProprieComponent implements OnInit{
  formularDinamic: FormGroup[] = [];

  numeLista:string[] = [];
  listaSpecifica:ListaParticulara = {
    id: 0,
    nume: '',
    lista: new Map()
  }
test = "de ce ";
index = 0;
optiune :string = "Facultativ";

  constructor(private formBuilder: FormBuilder, private listeParticulare:ListeParticulare, 
    private router: Router,) { }
  nume = new FormControl('',Validators.required);
  campOK = new FormControl('',Validators.required);
  campKO = new FormControl('',Validators.required);
  public numeListaSpecifica: FormGroup = this.formBuilder.group(
    {
      nume: this.nume,

    },
    {
      updateOn: 'change',
    }
  );
  formOkKo :FormGroup = this.formBuilder.group(
   { campOk :this.campOK,
    campKo : this.campKO,
   },
   {
    updateOn: 'change',
   }
  )
  ngOnInit(): void {
    this.optiune = "Facultativ"
    this.adaugaCamp()
  }
  adaugaCamp() {
    if (this.index<=10){
    this.index++;
    const newForm = this.formBuilder.group({
      numeCamp: ['', Validators.required],
    });
  
    this.formularDinamic.push(newForm);}
  }

    stergeCamp(index: number) {
      this.index--;
      this.formularDinamic.splice(index, 1);
    }
    togleCamp(index: number){
      
    this.optiune = "Obligatoriu"
    }

  creareListNoua() {
    this.listaSpecifica.nume = this.nume.value as string;
    let index = 0;
    for (const form of this.formularDinamic.values()) {
      if (form.valid) {
        const val = form.value;   
        this.listaSpecifica.lista.set(index++, form.get('numeCamp')?.value);
      }
    }
    if(this.campOK.value){
    this.listaSpecifica.lista.set(98,this.campOK.value as string)
  }
    else{
      this.listaSpecifica.lista.set(98,"OK")
    }
    if(this.campKO.value){
      this.listaSpecifica.lista.set(99,this.campKO.value as string)
    }
      else{
        this.listaSpecifica.lista.set(99,"KO")
      }
    this.listaSpecifica.lista.set(100,'Detalii')
    this.listaSpecifica.lista.set(101,'index')
    this.listeParticulare.adaugareListaParticularaNoua(this.listaSpecifica);
    this.router.navigate(['/vizualizareListeParticulare']);
  }

}


