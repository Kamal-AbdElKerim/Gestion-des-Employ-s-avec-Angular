import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormEmployeeComponent } from './form-employee.component';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee-service.service';
import { Employee } from '../../interface/Employee';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormEmployeeComponent', () => {
  let component: FormEmployeeComponent;
  let fixture: ComponentFixture<FormEmployeeComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const employeeService = jasmine.createSpyObj('EmployeeService', ['addEmployee', 'updateEmployee']);
    const router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ FormEmployeeComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: EmployeeService, useValue: employeeService },
        { provide: Router, useValue: router },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Avoid template errors for missing components
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormEmployeeComponent);
    component = fixture.componentInstance;
    employeeServiceSpy = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.user.id).toBe(0);
    expect(component.user.name).toBe('');
    expect(component.user.email).toBe('');
  });

  it('should update the user data when the input employee changes', () => {
    const employee: Employee = { id: 1, name: 'John Doe', email: 'john.doe@example.com', Date: new Date() };
    component.employee = employee;
    component.isUpdate = true;
    component.ngOnChanges({
      employee: { currentValue: employee, previousValue: null, firstChange: true, isFirstChange: () => true },
    });
    expect(component.user).toEqual(employee);
  });

  it('should reset the form when resetUser is called', () => {
    component.resetUser();
    expect(component.user.id).toBe(0);
    expect(component.user.name).toBe('');
    expect(component.user.email).toBe('');
  });

  it('should validate form fields correctly', () => {
    component.user.name = ''; // Invalid name
    component.user.email = 'invalidEmail'; // Invalid email
    component.validateForm();

    expect(component.errors['name'].length).toBeGreaterThan(0);
    expect(component.errors['email'].length).toBeGreaterThan(0);

    // Correct the values
    component.user.name = 'John Doe';
    component.user.email = 'john.doe@example.com';
    component.validateForm();

    expect(component.errors['name'].length).toBe(0);
    expect(component.errors['email'].length).toBe(0);
  });

  it('should emit employeeAdded when adding a new employee', () => {
    const newEmployee: Employee = { id: 0, name: 'Jane Doe', email: 'jane.doe@example.com', Date: new Date() };
    component.user = newEmployee;
    spyOn(component.employeeAdded, 'emit');

    component.onSubmit({ valid: true });

    expect(component.employeeAdded.emit).toHaveBeenCalledWith(newEmployee);
  });

  it('should emit employeeUpdate when updating an existing employee', () => {
    const updatedEmployee: Employee = { id: 1, name: 'Jane Smith', email: 'jane.smith@example.com', Date: new Date() };
    component.user = updatedEmployee;
    component.isUpdate = true;
    spyOn(component.employeeUpdate, 'emit');

    component.onSubmit({ valid: true });

    expect(component.employeeUpdate.emit).toHaveBeenCalledWith(updatedEmployee);
  });

  it('should not submit the form if there are validation errors', () => {
    component.user.name = '';
    component.user.email = '';
    component.validateForm();
    spyOn(component.employeeAdded, 'emit');
    spyOn(component.employeeUpdate, 'emit');

    component.onSubmit({ valid: false });

    expect(component.employeeAdded.emit).not.toHaveBeenCalled();
    expect(component.employeeUpdate.emit).not.toHaveBeenCalled();
  });
});
