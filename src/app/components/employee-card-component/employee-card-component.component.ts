import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from "../../interface/Employee";
import {EmployeeService} from "../../service/employee-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-card-component',
  templateUrl: './employee-card-component.component.html',
  styleUrl: './employee-card-component.component.css'
})
export class EmployeeCardComponentComponent {
@Input() employee! : Employee;

  @Output() employeeID = new EventEmitter<number>();


constructor( private router: Router) {
}



  moreInfo(id : number) : void {
    this.router.navigate(['/employees', id])

  }

  updateEmployee(id : number) : void {
    this.employeeID.emit(id);
}
}
