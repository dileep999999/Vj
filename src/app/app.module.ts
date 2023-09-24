import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCommonModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { VjHeaderComponent } from './VjHeader/vjheader.component';

@NgModule({
  declarations: [
    AppComponent,
    VjHeaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,        
    MatNativeDateModule,        
    MatMomentDateModule,       
    NgxMatTimepickerModule.setLocale('en-Us'),
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
