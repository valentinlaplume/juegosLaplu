import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email!:string;
  public password!:string;
  public user:any;
  public msjError!: string;


  constructor(
    private authSvc: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {}

  async login(){
    const arg = {email: this.email, password: this.password};
    
    const res = await this.authSvc.login(this.email, this.password);

    if(this.authSvc.msjError != "")
      this.msjError = this.authSvc.msjError;
    else
    {
      this.msjError = '';
      this.router.navigate(['home']);
    }
  }

  async logout():Promise<void>{
    try {
      console.log(this.authSvc.logout());
      this.router.navigate(['login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  userA(){
    this.email= 'laplu.me.valen@gmail.com';
    this.password = 'asd123';
  }


}
