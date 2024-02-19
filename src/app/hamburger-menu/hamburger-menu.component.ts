import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, RouterLink, MatIconModule],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.scss'
})
export class HamburgerMenuComponent {
  esteDeschis: boolean = false;
  esteNecesar : boolean = false;

  toggleMenu() {
    this.esteDeschis = !this.esteDeschis;
  }
}
