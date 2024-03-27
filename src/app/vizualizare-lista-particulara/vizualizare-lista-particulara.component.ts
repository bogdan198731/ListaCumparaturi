import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListeParticulare } from '../servicii/listeParticulare';
import { ListaParticulara } from '../model/listaParticulara'
import { CommonModule, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ElementLista } from '../model/elementLista';
import { MatListModule } from '@angular/material/list';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';
import { RouterComponent } from '../router/router.component';
import { FiltreListaPersonalizataComponent } from '../filtre-lista-personalizata/filtre-lista-personalizata.component';
import { OperatiuniFiltreParticulare } from '../servicii/operatiuniFiltreParticulare';

@Component({
  selector: 'app-vizualizare-lista-particulara',
  standalone: true,
  imports: [NgIf, RouterLink, MatListModule, MatTableModule, MatSortModule, CommonModule,],
  templateUrl: './vizualizare-lista-particulara.component.html',
  styleUrl: './vizualizare-lista-particulara.component.scss'
})
export class VizualizareListaParticularaComponent implements OnInit, OnDestroy {
  coloane: string[] = [];
  titluri: string[] = [];
  public listaComenziSortata = new MatTableDataSource<string[]>();
  @ViewChild(MatSort) sort!: MatSort;
  isFixed: boolean = false;
  listaParticulara: Array<Map<string, string>> = [];
  listaParticularaLucru:Array<Map<string, string>> = [];
  listaLucru: Array<Map<string, string>> = [];
  tableContainer = document.getElementById("table-container");
  nume: string = ''
  campOK: string = "OK"
  campKO: string = "KO"
  campOkKO: string = '';
  campEsteOk = "";
  struncturaLista: Map<number, string> = new Map;
  subscription: Subscription = new Subscription();
  workMap: Map<string, string[]> = new Map();
  filtruOn = false;


  @ViewChild('tableContainer', { static: true }) tableContainerR!: ElementRef;
  constructor(private route: ActivatedRoute, private router: Router, private serviciuListeParticulare: ListeParticulare,
    private renderer: Renderer2, private _liveAnnouncer: LiveAnnouncer, private routerComponent: RouterComponent,
    private serviciuFiltrePersonalizate: OperatiuniFiltreParticulare,) {

  }
  ngOnDestroy(): void {
    this.serviciuFiltrePersonalizate.filtru = false;
    this.filtruOn = false;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => { 
        this.nume = String(param.get("nume"));
        this.struncturaLista = this.serviciuListeParticulare.recuperareStructuraListaParticulara(String(param.get("nume")))
        this.campEsteOk = this.struncturaLista.get(98) as string;
        this.listaParticulara = this.serviciuListeParticulare.recuperareComponenteListaParticulara(this.nume);
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
    let columns: string[] = [];
    this.struncturaLista.forEach(
      (key, value) => {
        if (!((value === 98) || (value === 99))) { columns.push(key) }
      }
    )
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
      const row = this.renderer.createElement('tr');
      this.renderer.addClass(row, 'mat-row');
      columns.forEach(column => {
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
  scoateFiltre() {
    this.serviciuFiltrePersonalizate.filtru = false;
    this.alimTablela()
    this.router.navigate(['/listaParticulara/' + this.nume]);
    this.filtruOn = false;
  }
  adaugaFiltre() {
    this.router.navigate(['/filtrepersonalizate/' + this.nume]);
    // this.reload.next(false)
  }


  creareTabelaSimplificata() {
    let i = 0;
    this.struncturaLista.forEach(
      (key, value) => {
        if (!((value === 98) || (value === 99) || (value === 100) || (value === 101))) {
          this.titluri.push(key)
          this.coloane.push("camp" + i++)
        }

      })
    this.campKO = this.struncturaLista.get(99) as string;
    this.campOK = this.struncturaLista.get(98) as string;
    if (this.campOK === "OK") {
      this.campOkKO = this.struncturaLista.get(98) as string;
    }
    else {
      this.campOkKO = this.struncturaLista.get(99) as string;
    }
    this.coloane.push("toggle")
    this.coloane.push("sterge")
    let lista: string[][] = [];
    this.alimTablela()
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  sterge(element: string) {
    this.listaParticulara = this.listaParticulara.filter(map => map.get("index") != element);
    this.serviciuListeParticulare.salvareComponeneteListaParticulara(this.nume, this.listaParticulara);
    this.alimTablela();
  }
  veziDetali(element: string) {
    let comanda = this.listaParticulara.find(map => map.get("index") === element) as Map<string, string>
    this.serviciuListeParticulare.alimenteazaComandaParticularaLucru(comanda)
    this.router.navigate(['/detaliiparticular/' + this.nume]);
  }

  modificaStare(element: string) {
    let el = this.listaParticulara.find(map => map.get("index") === element)
    if (el) {
      if (this.struncturaLista.get(98) as string === el.get("status")) {
        el.set("status", this.struncturaLista.get(99) as string)
      }
      else {
        el.set("status", this.struncturaLista.get(98) as string)
      }
    }
    this.serviciuListeParticulare.salvareComponeneteListaParticulara(this.nume, this.listaParticulara)
    this.alimTablela();
  }

  alimTablela() {
    this.listaParticularaLucru = this.listaParticulara;
    if (this.serviciuFiltrePersonalizate.filtru) {
      {
        this.filtruOn = true;
         this.listaLucru = []
        if (this.serviciuFiltrePersonalizate.returnareWorkMap()) {
          this.workMap = this.serviciuFiltrePersonalizate.returnareWorkMap()

          this.listaParticularaLucru.forEach(
            (map) => {
              let alimentez = false
              let mapTest = new Map()
              map.forEach(
                (value, key) => {

                  if (this.workMap.has(key)) {
                    const arrayDeTest = this.workMap.get(key)

                    if (arrayDeTest?.find(
                      f => f === value
                    )) {
                      alimentez = true;
                    }
                  }
                  map.set(key, value)
                }
              )
              if (alimentez) {
                this.listaLucru.push(map)
              }
            }
          )

        }
      }
    }
    else {
      this.listaLucru = this.listaParticulara
    }
    this.subscription = this.serviciuFiltrePersonalizate.fixed$
      .subscribe(fixed => this.isFixed = fixed)
    this.listaComenziSortata.data = this.listaLucru.map(map => {
      const obj: any = {};
      map.forEach((value, key) => {
        let str: string = "";
        this.struncturaLista.forEach(
          (keyS, valueS) => {
            if (keyS === key) {
              str = "camp" + valueS
            }
            else {
              if (key === "status") {
                str = "status"
              }
            }
          }
        )
        obj[str] = value
      });
      return obj;
    });
  }
}
