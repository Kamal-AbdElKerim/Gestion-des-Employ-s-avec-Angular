import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeComponent } from './employe/employe.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeCardComponentComponent } from './components/employee-card-component/employee-card-component.component';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';
import {ErrorComponent} from "./components/error/error.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    EmployeComponent,
    NotFoundPageComponent,
    NavbarComponent,
    EmployeeListComponent,
    EmployeeCardComponentComponent,
    FormEmployeeComponent,
    ErrorComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
