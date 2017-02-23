import { Component, OnInit, Input } from '@angular/core';
import { Month } from '../month';
import { CalendarService } from '../calendar-service.service'

@Component({
  selector: 'app-year-view',
  templateUrl: './year-view.component.html',
  styleUrls: ['./year-view.component.css']
})
export class YearViewComponent implements OnInit {

	months: Month[] = [];
  currentMonth: Month;  
  currentYear: number = 2017
  previousMonth: Month;
  nextMonth: Month;
 

  constructor(private CS: CalendarService) {



             this.months = 
[
  new Month("January", 1, this.currentYear, 31, 0),
  new Month("February", 2, this.currentYear, 28, 3),
  new Month("March", 3, this.currentYear, 31, 3),
  new Month("April", 4, this.currentYear, 30, 6),
  new Month("May", 5, this.currentYear, 31, 1),
  new Month("June", 6, this.currentYear, 30, 4),
  new Month("July", 7, this.currentYear, 31, 6),
  new Month("August", 8, this.currentYear, 31, 2),
  new Month("September", 9, this.currentYear, 30, 5),
  new Month("October", 10, this.currentYear, 31, 0),
  new Month("November", 11, this.currentYear, 30, 3),
  new Month("December", 12, this.currentYear, 31, 5),
]

   }


  

  ngOnInit() {
   

    
      this.currentMonth = this.months[1];
    if (this.currentMonth.index > 0){
      this.previousMonth = this.months[this.currentMonth.index -2];

    } else { this.previousMonth = this.months[11];}

   if (this.currentMonth.index < 11){
       this.nextMonth = this.months[this.currentMonth.index];
     } else {this.nextMonth = this.months[0];}
     

   }

   setMonth(){

    
     let monthIndex = document.querySelector("select").selectedIndex;
     this.currentMonth = this.months[monthIndex];
     
     if (monthIndex>0){
       this.previousMonth = this.months[monthIndex-1];
     } else {this.previousMonth = this.months[11]; }
     
     if (monthIndex < 11){
       this.nextMonth = this.months[monthIndex+1];
     } else {this.nextMonth = this.months[0];}
     
   }


  

  






}
