import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-roomtype',
  templateUrl: './list-roomtype.component.html',
  styleUrls: ['./list-roomtype.component.css']
})
export class ListRoomtypeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
 
}
