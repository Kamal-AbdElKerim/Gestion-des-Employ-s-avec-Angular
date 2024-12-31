import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from "../../interface/Employee";
import {EmployeeService} from "../../service/employee-service.service";
import {Router} from "@angular/router";
import {NotyfService} from "../../service/notyf.service";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-card-component',
  templateUrl: './employee-card-component.component.html',
  styleUrl: './employee-card-component.component.css'
})
export class EmployeeCardComponentComponent {
@Input() employee! : Employee;

  @Output() employeeID = new EventEmitter<number>();


constructor( private router: Router , private employeeService: EmployeeService , private notyf : NotyfService) {
}



  moreInfo(id : number) : void {
    this.router.navigate(['/employees', id])

  }

  updateEmployee(id : number) : void {
    this.employeeID.emit(id);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  deleteEmployee(id: number) : void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this employee!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe(
          (updatedEmployees) => {
            Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting employee:', error);
            Swal.fire('Error', 'There was an error deleting the employee.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The employee is safe.', 'error');
      }
    });
  }
}
