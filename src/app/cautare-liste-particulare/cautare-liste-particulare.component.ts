import { Component, Input, OnInit } from '@angular/core';
import { ListeParticulare } from '../servicii/listeParticulare';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cautare-liste-particulare',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, NgClass],
  templateUrl: './cautare-liste-particulare.component.html',
  styleUrl: './cautare-liste-particulare.component.scss'
})
export class CautareListeParticulareComponent implements OnInit{

  numeListeParticulare:string[] = [];

  @Input() test = false;
  constructor(private listeParticulare:ListeParticulare){}
  ngOnInit(): void {
    this.numeListeParticulare = this.listeParticulare.recuperareNumeListeParticulare();
  }

}
