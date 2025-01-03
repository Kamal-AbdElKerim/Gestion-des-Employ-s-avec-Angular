import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesComponent } from './employees.component';
import { EmployeeService } from '../../service/employee/employee-service.service';
import { SweetAlertService } from '../../service/sweet/sweet-alert.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Employee } from '../../interface/Employee';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Mock services
class MockEmployeeService {
  getEmployees = jasmine.createSpy().and.returnValue(of([]));
  addEmployee = jasmine.createSpy().and.returnValue(of({}));
  updateEmployee = jasmine.createSpy().and.returnValue(of({}));
  getEmployeeById = jasmine.createSpy().and.returnValue(of({}));
}

class MockSweetAlertService {
  showSuccess = jasmine.createSpy();
  showError = jasmine.createSpy();
}

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let mockEmployeeService: MockEmployeeService;
  let mockSweetAlertService: MockSweetAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      imports: [FormsModule],
      providers: [
        { provide: EmployeeService, useClass: MockEmployeeService },
        { provide: SweetAlertService, useClass: MockSweetAlertService },
        { provide: Router, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    mockEmployeeService = TestBed.inject(EmployeeService) as unknown as MockEmployeeService;
    mockSweetAlertService = TestBed.inject(SweetAlertService) as unknown as MockSweetAlertService;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees on initialization', () => {
    const employees: Employee[] = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', Date: new Date() },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', Date: new Date() },
    ];

    // Mocking the service to return a list of employees
    mockEmployeeService.getEmployees.and.returnValue(of(employees));


    component.loadEmployees();

    expect(component.employees.length).toBe(2);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error when getting employee by ID', () => {
    const employeeId = 1;
    const errorMessage = 'Failed to get employee';

    // Mocking the service to throw an error
    mockEmployeeService.getEmployeeById.and.returnValue(throwError(errorMessage));

    component.getIdUpdate(employeeId);

    expect(component.errorMessage).toBe(errorMessage);
  });

  it('should add a new employee successfully', () => {
    const newEmployee: Employee = {
      id: 0,
      name: 'New Employee',
      email: 'new.employee@example.com',
      Date: new Date(),
    };

    component.newEmployee = newEmployee;

    mockEmployeeService.addEmployee.and.returnValue(of(newEmployee));

    component.addEmployee();

    expect(mockEmployeeService.addEmployee).toHaveBeenCalledWith(newEmployee);

    expect(component.errorMessage).toBeNull();

    expect(mockSweetAlertService.showSuccess).toHaveBeenCalledWith(
      `Employee ${newEmployee.name} added successfully`
    );
  });


  it('should retrieve employee by ID for update', () => {
    const employeeId = 1;
    const employeeToRetrieve: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      Date: new Date(),
    };

    mockEmployeeService.getEmployeeById.and.returnValue(of(employeeToRetrieve));

    component.getIdUpdate(employeeId);

    expect(component.employee).toEqual(employeeToRetrieve);
    expect(component.isUpdate).toBeTrue();
  });

  it('should reset and add employee when onEmployeeAdded is called', () => {
    const employeeToAdd: Employee = {
      id: 0,
      name: 'New Employee',
      email: 'new.employee@example.com',
      Date: new Date(),
    };

    mockEmployeeService.addEmployee.and.returnValue(of(employeeToAdd));

    component.onEmployeeAdded(employeeToAdd);

    expect(component.newEmployee).toEqual(employeeToAdd);

    expect(mockEmployeeService.addEmployee).toHaveBeenCalledWith(employeeToAdd);

    expect(mockSweetAlertService.showSuccess).toHaveBeenCalledWith(
      `Employee ${employeeToAdd.name} added successfully`
    );
  });

});
