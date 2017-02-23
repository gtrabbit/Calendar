import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { Day } from '../day';
import { CalendarService } from '../calendar-service.service';
import { Month } from '../month';
import { YearViewComponent } from '../year-view/year-view.component';
import { DayViewComponent } from '../day-view/day-view.component';


@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css'],
})
export class MonthViewComponent implements OnInit, OnChanges{

  @Input() private currentMonth: Month = this.CS.months[5];
  @Input() private previousMonth: Month = this.CS.months[5];
  @Input() private nextMonth: Month = this.CS.months[5]
  private leadingDays: Day[] = [];
  private outroDays: Day[] = [];
  private daysOftheMonth: Day[] = [];
  private title: string; 
  private currentDay: Day = new Day("", [undefined, undefined])
  private daysOfTheWeek: string[] = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];





  constructor(private CS: CalendarService, private YV: YearViewComponent) { }

  ngOnInit() {
   
 
  	}

  ngOnChanges(){
    this.title = this.currentMonth.name;
    this.daysOftheMonth = [];
//generates this month's days
    for (let d = 0; d<this.currentMonth.days; d++){
      let today = new Day(this.currentMonth.name + " " + (d+1) + " " + this.CS.currentYear, [undefined, undefined])
      this.daysOftheMonth.push(today);
    }
//adds in leading days
    this.leadingDays = [];
    for (let i=this.currentMonth.offset; i > 0; i--){
      this.leadingDays.push(new Day(this.previousMonth.name+ " " + (this.previousMonth.days -  i )+ " " + this.CS.currentYear, [undefined, undefined] ))
    }
//adds in outro days
  this.outroDays = [];
  let remainingDays = 7- (this.currentMonth.days + this.currentMonth.offset)%7;
  for (let i=0; i<remainingDays; i++){
    this.outroDays.push(new Day(this.nextMonth.name+ " " + (i+1)+ " " + this.CS.currentYear, [undefined]))
  }

	}

  showDay(i){
    this.currentDay = this.daysOftheMonth[i];
  }



  backOneMonth(){
    if (this.CS.months.indexOf(this.currentMonth)>0){
      this.YV.currentMonth = this.CS.months[this.CS.months.indexOf(this.YV.currentMonth)-1];
    }
  }

  upOneMonth(){
    if (this.CS.months.indexOf(this.currentMonth)<11){
      this.YV.currentMonth = this.CS.months[this.CS.months.indexOf(this.YV.currentMonth)+1];
    }

  }

}


