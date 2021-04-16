import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Room} from '../model/room.model';
import {Caddy} from '../model/caddy.model';
import {RoomItem} from '../model/room-item.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

   currentCaddyName = 'Caddy1';
   public caddies: Map<string, Caddy> = new Map();


   constructor(){
     let caddy = new Caddy(this.currentCaddyName);
     this.caddies.set(this.currentCaddyName, caddy);
    /* let caddies=localStorage.getItem("myCaddies");
     if(caddies){
       this.caddies=JSON.parse(caddies);
     }
     else{
       let caddy=new Caddy(this.currentCaddyName);
       this.caddies[this.currentCaddyName]=caddy;
     }
*/

   }
     /*if (this.autheticationService.isAuthenticatedd()) {
       this.loadCaddyFromLocalStorage();
     } else {
       this.caddies[this.currentCaddyName] = new Caddy(this.currentCaddyName);
   }
  }*/


  public addRoomToCaddy(room : Room):void{
     let caddy = this.caddies.get(this.currentCaddyName);
   let roomItem:RoomItem = caddy.items.get(room.id);
    if (roomItem) {
     roomItem.quantity +=room.quantity;
    }
    else{
      roomItem=new RoomItem();
      roomItem.price=room.currentPrice;
      roomItem.quantity=room.quantity;
      roomItem.room=room;
      caddy.items.set(room.id,roomItem);

    }
  }
  /*saveCaddies() {
    let caddy=this.caddies[this.currentCaddyName];
    localStorage.setItem('myCaddies', JSON.stringify(this.caddies));
  }*/
  public getCurrentCaddy():Caddy{
    return this.caddies.get(this.currentCaddyName);
  }

  getTotal() :number{
    let total=0;
    let items: IterableIterator<RoomItem>=this.getCurrentCaddy().items.values();
    for (let ri of items){
      total+=ri.price*ri.quantity;
    }
    return total;
  }
}
