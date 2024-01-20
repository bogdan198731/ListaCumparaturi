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
  listaParticulara:Array<Map<string,string>> = [];
  tableContainer = document.getElementById("table-container");
  nume : string = ''
  struncturaLista:Map<number,string> = new Map;

  constructor(private route: ActivatedRoute ,private router: Router, private listeParticulare:ListeParticulare){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        console.log(param.get("nume"))
        this.nume = String(param.get("nume"));
        this.struncturaLista =  this.listeParticulare.recuperareStructuraListaParticulara(String(param.get("nume")))
        this.listaParticulara = this.listeParticulare.recuperareComponenteListaParticulara(this.nume);
        this.tableContainer = document.getElementById("table-container");
        this.tableContainer?.setAttribute("class", "table-dinamic")
        // this.tableContainer?.setAttribute("class", "table")
        // table, th, td
        this.creareTabela(this.listaParticulara);
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
  createTableFromArrayofMaps(arrayOfMaps: Array<Map<string, any>>): HTMLElement {
    if (arrayOfMaps.length === 0) return document.createElement("div");

    // Create the table element
    const table = document.createElement("table");

    // Add a header row
    const headerRow = table.insertRow();
    arrayOfMaps[0].forEach((_, key) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    });

    // Iterate over the array of maps and add rows to the table
    arrayOfMaps.forEach(map => {
        const row = table.insertRow();
        map.forEach((value, key) => {
            const cell = row.insertCell();
            cell.textContent = value.toString();
        });
    });

    return table;
}

// Usage

creareTabela(listaParticulara:Array<Map<string,string>>){
if (this.tableContainer) {
    const table = this.createTableFromArrayofMaps(listaParticulara);
    this.tableContainer.appendChild(table);
}
}
}
