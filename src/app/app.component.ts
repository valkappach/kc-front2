import {Component, OnInit} from '@angular/core';
import {EmployeeService} from './employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Employee} from './model/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title: string;
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();

  }
  //
  // ngOnInit() {
  //   this.authService.loadUserAuthenticatedUserFromLocalStorage();
  //   this.getRoomtypes();
  // }
  // private getRoomtypes() {
  //   return this.catalogueService.getRessource("/roomtypes")
  //     .subscribe(data=>{
  //       this.roomtypes=data;
  //     },err => {
  //       console.log(err);
  //     })
  // }
  //
  // getRoomsByRoomtype(rt) {
  //   this.currentRoomtype=rt;
  //   this.router.navigateByUrl('/rooms/2/'+rt.id);
  // }
  //
  // onSelectedRooms() {
  //   this.currentRoomtype=undefined;
  //   this.router.navigateByUrl("/rooms/1/0");
  //
  // }
  //
  // onRoomsPromo() {
  //   this.currentRoomtype=undefined;
  //   this.router.navigateByUrl("/rooms/3/0");
  // }
  //
  // onRoomsDispo() {
  //   this.currentRoomtype=undefined;
  //   this.router.navigateByUrl("/rooms/4/0");
  // }
  //
  //
  // /*w3_open(){
  //   return this.displayblock=true;
  // }*/
  // /* Swal.fire({
  //              title: 'Error!',
  //              text: 'Do you want to continue',
  //              icon: 'error',
  //              confirmButtonText: 'Cool'
  //            })*/

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }


}
