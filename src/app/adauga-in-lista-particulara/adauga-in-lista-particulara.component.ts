import { Component, OnInit, forwardRef } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
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
export class AdaugaInListaParticularaComponent implements OnInit{



  index = 0;
  nume = ''
  struncturaLista:Map<number,string> = new Map;
  listaParticulara:Array<Map<string,string>> = [];
  comandaParticulara:Map<string,string> = new Map();

  myForm!: FormGroup;
  objectKeys = Object.keys;
  
  constructor(
    private formBilder: FormBuilder,
    private operatiuniLista: OperatiuniLista,
    private router: Router,
    private listeParticulare :ListeParticulare,
    private route: ActivatedRoute
  ) { 
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        console.log(param.get("nume"))
        this.nume = param.get("nume") as string;
        this.struncturaLista =  this.listeParticulare.recuperareStructuraListaParticulara(String(param.get("nume")))
        console.log("strunctura : ", this.struncturaLista)
        this.myForm = this.createFormGroup()
      }
    )
  }

  
  adaugInLista() {
  
    if (localStorage?.getItem('index')) {
      this.index = Number(localStorage?.getItem('index')) + 1;
    } else {
      this.index = 1;
    }

    console.log(this.myForm.value);
    this.listaParticulara = this.listeParticulare.recuperareComponenteListaParticulara(this.nume);
    console.log("listaParticulara = ", this.listaParticulara)
    this.struncturaLista.forEach(key => {
      this.comandaParticulara.set(key, this.myForm.get(key)?.value);
      console.log("key : ", key, " value : ", this.myForm.get(key)?.value)
    });
    this.listaParticulara.push(this.comandaParticulara)
    console.log("this.listaParticulara : ",this.listaParticulara)
    this.listeParticulare.salvareComponeneteListaParticulara(this.nume,this.listaParticulara)
    this.router.navigate(['/listaParticulara/',this.nume]);
  }
  
  createFormGroup() {
    const group: any = {};
    this.struncturaLista.forEach(key => {
      group[key] = new FormControl(this.struncturaLista.get(Number(key)));
      console.log("key : ", key)
    });
    return new FormGroup(group);
  }
  // onSubmit() {
  //   console.log(this.myForm.value);
  // }
}

