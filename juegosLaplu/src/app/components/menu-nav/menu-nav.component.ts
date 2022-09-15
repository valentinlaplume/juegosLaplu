import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {  
  UserCredential
} from '@angular/fire/auth';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  public user: Promise<UserCredential>|undefined;


  constructor(public userService: UserService) { 
    
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    console.log(this.user);
  }

}
