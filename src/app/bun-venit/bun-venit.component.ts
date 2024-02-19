import { Component } from '@angular/core';
import { ListaCumparaturiComponent } from "../lista-cumparaturi/lista-cumparaturi.component";
import { VizualizareListaParticularaComponent } from "../vizualizare-lista-particulara/vizualizare-lista-particulara.component";
import { CautareListeParticulareComponent } from "../cautare-liste-particulare/cautare-liste-particulare.component";
import { Router, RouterLink } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
    selector: 'app-bun-venit',
    standalone: true,
    templateUrl: './bun-venit.component.html',
    styleUrl: './bun-venit.component.scss',
    imports: [ListaCumparaturiComponent, VizualizareListaParticularaComponent, CautareListeParticulareComponent, RouterLink, MatExpansionModule]
})
export class BunVenitComponent {
    panelOpenState = false;
    test = true;
}
