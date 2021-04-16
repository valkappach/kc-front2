import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {CaddyService} from '../services/caddy.service';
import {AuthenticationService} from '../services/authentication.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  currentRoom;
  private progress: number;
  private editPhoto: boolean;
  private selectedFiles: any;
  currentFileUpload;
  private currentTime: number;
  private mode: number = 0;

  constructor(private router: Router, private route: ActivatedRoute,
              private catalogueService: CatalogueService,
              private caddyService: CaddyService,
              public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    let url = atob(this.route.snapshot.params.url);
    this.catalogueService.getRoom(url).subscribe(data => {
      this.currentRoom = data;
    });
  }

  onEditPhoto(b) {
    this.currentRoom = b;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catalogueService.uploadPhotoRoom(this.currentFileUpload, this.currentRoom.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.currentTime = Date.now();
        this.editPhoto = false;
      }
    }, err => {
      alert('Problème de chargement');
    });



    this.selectedFiles = undefined;
  }



  getTS() {
    return this.currentTime;
  }


  onEditRoom() {
    this.mode = 1;
  }

  onUpdateRoom(data) {

  }

  onAddRoomToCaddy(currentRoom) {
    this.caddyService.addRoomToCaddy(currentRoom);
  }
}
