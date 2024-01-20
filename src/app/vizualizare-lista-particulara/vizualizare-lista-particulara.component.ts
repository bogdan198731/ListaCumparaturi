import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListeParticulare } from '../servicii/listeParticulare';
import { ListaParticulara } from '../model/listaParticulara'
import { CommonModule, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ElementLista } from '../model/elementLista';
import { MatListModule } from '@angular/material/list';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-vizualizare-lista-particulara',
  standalone: true,
  imports: [NgIf, RouterLink, MatListModule, MatTableModule, MatSortModule, CommonModule, ],
  templateUrl: './vizualizare-lista-particulara.component.html',
  styleUrl: './vizualizare-lista-particulara.component.scss'
})
export class VizualizareListaParticularaComponent implements OnInit{
  coloane:string[] = [];
  titluri:string[] = [];
  public listaComenziSortata = new MatTableDataSource<string[]>();
  @ViewChild(MatSort) sort!: MatSort;
  isFixed: boolean = false;
  listaParticulara:Array<Map<string,string>> = [];
  tableContainer = document.getElementById("table-container");
  nume : string = ''
  struncturaLista:Map<number,string> = new Map;
  @ViewChild('tableContainer', { static: true }) tableContainerR!: ElementRef;
  constructor(private route: ActivatedRoute ,private router: Router, private listeParticulare:ListeParticulare,
    private renderer: Renderer2, private _liveAnnouncer: LiveAnnouncer){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        console.log(param.get("nume"))
        this.nume = String(param.get("nume"));
        this.struncturaLista =  this.listeParticulare.recuperareStructuraListaParticulara(String(param.get("nume")))
        console.log("this.struncturaLista : ", this.struncturaLista)
        this.listaParticulara = this.listeParticulare.recuperareComponenteListaParticulara(this.nume);

        console.log("this.struncturaLista = ", this.struncturaLista)
        // this.createMatTable();
        this.creareTabelaSimplificata()
      }
    )
  }
  ngAfterViewInit() {
    this.listaComenziSortata.sort = this.sort;
  }
  createMatTable() {
    const table = this.renderer.createElement('table');
    this.renderer.addClass(table, 'mat-table');

    // Define the columns and rows data
    let columns:string[] = [];
    this.struncturaLista.forEach(
      (key,value) =>  {
        console.log("key = ", key, " value = ", value)
       columns.push(key)
      }
      
    )
    console.log("columns : ",columns)
    const dataSource = this.listaParticulara;

    // Create header row
    const headerRow = this.renderer.createElement('tr');
    this.renderer.addClass(headerRow, 'mat-header-row');
    columns.forEach(column => {
      const th = this.renderer.createElement('th');
      this.renderer.addClass(th, 'mat-header-cell');
      const text = this.renderer.createText(column);
      this.renderer.appendChild(th, text);
      this.renderer.appendChild(headerRow, th);
    });
    this.renderer.appendChild(table, headerRow);

    // Create data rows
    dataSource.forEach(rowData => {
      console.log("rowData = ", rowData)
      const row = this.renderer.createElement('tr');
      this.renderer.addClass(row, 'mat-row');
      columns.forEach(column => {
        console.log("column = ", column)
        const td = this.renderer.createElement('td');
        this.renderer.addClass(td, 'mat-cell');
        const text = this.renderer.createText(rowData.get(column)!);
        this.renderer.appendChild(td, text);
        this.renderer.appendChild(row, td);
      });
      this.renderer.appendChild(table, row);
    });

    // Append the table to the container
    this.renderer.appendChild(this.tableContainerR.nativeElement, table);
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

  creareTabelaSimplificata(){
    let i = 0;
    this.struncturaLista.forEach(
      (key,value) =>  {
        
        this.titluri.push(key)
       this.coloane.push("camp"+ i++)
      })
      console.log("coloane : ",this.coloane)
      let lista:string[][] = [];
      // i = 0;
      // this.listaParticulara.forEach(
      //   (key,value) =>{
      //     console.log("key = ", key, " value = ", value)
      //     key.forEach(
      //       el =>
      //     // lista[i].push(el)
      //     console.log("el : ", el)
      //     )
      //   }
      // )
      this.listaComenziSortata.data = this.listaParticulara.map(map => {
        const obj: any = {};
        map.forEach((value, key) => {
          console.log("key = ", key, " value = ", value)
          let str :string ="";
          this.struncturaLista.forEach(
            (keyS, valueS) => {
              if(keyS ===key )
              {
                str = "camp"+ valueS
              }
            }
          )
          obj[str] = value});
        return obj;
      });
      console.log("this.listaComenziSortata : ", this.listaComenziSortata.data)
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  sterge(id: number) {
    // this.operatiuniLista.stergeComanda(id); 
    // this.listaComenziSortata.data = this.operatiuniLista.retituieListaLucru()
  }
  veziDetali(id:number){
    this.router.navigate(['/detalii/'+ id]);
  }
}
