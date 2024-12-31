import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import {FormEmployeeComponent} from "../form-employee/form-employee.component";
import {EmployeeCardComponentComponent} from "../employee-card-component/employee-card-component.component";
import {FormsModule} from "@angular/forms";
import {EmployeeDetailsComponent} from "../employee-details/employee-details.component";


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeDetailsComponent,

    FormEmployeeComponent ,
    EmployeeCardComponentComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule
  ]
})
export class EmployeesModule { }
