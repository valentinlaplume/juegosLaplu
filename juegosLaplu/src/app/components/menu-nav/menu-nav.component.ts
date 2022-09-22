import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  public usuario$: Observable<any> = this.authService.afAuth.user;

  constructor(public authService: AuthService,
    public router: Router,) { 
    // this.usuario$.subscribe(val => console.log('MenuNavComponent, subscribe -> ', val));
  }

  ngOnInit(): void {
  }

  onLogout(){
    this.router.navigate(['home']);
    this.authService.logout();
  }

}
