import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeComponent} from "./employe/employe.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";

const routes: Routes = [
  {
    path: "list/employees" ,
    component : EmployeeListComponent
  },
  {
    path: "**",
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
