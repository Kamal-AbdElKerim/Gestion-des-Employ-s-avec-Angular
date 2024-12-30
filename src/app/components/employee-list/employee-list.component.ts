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
  employeeForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    // Initialize the reactive form
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hireDate: ['', Validators.required],
    });
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
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      this.employeeService.addEmployee(newEmployee).subscribe({
        next: () => {
          this.employeeForm.reset();
          this.loadEmployees(); // Refresh the list
        },
        error: (err) => (this.errorMessage = 'Failed to add employee'),
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  // Delete an employee
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: (err) => (this.errorMessage = 'Failed to delete employee'),
    });
  }


}
