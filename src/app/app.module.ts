import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CaddyComponent } from './caddy/caddy.component';
import { CaddiesComponent } from './caddies/caddies.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListRoomtypeComponent } from './list-roomtype/list-roomtype.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CaddyComponent,
    CaddiesComponent,
    RoomsComponent,
    RoomDetailComponent,
    EmployeeComponent,
    NavbarComponent,
    SidebarComponent,
    ListRoomtypeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
