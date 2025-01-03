import { TestBed } from '@angular/core/testing';
import { Employee } from '../../interface/Employee';
import { EmployeeService } from './employee-service.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'clear').and.callFake(() => {});

    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the initial list of employees (empty)', (done) => {
    // Clear localStorage before running the test
    localStorage.clear();

    service.getEmployees().subscribe((employees) => {
      // Expect the employees list to be empty
      expect(employees).toEqual([]);
      done();
    });
  });


  it('should add a new employee', (done) => {
    const newEmployee: Employee = { id: 0, name: 'John Doe', email: 'john.doe@example.com', Date: new Date() };

    service.addEmployee(newEmployee).subscribe(() => {
      service.getEmployees().subscribe((employees) => {
        expect(employees.length).toBe(1);
        expect(employees[0].name).toBe('John Doe');
        expect(employees[0].email).toBe('john.doe@example.com');
        done();
      });
    });
  });

  it('should update an existing employee', (done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // Increase timeout to 10 seconds

    const employee: Employee = { id: 0, name: 'Jane Doe', email: 'jane.doe@example.com', Date: new Date() };

    service.addEmployee(employee).subscribe((addedEmployees) => {
      console.log('Employees after adding:', addedEmployees);

      const employeeId = addedEmployees[0].id;

      const updatedEmployee: Employee = { id: employeeId, name: 'Jane Smith', email: 'jane.smith@example.com', Date: new Date() };

      service.updateEmployee(employeeId, updatedEmployee).subscribe(() => {
        service.getEmployees().subscribe((employees) => {
          console.log('Employees after update:', employees);

          // Validate the updated employee
          expect(employees[0].name).toBe('Jane Smith');
          expect(employees[0].email).toBe('jane.smith@example.com');
          done();
        });
      });
    });
  });



  it('should delete an employee', (done) => {
    const employee: Employee = { id: 0, name: 'John Doe', email: 'john.doe@example.com', Date: new Date() };

    service.addEmployee(employee).subscribe(() => {
      service.deleteEmployee(employee.id).subscribe(() => {
        service.getEmployees().subscribe((employees) => {
          // Check if the list of employees is empty after deletion
          expect(employees.length).toBe(0);
          done();
        });
      });
    });
  });


  it('should retrieve an employee by ID', (done) => {
    const employee: Employee = { id: 0, name: 'John Doe', email: 'john.doe@example.com', Date: new Date() };
    service.addEmployee(employee).subscribe(() => {
      const generatedId = employee.id;
      service.getEmployeeById(generatedId).subscribe((foundEmployee) => {
        expect(foundEmployee?.name).toBe('John Doe');
        expect(foundEmployee?.email).toBe('john.doe@example.com');
        done();
      });
    });
  });

  it('should handle an error when updating a non-existing employee', (done) => {
    const updatedEmployee: Employee = { id: 999, name: 'Nonexistent', email: 'nonexistent@example.com', Date: new Date() };

    service.updateEmployee(999, updatedEmployee).subscribe({
      error: (error) => {
        expect(error).toBe('Employé introuvable.');
        done();
      }
    });
  });

  it('should handle an error when retrieving a non-existing employee by ID', (done) => {
    service.getEmployeeById(999).subscribe({
      error: (error) => {
        expect(error).toBe('Employé avec l\'ID 999 introuvable.');
        done();
      }
    });
  });
});
