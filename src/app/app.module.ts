import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ErrorComponent} from "./components/error/error.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeesModule} from "./components/employees/employees.module";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    NavbarComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EmployeesModule,
  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
