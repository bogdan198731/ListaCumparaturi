import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListeParticulare } from '../servicii/listeParticulare';
import { ListaParticulara } from '../model/listaParticulara'
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-vizualizare-lista-particulara',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './vizualizare-lista-particulara.component.html',
  styleUrl: './vizualizare-lista-particulara.component.scss'
})
export class VizualizareListaParticularaComponent implements OnInit{
  isFixed: boolean = false;
  listaParticulara:ListaParticulara = {
    id: 0,
    nume: '',
    lista: new Map()
  }
  struncturaLista:Map<number,string> = new Map;

  constructor(private route: ActivatedRoute ,private router: Router, private listeParticulare:ListeParticulare){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        console.log(param.get("nume"))
        this.struncturaLista =  this.listeParticulare.recuperareStructuraListaParticulara(String(param.get("nume")))
        console.log("strunctura : ", this.struncturaLista)
      }
    )
  }
  scoateFiltre(){  
    // this.listaComenziSortata.data = this.manipulareLista.retituieListaLucru()
    // this.operatiuniFiltre.modificaFiltruFals();
    // this.reload.next(true)
    this.router.navigate(['/listacumparaturi']);
  }
  adaugaFiltre(){  
    this.router.navigate(['/filtre']);
    // this.reload.next(false)
  }
  test(){
    console.log("Apasat")
  }
}
