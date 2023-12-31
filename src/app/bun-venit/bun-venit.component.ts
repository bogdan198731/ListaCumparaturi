import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { AdaugaInListaComponent } from './adauga-in-lista/adauga-in-lista.component';
// import { ListaCumparaturiComponent } from './lista-cumparaturi/lista-cumparaturi.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-bun-venit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatMenuModule, MatButtonModule,RouterModule, RouterOutlet, RouterLink],
  templateUrl: './bun-venit.component.html',
  styleUrl: './bun-venit.component.css'
})
export class BunVenitComponent {

}
