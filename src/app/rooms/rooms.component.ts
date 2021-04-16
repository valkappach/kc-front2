import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {RoomService} from '../services/room.service';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CaddyService} from '../services/caddy.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Room} from '../model/room.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public types = [ 'Bed', 'Title','RoomNumber'];
  public roomNumber: string;
  public title: string;
  public bed: string;

  //searchRoomsResult;
  public messageModal: string;
  // private isNoResult: boolean;



  public displayType: string = 'RoomNumber'
  rooms;
  rooms2;
  roomsResult;
  timestamp:number=0;
  currentCategorie;

  public currentPage: number=0;

  editPhoto: boolean;
  currentRoom: any;
  selectedFiles:any;
  progress: number;
  currentFileUpload: any;
  //private currentTime;
  private currentRequest: string;
  private messageTitle: string;



  constructor(private catalogueService: CatalogueService, private roomService: RoomService,
              public authenticationService: AuthenticationService,
              private route: ActivatedRoute, private router: Router, private caddyService: CaddyService) {}

  ngOnInit(): void {
    //this.onSelectedRooms();
    /**
     *recupère la route à la souscption des evenements val... url=val.url
     */
    this.router.events.subscribe((val)=>{
      if (val instanceof NavigationEnd){
        let url=val.url;
        console.log(url);
        /**
         * plusieurs routes p1 p2 se charge dans le meme component
         */
        let p1 = this.route.snapshot.params.p1;
        // tslint:disable-next-line:triple-equals
        if (p1 === 1){
          this.messageTitle= 'Sélectionné';
          this.getRooms('/rooms/search/selectedRooms');
        }
        else if(p1 === 2){
          let idRoomtype = this.route.snapshot.params.p2;
          this.messageTitle = 'Chambre de la categorie '+ idRoomtype;
          this.getRooms('/roomtypes/' + idRoomtype + '/rooms');
        }
        else if(p1 === 3){
          this.messageTitle = 'livre en promotion ';
          this.getRooms('/rooms/search/promoRooms');
        }
        else if (p1 === 4){
          this.messageTitle = 'livre disponible';
          this.getRooms('/rooms/search/dispoRooms');
        }

        else if (p1 === 5){
          this.messageTitle = 'room rechercher';
          this.currentRequest = '/rooms/search/dispoRooms';
          this.getRooms(this.currentRequest);
        }
      }
    });
    let p1 = this.route.snapshot.params.p1; //àchanger.....factoriser
    if (p1 === 1){
      this.getRooms('/rooms/search/selectedRooms');
    }
    // this.onGetBooks();//////////
// fin OnInit //////////////////
  }

  private getRooms(url) {
    this.catalogueService.getRessource(url)
      .subscribe(data => {
        this.rooms2 = data;
        console.log(data);
      }, error => {
        console.log(error);
      } );
  }

  onChercher(form: any) {
    this.roomNumber = form.roomNumber;
    this.title = form.title;
    this.bed = form.bed;


    this.searchRoomsByType();


  }


  // LIST FOR ROOMS

/////////////////////////////////////////////////////
  /**
   * Search rooms by title or by roomNumber
   * @param searchRoomForm
   */
  searchRoomsByType(){

    if(this.displayType === 'RoomNumber'){

      this.roomService.searchRoomByRoomNumber('/rooms/search/roomNumber?roomNumber=' + this.roomNumber)
        .subscribe(data => {
          this.roomsResult = data;
          console.log(data);
        }, err => {
          console.log(err);
        });

    } else if(this.displayType === 'Title'){
      this.roomService.searchRoomByTitle('/rooms/search/title?title=' + this.title)
        .subscribe(data => {
          this.roomsResult = data;
          console.log(data);
        }, err => {
          console.log(err);
        });

    } else if(this.displayType === 'Bed'){
      this.roomService.searchRoomByBed('/rooms/search/bed?bed=' + this.bed)
        .subscribe(data =>{
          this.roomsResult = data;
          console.log(data);
        }, err => {
          console.log(err);
        });

    }
  }

  ////////////////////////////////////////////
  /**
   * edit photo with parameter
   * @param r
   */
  onEditPhoto(r) {
    this.currentRoom = r;
    this.editPhoto = true;
  }

  /**
   * selected many photos with target parameter event
   *
   */
  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalogueService.uploadPhotoRoom(this.currentFileUpload, this.currentRoom.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
        console.log(this.progress);
      } else if (event instanceof HttpResponse) {

        //  this.currentTime=Date.now();
        this.timestamp = Date.now();
        // alert("Fin du téléchargement...");
      }
    }, err => {
      alert('Problème de chargement');
    });



    this.selectedFiles = undefined
  }
  /**
   * cette méthode vide le cach et effectue la mise à jour
   */

  getTS() {
    return this.timestamp;
  }
  public isAdmin(){
    return this.authenticationService.isAdmin();
  }

  onAddRoomToCaddy(r: Room) {
    this.caddyService.addRoomToCaddy(r);
  }
  onRoomDetails(r: Room) {
    let url=btoa(r._links.room.href);
    this.router.navigateByUrl('room-detail/' + url);
  }
}
