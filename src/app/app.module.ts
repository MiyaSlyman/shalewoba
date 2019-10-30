import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowComponent } from './show/show.component';
import {ShowService} from "./show/show.service";
import {MatButtonModule, MatTableModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
  ],
  providers: [ShowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
