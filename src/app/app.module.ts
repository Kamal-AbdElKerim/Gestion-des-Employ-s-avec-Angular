import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ErrorComponent} from "./components/error/error.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HighlightDirective} from "./highlight/highlight.directive";

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
    FormsModule
  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
