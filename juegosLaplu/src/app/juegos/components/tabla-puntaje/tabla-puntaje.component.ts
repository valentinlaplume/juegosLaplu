import { Component, Input, OnInit } from '@angular/core';
import { Puntaje } from 'src/app/shared/puntaje';

@Component({
  selector: 'app-tabla-puntaje',
  templateUrl: './tabla-puntaje.component.html',
  styleUrls: ['./tabla-puntaje.component.css']
})
export class TablaPuntajeComponent implements OnInit {
  @Input() puntajes!:Puntaje[];

  constructor() { }

  ngOnInit(): void {
  }

}
