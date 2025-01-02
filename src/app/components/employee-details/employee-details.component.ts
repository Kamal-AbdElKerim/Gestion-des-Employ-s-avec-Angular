import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee-service.service";
import {Employee} from "../../interface/Employee";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  employee?: Employee ;
  errorMessage : any  = null;
  employeeId!: number;

  constructor(private employeeService: EmployeeService , private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (data) => {
        this.employee = data;
        console.log(data)
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }



}
