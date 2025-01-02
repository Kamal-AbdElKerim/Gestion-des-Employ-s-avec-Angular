import {Component, OnInit} from '@angular/core';
import {Employee} from "../../interface/Employee";
import {EmployeeService} from "../../service/employee-service.service";
import {Router} from "@angular/router";
import {SweetAlertService} from "../../service/sweet-alert.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  employee: Employee  = {
    id : 0,
    name: '',
    email: '',
    Date : new Date()
  };
  errorMessage: string | null = null;
  newEmployee : Employee = {
    id : 0,
    name: '',
    email: '',
    Date : new Date()
  };
  employeeID : number = 0;
  isUpdate : boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private sweetAlertService: SweetAlertService

  ) {

  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Load employees from EmployeeService
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => (this.errorMessage = 'Failed to load employees'),
    });
    console.log(this.employees);
  }

  // Add a new employee
  addEmployee(): void {

    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: () => {
        this.loadEmployees();
        this.sweetAlertService.showSuccess(`Employee ${this.newEmployee.name} added successfully`);

      },
      error: (err) => (
        this.errorMessage = 'Failed to add employee'),

    });

  }


  onEmployeeAdded(employee : Employee) {
    this.newEmployee = { id: 0, name: '', email: '', Date: new Date() }; // Reset
    this.newEmployee = employee ;
    console.log(employee);
    this.addEmployee();

  }

  onEmployeeUpdate(employee : Employee) {
    this.newEmployee = { id: 0, name: '', email: '', Date: new Date() };
    this.newEmployee = employee ;
    console.log(employee);
    this.employeeService.updateEmployee(employee.id , this.newEmployee).subscribe({
      next: () => {
        this.loadEmployees();
        this.isUpdate = false;

        this.sweetAlertService.showSuccess(`Employee ${this.newEmployee.name} updated successfully`);

      },
      error: (err) => (this.errorMessage = 'Failed to add employee'),
    })

  }

  getIdUpdate(id : number) {
     this.employeeID = id ;
    if (this.employeeID) {
      this.employeeService.getEmployeeById(this.employeeID).subscribe({
        next: (data) => {
          if (data){
            this.employee = data;
            this.isUpdate = true;
          }

        },
        error: (error) => {
          this.errorMessage = error;
        },
      });
    }
  }
}
