import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { EncuestaService } from '../../../services/encuesta.service';

@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.component.html',
  styleUrls: ['./ver-encuestas.component.css']
})
export class VerEncuestasComponent implements OnInit {
  encuestas!:any[];
  suscripciones!:Subscription[]; 
  public usuario$: Observable<any> = this.authService.afAuth.user;

  constructor(
    public authService: AuthService,
    public encuestaService: EncuestaService
    ) 
  {
    this.suscripciones = [];
  }

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla()
{
  this.suscripciones.push(this.encuestaService.cargarEncuestas().subscribe(snapshot => {
    this.encuestas = [];
    snapshot.forEach((item: any) => {
      const data = item.payload.doc.data() as any;
      data.id = item.payload.doc.id;
      this.encuestas.push(data);
      console.log(this.encuestas);
    })
  }))
}

}
