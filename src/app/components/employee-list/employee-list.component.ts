import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Employee} from "../../interface/Employee";
import {EmployeeService} from "../../service/employee-service.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string | null = null;
  newEmployee : Employee = {
    id : 0,
    name: '',
    email: '',
    Date : ''
  };

  constructor(
    private employeeService: EmployeeService,

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
}
