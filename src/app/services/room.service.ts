import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  //public host:string="http://localhost:8082"

  public host = environment.apiBaseUrl;
  /*public getRessource(url){
    return this.http.get(this.host+url);
  }*/

  constructor(private http: HttpClient) { }


  /* uploadPhotoRoom(file: File, idBook): Observable<HttpEvent<{}>> {
     let formdata: FormData = new FormData();
     formdata.append('file', file);
     const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idRoom, formdata, {
       reportProgress: true,
       responseType: 'text'
     });

     return this.http.request(req);
   }*/


  /**
   * Search rooms by roomNumber
   * @param url
   */
  searchRoomByRoomNumber(url){
    return  this.http.get(this.host +url);
  }
  /**
   * Search rooms by bed
   * @param url
   */
  searchRoomByBed(url){
    return  this.http.get(this.host+url);
  }


  /**
   * Search rooms by title
   * @param url
   */
  searchRoomByTitle(url){
    return  this.http.get(this.host+url);
  }
}
