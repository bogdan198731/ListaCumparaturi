import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdaugaInListaComponent } from './adauga-in-lista/adauga-in-lista.component';
import { ListaCumparaturiComponent } from './lista-cumparaturi/lista-cumparaturi.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RouterComponent } from "./router/router.component";
import { HamburgerMenuComponent } from "./hamburger-menu/hamburger-menu.component";
import { App as CapacitorApp } from '@capacitor/app';
CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if(!canGoBack){
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});
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
        RouterComponent,
        HamburgerMenuComponent
    ]
})
export class AppComponent {
  title = 'E-Util';

}
