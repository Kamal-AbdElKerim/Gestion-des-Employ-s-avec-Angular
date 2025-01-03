import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeCardComponentComponent } from './employee-card-component.component';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee/employee-service.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormatDatePipe } from '../../Pipe/format-date.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Mock EmployeeService
class MockEmployeeService {
  deleteEmployee = jasmine.createSpy('deleteEmployee').and.returnValue(of([]));
}

// Mock Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

// Test suite
describe('EmployeeCardComponentComponent', () => {
  let component: EmployeeCardComponentComponent;
  let fixture: ComponentFixture<EmployeeCardComponentComponent>;
  let mockRouter: MockRouter;
  let mockEmployeeService: MockEmployeeService;

  beforeEach(async () => {
    mockRouter = new MockRouter();
    mockEmployeeService = new MockEmployeeService();

    await TestBed.configureTestingModule({
      declarations: [EmployeeCardComponentComponent, FormatDatePipe],
      imports: [FormsModule],
      providers: [
        { provide: EmployeeService, useClass: MockEmployeeService },
        { provide: Router, useClass: MockRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown components if needed
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCardComponentComponent);
    component = fixture.componentInstance;

    // Provide mock employee data
    component.employee = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      Date: new Date(),
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should call updateEmployee and emit the employee ID', () => {
    const id = 1;
    spyOn(component.employeeID, 'emit');
    component.updateEmployee(id);
    expect(component.employeeID.emit).toHaveBeenCalledWith(id);
  });


});
