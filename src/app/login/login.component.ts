import { Component, OnInit } from '@angular/core';
import {CaddyService} from '../services/caddy.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthenticationService,
              private router: Router,
              private caddyService: CaddyService) { }





  ngOnInit(): void {
  }

  onLogin(dataForm:any) {
     this.authService.login(dataForm.username, dataForm.password);


  if(this.authService.isAuthenticatedd()) {
     // if(this.authService.isAuthenticated) {
       this.authService.saveAuthenticatedUser();
      // this.caddyService.loadCaddyFromLocalStorage(); //j'ai commenté ça provisoirement !!!03/01/2021
       this.router.navigateByUrl('');
     }

   }
}
