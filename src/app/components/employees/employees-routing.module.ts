import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import {EmployeeDetailsComponent} from "../employee-details/employee-details.component";

const routes: Routes = [
  {
    path: "" ,
    component : EmployeesComponent
  } ,
  {
    path: ":id" ,
    component : EmployeeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
