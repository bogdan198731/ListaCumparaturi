import { Component, OnInit, forwardRef } from '@angular/core';
import { ListeParticulare } from '../servicii/listeParticulare';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-vizualizare-detaliu-lista-particulara',
  standalone: true,
  imports: [  MatFormFieldModule,
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
    forwardRef(() => VizualizareDetaliuListaParticularaComponent),],
  templateUrl: './vizualizare-detaliu-lista-particulara.component.html',
  styleUrl: './vizualizare-detaliu-lista-particulara.component.css'
})
export class VizualizareDetaliuListaParticularaComponent implements OnInit{

  nume:string  = '';
  listaLucru:Map<string,string> = new Map();
  struncturaLista:Map<number,string> = new Map;
  myForm!: FormGroup;
  objectKeys = Object.keys;
  // numeFormControl = new FormControl('', Validators.required);
  numeFormControl:FormControl[] = [];
  map :Map<number,string> = new Map()
  listaParticulara: Array<Map<string, string>> = [];


  constructor(private serviciuListeParticulare: ListeParticulare, private route: ActivatedRoute, private router: Router){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.nume = param.get("nume") as string;
        this.struncturaLista =  this.serviciuListeParticulare.recuperareStructuraListaParticulara(String(param.get("nume")))
        this.listaLucru = this.serviciuListeParticulare.returneazaComandaParticularaLucru()
        this.myForm = this.createFormGroup()
      }
    ) 
    this.listaLucru = this.serviciuListeParticulare.returneazaComandaParticularaLucru()
    // this.struncturaLista.forEach(key => {
    //   this.listaLucru.set(key, this.myForm.get(key)?.value);
    //   console.log("key : ", key, " value : ", this.myForm.get(key)?.value)
    // });
  }
  createFormGroup() {
    const group: any = {};
    let index = 0;
    this.struncturaLista.forEach((key, value) => {
      if(!((value === 98) || (value===99) || (value===101))) 
     { group[key] = new FormControl(this.listaLucru.get(key as string), Validators.required);}
     if(group[key])
     {
     this.map.set(index,key); 
     index++;
     this.numeFormControl.push(new FormControl(this.listaLucru.get(key as string), Validators.required));
    }
    });
    return new FormGroup(group);
  }
  salvare(){
    this.numeFormControl.forEach(
      (control,index) => {
      this.listaLucru.set(this.map.get(index) as string, control.value);
      }
    )
    this.listaParticulara = this.serviciuListeParticulare.recuperareComponenteListaParticulara(this.nume);
    let el = this.listaParticulara.find(map => map.get("index") === this.listaLucru.get("index"))
    if (el) {
      console.log("el exista")
      this.listaLucru.forEach(
        (key,value) => {
          el?.set(value, key)
        }
      );  
    }
    console.log("el exista", el)
    this.serviciuListeParticulare.salvareComponeneteListaParticulara(this.nume,this.listaParticulara)
    this.router.navigate(['/listaParticulara/'+ this.nume]);
  }
}
