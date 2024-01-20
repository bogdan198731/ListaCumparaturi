import { Component, OnInit } from '@angular/core';
import { ListeParticulare } from '../servicii/listeParticulare';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cautare-liste-particulare',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './cautare-liste-particulare.component.html',
  styleUrl: './cautare-liste-particulare.component.css'
})
export class CautareListeParticulareComponent implements OnInit{

  numeListeParticulare:string[] = [];

  constructor(private listeParticulare:ListeParticulare){}
  ngOnInit(): void {

    console.log("nume liste particulare : " ,this.listeParticulare.recuperareNumeListeParticulare());
    this.numeListeParticulare = this.listeParticulare.recuperareNumeListeParticulare();
  }

}
