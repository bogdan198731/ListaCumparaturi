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

  constructor(private formBuilder: FormBuilder, private listeParticulare:ListeParticulare) { }
  nume = new FormControl('',Validators.required);
  public numeListaSpecifica: FormGroup = this.formBuilder.group(
    {
      nume: this.nume,
    },
    {
      updateOn: 'change',
    }
  );
  // nume = new FormControl('',Validators.required);
  cantitate = new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/), Validators.required]);
  unitateMasura = new FormControl('');
  magazin = new FormControl('', Validators.required);
  detalii = new FormControl('');
  public formularComanda: FormGroup = this.formBuilder.group(
    {
      nume: this.nume,
      cantitate: this.cantitate,
      unitateMasura: this.unitateMasura,
      magazin: this.magazin,
      detalii: this.detalii,
    },
    {
      updateOn: 'change',
    }
  );
  ngOnInit(): void {

    this.adaugaCamp()
    this.adaugaCamp2()
  }
  adaugaCamp2() {
    let nume = new FormControl('',Validators.required);
    // const newForm = this.formBuilder.add({
      // Define your form controls here
    //   numeCamp: ['', Validators.required],
    // });
    this.formularComanda.addControl('test', this.magazin);
  }
  adaugaCamp() {
    const newForm = this.formBuilder.group({
      // Define your form controls here
      numeCamp: ['', Validators.required],
    });
    this.formularDinamic.push(newForm);
  }

    stergeCamp(index: number) {
      this.formularDinamic.splice(index, 1);
    }

  creareListNoua() {
    console.log("nume lista : ", this.nume.value)
    this.listaSpecifica.nume = this.nume.value as string;
    let index = 0;
    // let map :Map<number,string> = new Map();
    for (const form of this.formularDinamic.values()) {
      if (form.valid) {
        const val = form.value;
        
        console.log('Form submitted:', form.get('numeCamp')?.value);
        
        
        this.listaSpecifica.lista.set(index++, form.get('numeCamp')?.value);
      
        
      } else {
        console.log('Form is invalid');
      }
    }
    console.log("test noua : ", this.listaSpecifica)
    this.listeParticulare.adaugareListaParticularaNoua(this.listaSpecifica);
  }
}
