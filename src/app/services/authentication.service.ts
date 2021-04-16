import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host:string="http://localhost:8088"
  public isAuthenticated: boolean;
  public authenticatedUser;
  public token:string;

  private users = [
    {username: 'admin', password: '1234', roles: ['USER', 'ADMIN']},
    {username: 'user1', password: '1234', roles: ['USER']},
    {username: 'user2', password: '1234', roles: ['USER']}
  ];

  constructor() { }

login(username: string, password: string) {
   let user;
   this.users.forEach(u => {
     if (u.username === username && u.password === password) {
       user = u;
       this.token=btoa(JSON.stringify({username:u.username,roles:u.roles}));
     }
   });
   if (user) {
     this.isAuthenticated = true;
     this.authenticatedUser = user;
     localStorage.setItem('authenticatedUser', JSON.stringify(this.authenticatedUser));
   } else {
     this.isAuthenticated = false;
     this.authenticatedUser=undefined;
   }
 }

/* loadUser() {
   // ici jail let en change const
   const user = localStorage.getItem('authenticatedUser');
   if (user) {
     this.authenticatedUser = JSON.parse(user);
     this.authenticated = true;
   }
 }*/

 public isAdmin() {
   if (this.authenticatedUser) {
     return this.authenticatedUser.roles.indexOf('ADMIN') >-1;
   } else { return false; }
 }
public saveAuthenticatedUser(){
    if (this.authenticatedUser){
      //localStorage.setItem('authToken',btoa(JSON.stringify(this.token)));
      localStorage.setItem('authToken',this.token);
    }
}
public loadUserAuthenticatedUserFromLocalStorage(){
    let t=localStorage.getItem('authToken');
    if (t){
      let user=JSON.parse(atob(t));
      console.log(user);
      this.authenticatedUser={username: user.username, roles:user.roles};
      this.isAuthenticated=true;
      console.log(this.authenticatedUser);
      this.token=t;
    }
}
 public isAuthenticatedd() {
   return this.isAuthenticated;
 }
 public removeTokenFromLocalStorage(){
   localStorage.removeItem('authToken');
   this.isAuthenticated = false;
   this.authenticatedUser = undefined;
   this.token=undefined;
 }
 logout() {
   this.isAuthenticated = false;
   this.authenticatedUser = undefined;
   this.token=undefined;
   localStorage.removeItem('authenticatedUser');
 }

}
