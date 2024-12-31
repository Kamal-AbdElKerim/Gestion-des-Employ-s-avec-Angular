import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from "../../interface/Employee";
import { Router } from "@angular/router";
import { EmployeeService } from "../../service/employee-service.service";

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit, OnChanges {
  user: Employee = {
    id: 0,
    name: '',
    email: '',
    Date: new Date()
  };
  errorMessage: any = null;
  errors: { [key: string]: string[] } = {
    name: [],
    email: []
  };

  @Input() employee!: Employee;
  @Input() isUpdate: boolean = false;

  @Output() employeeAdded = new EventEmitter<Employee>();
  @Output() employeeUpdate = new EventEmitter<Employee>();

  constructor(private router: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  // This method is called whenever the input properties change
  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'isUpdate' flag or 'employee' changes
    if (changes['isUpdate']) {
      if (this.isUpdate) {
        // If isUpdate is true, copy employee data to user
        this.user = { ...this.employee };
      } else {
        // If isUpdate is false, reset the form
        this.resetUser();
      }
    }

    // If 'employee' input changes, update 'user' data accordingly
    if (changes['employee'] && this.isUpdate) {
      this.user = { ...this.employee };  // Copy employee data to user
    }
  }

  // Reset the user object to initial empty state
  resetUser() {
    this.user = {
      id: 0,
      name: '',
      email: '',
      Date: new Date()
    };
  }

  // Validate the form fields
  validateForm(field?: string) {
    if (field) {
      this.errors[field] = [];
    } else {
      this.errors['name'] = [];
      this.errors['email'] = [];
    }

    // Name Validation
    if (!field || field === 'name') {
      if (!this.user.name.trim()) {
        this.errors['name'].push('Name is required.');
      } else if (this.user.name.length < 3) {
        this.errors['name'].push('Name must be at least 3 characters long.');
      }
    }

    // Email Validation
    if (!field || field === 'email') {
      if (!this.user.email.trim()) {
        this.errors['email'].push('Email is required.');
      } else if (!this.isValidEmail(this.user.email)) {
        this.errors['email'].push('Enter a valid email address.');
      }
    }
  }

  // Email validation pattern
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // Check if there are any validation errors
  hasErrors(): boolean {
    return Object.values(this.errors).some(errArray => errArray.length > 0);
  }

  // Submit the form
  onSubmit(form: any) {
    this.validateForm();

    if (form.valid && !this.hasErrors()) {
      if (this.isUpdate) {

        this.employeeUpdate.emit(this.user);
      } else {
        // Add a new employee
        this.employeeAdded.emit(this.user);
      }

      // Reset the user object after submission
      this.resetUser();
    } else {
      console.log('Form has errors', this.errors);
    }
  }
}
