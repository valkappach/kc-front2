import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {EmployeeService} from './services/employee.service';
import {EmployeeComponent} from './components/employee/employee.component';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    TopMenuComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
