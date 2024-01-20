import { Component, forwardRef } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldModule,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { ElementLista } from '../model/elementLista';
import { OperatiuniLista } from '../servicii/operatiuniLista';
import { Router } from '@angular/router';
import { ListeParticulare } from '../servicii/listeParticulare';


@Component({
  selector: 'app-adauga-in-lista-particulara',
  standalone: true,
  imports: [    MatFormFieldModule,
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
    forwardRef(() => AdaugaInListaParticularaComponent),],
  templateUrl: './adauga-in-lista-particulara.component.html',
  styleUrl: './adauga-in-lista-particulara.component.scss'
})
export class AdaugaInListaParticularaComponent {

  private elementLista: ElementLista = {
    id: 0,
    nume: '',
    cantitate: 0,
    unitateMasura: '',
    magazin: '',
    gata: false,
    detalii: ',',
  };

  index = 0;

  private elementeLista: ElementLista[] = [];

  camp1 = new FormControl('',Validators.required);
  camp2 = new FormControl('', [Validators.required]);
  camp3 = new FormControl('');
  camp4 = new FormControl('', Validators.required);
  camp5 = new FormControl('');

  constructor(
    private formBilder: FormBuilder,
    private operatiuniLista: OperatiuniLista,
    private router: Router,
    private listeParticulare :ListeParticulare,
  ) { 
  }

  public formularComanda: FormGroup = this.formBilder.group(
    {
      nume: this.camp1,
      cantitate: this.camp2,
      unitateMasura: this.camp3,
      magazin: this.camp4,
      detalii: this.camp5,
    },
    {
      updateOn: 'change',
    }
  );
  
  adaugInLista() {
  
    if (localStorage?.getItem('index')) {
      this.index = Number(localStorage?.getItem('index')) + 1;
    } else {
      this.index = 1;
    }


    this.elementLista.nume = this.formularComanda.get('camp1')?.value;
    this.elementLista.cantitate = this.formularComanda.get('camp2')?.value;
    this.elementLista.unitateMasura =
      this.formularComanda.get('camp3')?.value;
    this.elementLista.magazin = this.formularComanda.get('camp4')?.value;
    this.elementLista.detalii = this.formularComanda.get('camp5')?.value;
    this.elementLista.gata = false;
    this.elementLista.id = this.index;
    localStorage.setItem('index', this.index.toString());
    // this.elementeLista.push(this.elementLista);

    this.operatiuniLista.adaugaInLista(this.elementLista);
    this.router.navigate(['/listacumparaturi']);
  }
}

