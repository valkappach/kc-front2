import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CommonModule } from '@angular/common';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomDetailComponent} from './room-detail/room-detail.component';
import {CaddiesComponent} from './caddies/caddies.component';
import {LoginComponent} from './login/login.component';
import {EmployeeComponent} from './employee/employee.component';



const routes: Routes = [
  {path:'rooms/:p1/:p2',component: RoomsComponent},
  {path:'room-detail/:url',component: RoomDetailComponent},
  {path:'caddies',component: CaddiesComponent},
  {path:'manager_employer',component: EmployeeComponent},
  {path:'login',component: LoginComponent},
  {path:'',redirectTo:'rooms/1/0',pathMatch:'full'}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
   // CommonModule
  ]
})
export class AppRoutingModule { }
