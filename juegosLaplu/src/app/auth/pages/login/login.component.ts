import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string;
  public password:string;
  public user:any;

  constructor(
    private userService: UserService,
    public router: Router
  ) { 
    this.email = '';
    this.password = ''
  }

  ngOnInit(): void {}

  login(){
    const arg = {email: this.email, password: this.password};
    console.log(arg);

    this.userService.login(arg)
    .then((res: any) => {
      console.log(res);
      console.log(res.user);
      this.user = res.user;
      this.router.navigateByUrl('home');
    })
    .catch((err: any) => {
      console.log(err);
    });
  }

  async logout():Promise<void>{
    try {
      console.log(this.userService.logout());
      this.router.navigateByUrl('auth/login');
    } catch (error) {
      console.log('Error->', error);
    }
  }

  userA(){
    this.email= 'laplu.me.valen@gmail.com';
    this.password = 'asd123';
  }


}
