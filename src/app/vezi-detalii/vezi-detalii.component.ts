import { Component, OnInit, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatiuniLista } from '../servicii/operatiuniLista';
import { ElementLista } from '../model/elementLista';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdaugaInListaComponent } from '../adauga-in-lista/adauga-in-lista.component';

@Component({
  selector: 'app-vezi-detalii',
  standalone: true,
  imports: [MatListModule, 
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
    forwardRef(() => AdaugaInListaComponent),],
  templateUrl: './vezi-detalii.component.html',
  styleUrl: './vezi-detalii.component.scss'
})
export class VeziDetaliiComponent implements OnInit {

  private comanda: ElementLista = {
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

  nume = new FormControl('',Validators.required);
  cantitate = new FormControl('',[Validators.pattern(/^-?([0-9]\d*)?$/), Validators.required]);
  unitateMasura = new FormControl('');
  magazin = new FormControl('', Validators.required);
  detalii = new FormControl('');


  public formularComanda: FormGroup = this.formBilder.group(
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

  constructor(private route: ActivatedRoute, private operatiuniLista: OperatiuniLista, private formBilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.index = Number(param.get("id"))
        this.comanda = this.operatiuniLista.recuperareComanda(Number(this.index));
        this.nume.setValue(this.comanda.nume);
        this.cantitate.setValue(this.comanda.cantitate as unknown as string);
        this.unitateMasura.setValue(this.comanda.unitateMasura);
        this.magazin.setValue(this.comanda.magazin);
        this.detalii.setValue(this.comanda.detalii);
      }
    );

  }

  private elementLista: ElementLista = {
    id: 0,
    nume: '',
    cantitate: 0,
    unitateMasura: '',
    magazin: '',
    gata: false,
    detalii: ',',
  };



  modificComanda() {
    this.elementLista.nume = this.formularComanda.get('nume')?.value;
    this.elementLista.cantitate = this.formularComanda.get('cantitate')?.value;
    this.elementLista.unitateMasura = this.formularComanda.get('unitateMasura')?.value;
    this.elementLista.magazin = this.formularComanda.get('magazin')?.value;
    this.elementLista.detalii = this.formularComanda.get('detalii')?.value;
    this.elementLista.gata = false;
    this.elementLista.id = this.index;
    this.operatiuniLista.modificareComanda(this.elementLista)
    this.router.navigate(['/listacumparaturi']);
  }

}
