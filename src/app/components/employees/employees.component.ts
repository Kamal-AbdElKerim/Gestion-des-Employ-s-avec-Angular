import { Component } from '@angular/core';
import {Employee} from "../../interface/Employee";
import {EmployeeService} from "../../service/employee-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  employees: Employee[] = [];
  employee: Employee  = {
    id : 0,
    name: '',
    email: '',
    Date : ''
  };
  errorMessage: string | null = null;
  newEmployee : Employee = {
    id : 0,
    name: '',
    email: '',
    Date : ''
  };
  employeeID : number = 0;
  isUpdate : boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router

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
        this.loadEmployees(); // Refresh the list
      },
      error: (err) => (this.errorMessage = 'Failed to add employee'),
    });

  }

  // Delete an employee
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: (err) => (this.errorMessage = 'Failed to delete employee'),
    });
  }

  onEmployeeAdded(employee : Employee) {
    this.newEmployee = { id: 0, name: '', email: '', Date: '' }; // Reset
    this.newEmployee = employee ;
    console.log(employee);
    this.addEmployee();

  }



  onEmployeeUpdate(employee : Employee) {
    this.newEmployee = { id: 0, name: '', email: '', Date: '' }; // Reset
    this.newEmployee = employee ;
    console.log(employee);
    this.employeeService.updateEmployee(employee.id , this.newEmployee).subscribe({
      next: () => {
        this.loadEmployees();
        this.isUpdate = false;
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
