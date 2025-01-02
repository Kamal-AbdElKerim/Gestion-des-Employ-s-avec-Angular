import { TestBed } from '@angular/core/testing';
import { Employee } from '../interface/Employee';
import {EmployeeService} from "./employee-service.service";

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);

    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the initial list of employees (empty)', (done) => {
    service.getEmployees().subscribe((employees) => {
      expect(employees).toEqual([]);
      done();
    });
  });

  it('should add a new employee', (done) => {
    const newEmployee: Employee = { id: 0, name: 'John Doe', email: 'john.doe@example.com', Date: new Date() };

    service.addEmployee(newEmployee).subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees[0].name).toBe('John Doe');
      expect(employees[0].email).toBe('john.doe@example.com');
      done();
    });
  });

  it('should update an existing employee', (done) => {
    const employee: Employee = { id: 0, name: 'Jane Doe', email: 'jane.doe@example.com', Date: new Date() };
    service.addEmployee(employee).subscribe(() => {
      const updatedEmployee: Employee = { id: 1, name: 'Jane Smith', email: 'jane.smith@example.com', Date: new Date() };

      service.updateEmployee(1, updatedEmployee).subscribe((employees) => {
        expect(employees[0].name).toBe('Jane Smith');
        expect(employees[0].email).toBe('jane.smith@example.com');
        done();
      });
    });
  });

  it('should delete an employee', (done) => {
    const employee: Employee = { id: 0, name: 'John Doe', email: 'john.doe@example.com', Date: new Date() };
    service.addEmployee(employee).subscribe((employees) => {
      const generatedId = employees[0].id; // Capture the generated ID
      service.deleteEmployee(generatedId).subscribe((updatedEmployees) => {
        expect(updatedEmployees.length).toBe(0); // Should be empty after deletion
        done();
      });
    });
  });


  it('should retrieve an employee by ID', (done) => {
    const employee: Employee = { id: 0, name: 'John Doe', email: 'john.doe@example.com', Date: new Date() };
    service.addEmployee(employee).subscribe((employees) => {
      const generatedId = employees[0].id; // Capture the generated ID
      service.getEmployeeById(generatedId).subscribe((foundEmployee) => {
        expect(foundEmployee?.name).toBe('John Doe');
        expect(foundEmployee?.email).toBe('john.doe@example.com');
        done();
      });
    });
  });


  it('should handle an error when updating a non-existing employee', (done) => {
    const updatedEmployee: Employee = { id: 1, name: 'Nonexistent', email: 'nonexistent@example.com', Date: new Date() };

    service.updateEmployee(999, updatedEmployee).subscribe({
      error: (error) => {
        expect(error).toBe('Employé introuvable.');
        done();
      }
    });
  });

  it('should handle an error when deleting a non-existing employee', (done) => {
    const nonExistingId = 999;

    service.deleteEmployee(nonExistingId).subscribe({
      next: () => {
        fail('Expected an error, but the observable emitted a value.');
      },
      error: (error) => {
        expect(error).toBe(`Impossible de supprimer l'employé avec l'ID ${nonExistingId}.`);
        done();
      },
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
