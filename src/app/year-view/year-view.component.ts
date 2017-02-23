import { Component, OnInit, Input } from '@angular/core';
import { Month } from '../month';
import { CalendarService } from '../calendar-service.service'

@Component({
  selector: 'app-year-view',
  templateUrl: './year-view.component.html',
  styleUrls: ['./year-view.component.css']
})
export class YearViewComponent implements OnInit {

	private months: Month[] = [];
  currentMonth: Month;  
  currentYear: number = this.CS.currentYear;
  previousMonth: Month = this.CS.currentMonth;
  nextMonth: Month = this.CS.currentMonth;

  constructor(private CS: CalendarService) { }

  ngOnInit() {
    	this.months = this.CS.getMonths();
      this.currentMonth = this.CS.months[1];
    if (this.currentMonth.index > 1){
      this.previousMonth = this.CS.months[this.currentMonth.index -2];

    } else { this.previousMonth = this.CS.months[11];}

   if (this.currentMonth.index < 10){
       this.nextMonth = this.CS.months[this.currentMonth.index+1];
     } else {this.nextMonth = this.CS.months[0];}
     

   }

   setMonth(){

    
     let monthIndex = document.querySelector("select").selectedIndex;
     this.currentMonth = this.CS.months[monthIndex];
     
     if (monthIndex>1){
       this.previousMonth = this.CS.months[monthIndex-1];
     } else {this.previousMonth = this.CS.months[11]; }
     
     if (monthIndex < 10){
       this.nextMonth = this.CS.months[monthIndex+1];
     } else {this.nextMonth = this.CS.months[0];}
     
   }


 logThis(){
  console.log(document.querySelector("select").selectedIndex);
 }


}
