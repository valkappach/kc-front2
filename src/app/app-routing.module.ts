import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeComponent} from './components/employee/employee.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes =[
  { path: 'employes', component: EmployeeComponent },

  { path: '',   redirectTo: '/employes', pathMatch: 'full' }


];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
