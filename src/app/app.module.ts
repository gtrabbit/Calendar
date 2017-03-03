import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CalendarService } from './calendar-service.service';
import { StylizerService } from './stylizer.service';
import { AppComponent } from './app.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { DayViewComponent } from './day-view/day-view.component';
import { YearViewComponent } from './year-view/year-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthViewComponent,
    DayViewComponent,
    YearViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [CalendarService, StylizerService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
