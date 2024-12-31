import {Component, EventEmitter , Output} from '@angular/core';
import {Employee} from "../../interface/Employee";

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent {
  user : Employee = {
    id : 0,
    name: '',
    email: '',
    Date : ''
  };

  errors: { [key: string]: string[] } = {
    name: [],
    email: []
  };

  @Output() employeeAdded = new EventEmitter<Employee>();


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
    //  console.log('Form Submitted!', this.user);
      this.employeeAdded.emit(this.user);
      this.user  = {
        id : 0,
        name: '',
        email: '',
        Date : ''
      };
    } else {
      console.log('Form has errors', this.errors);
    }
  }


}
