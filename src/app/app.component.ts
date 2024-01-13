import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdaugaInListaComponent } from './adauga-in-lista/adauga-in-lista.component';
import { ListaCumparaturiComponent } from './lista-cumparaturi/lista-cumparaturi.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BunVenitComponent } from "./bun-venit/bun-venit.component";
import { MenuComponent } from "./menu/menu.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        AdaugaInListaComponent,
        ListaCumparaturiComponent,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        RouterModule,
        RouterOutlet,
        RouterLink,
        BunVenitComponent,
        MenuComponent
    ]
})
export class AppComponent {
  title = 'listaCumparaturi';
}
