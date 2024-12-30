import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCardComponentComponent } from './employee-card-component.component';

describe('EmployeeCardComponentComponent', () => {
  let component: EmployeeCardComponentComponent;
  let fixture: ComponentFixture<EmployeeCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeCardComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
