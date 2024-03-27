import { CommonModule } from '@angular/common';
import { Component, OnInit, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ListeParticulare } from '../servicii/listeParticulare';
import { OperatiuniFiltre } from '../servicii/operatiuniFiltre';
import { CustomStringSort } from '../utile/custom-string-sort';
import { OperatiuniFiltreParticulare } from '../servicii/operatiuniFiltreParticulare';

@Component({
  selector: 'app-filtre-lista-personalizata',
  standalone: true,
  imports: [MatFormFieldModule,
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

    forwardRef(() => FiltreListaPersonalizataComponent),],
  templateUrl: './filtre-lista-personalizata.component.html',
  styleUrl: './filtre-lista-personalizata.component.css'
})
export class FiltreListaPersonalizataComponent implements OnInit {

  nume = "";
  struncturaLista: Map<number, string> = new Map;
  listaParticulara: Array<Map<string, string>> = [];
  objectKeys = Object.keys;
  numeFormControl: FormControl[] = [];
  myForm!: FormGroup;
  workMap: Map<string, string[]> = new Map();
  mapW: Map<string, number> = new Map();
  mapM: Map<number, string> = new Map();
  lucru: string[] = []
  arrayLucru: Array<Array<string[]>> = [];


  constructor(private formBilder: FormBuilder,
    private serviciuListeParticulare: ListeParticulare,
    private serviciuFiltreParticulare: OperatiuniFiltreParticulare,
    private router: Router,
    private route: ActivatedRoute,
    private gestiuneFiltre: OperatiuniFiltre,
    private customStringSort: CustomStringSort,
  ) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.nume = param.get("nume") as string;
        this.struncturaLista = this.serviciuListeParticulare.recuperareStructuraListaParticulara(String(param.get("nume")))
        this.listaParticulara = this.serviciuListeParticulare.recuperareComponenteListaParticulara(this.nume);
        this.myForm = this.createFormGroup()
      }
    )
    // this.testMap.set("test",)
  }
  createFormGroup() {
    const group: any = {};
    let index = 0;
    this.struncturaLista.forEach((value, key) => {
      if (!((key === 98) || (key === 99) || (key === 101) || (key === 100))) { group[value] = new FormControl(value); }
      if (group[value]) {
        this.mapM.set(index, value);
        this.mapW.set(value, index);
        index++;
        this.numeFormControl.push(new FormControl(value));
      }
    });
    this.mapM.set(index, 'status');
    this.mapW.set('status', index);
    this.listaParticulara.forEach(
      map => {
        map.forEach(
          (value: string, key: string) => {
            if (this.mapW.has(key)) {
              if (this.workMap.get(key)) {
                this.lucru = this.workMap.get(key) as string[];
              }
              else {
                this.lucru = [];
              }

              this.lucru.push(value)
              this.workMap.set(key, this.lucru);
            }
          }
        )
      }
    )
    { group['status'] = new FormControl('status'); }
    this.numeFormControl.push(new FormControl('status'));
    this.lucru = [];
    this.lucru.push(this.struncturaLista.get(98) as string)
    this.lucru.push(this.struncturaLista.get(99) as string)
    this.workMap.set('Status', this.lucru);
    let i = 0;
    this.workMap.forEach(
      map => {
        this.arrayLucru[i] = [];
        this.arrayLucru[i].push(CustomStringSort.sortByPriority([... new Set(map)]))
        i++;
      }
    )
    return new FormGroup(group);
  }
  aplicaFiltre() {
    this.workMap = new Map()
    this.numeFormControl.forEach(

      (control, index) => {
        if (control.dirty) {
          this.serviciuFiltreParticulare.filtru = true;
          this.lucru = control.value;
          this.workMap.set(this.mapM.get(index) as string, this.lucru)
        }
      }
    )
    this.serviciuFiltreParticulare.alimentareWorkMap(this.workMap)
    this.router.navigate(['/listaParticulara/' + this.nume]);
  }
}
