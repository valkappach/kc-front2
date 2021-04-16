import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {CaddyService} from '../services/caddy.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  roomtypes;
  public currentRoomtype;


  constructor(private catalogueService: CatalogueService,private router: Router, private authService: AuthenticationService,
              public caddyService: CaddyService) { }

  ngOnInit(): void {

    this.getRoomtypes();
    this.authService.loadUserAuthenticatedUserFromLocalStorage();
  }
  private getRoomtypes() {
    return this.catalogueService.getRessource("/roomtypes")
      .subscribe(data=>{
        this.roomtypes=data;
      },err => {
        console.log(err);
      })
  }

 /* onSelectedRooms() {
    this.currentRoomtype=undefined;
    this.router.navigateByUrl("/rooms/1/0");

  }*/

  onRoomsPromo() {
    this.currentRoomtype=undefined;
    this.router.navigateByUrl("/rooms/3/0");
  }
  getRoomsByRoomtype(rt) {
    this.currentRoomtype=rt;
    this.router.navigateByUrl('/rooms/2/'+rt.id);
  }

  onRoomsDispo() {
    this.currentRoomtype=undefined;
    this.router.navigateByUrl("/rooms/4/0");
  }
onLogout() {
  this.authService.removeTokenFromLocalStorage();
  this.router.navigateByUrl('/login');
}
}
