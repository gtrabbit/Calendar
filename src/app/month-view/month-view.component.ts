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

  @Input() private currentMonth: Month = this.YV.months[5];
  @Input() private previousMonth: Month = this.YV.months[5];
  @Input() private nextMonth: Month = this.YV.months[5];
  @Input() private currentYear: number = this.YV.currentYear;
  private leadingDays: Day[] = [];
  private outroDays: Day[] = [];
  private daysOftheMonth: Day[] = [];
  private title: string; 
  private currentDay: Day = new Day("please", "select a day", [])
  private daysOfTheWeek: string[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];





  constructor(private CS: CalendarService, private YV: YearViewComponent) { }

  ngOnInit() {
   
 
  	}

  ngOnChanges(){
 
    this.title = this.currentMonth.name;
    this.daysOftheMonth = [];
//generates this month's days
    for (let d = 0; d<this.currentMonth.days; d++){

      let dateNow = this.currentMonth.name + " " + (d+1) + ", " + this.YV.currentYear;
      let dayName = this.daysOfTheWeek[(this.currentMonth.offset+d)%7]
      let today = new Day(dayName, dateNow, this.CS.fetchSchedule(dayName, dateNow))
      this.daysOftheMonth.push(today);
    }
//adds in leading days
    this.leadingDays = [];
    for (let i=this.currentMonth.offset; i > 0; i--){
      let dayName1 = this.daysOfTheWeek[(this.currentMonth.offset - i)];
      let dateThen = this.previousMonth.name+ " " + (this.previousMonth.days -  i )+ ", " + this.YV.currentYear;
      this.leadingDays.push(new Day(dayName1, dateThen, this.CS.fetchSchedule(dayName1, dateThen) ))
    }
//adds in outro days
  this.outroDays = [];
  let remainingDays = (7- (this.currentMonth.days + this.currentMonth.offset)%7)%7;
  for (let i=0; i<remainingDays; i++){
    let dayName2 = this.daysOfTheWeek[6-(this.currentMonth.offset + this.currentMonth.days)%7 + i];
    let dateNext = this.nextMonth.name+ " " + (i+1)+ ", " + this.YV.currentYear;
    this.outroDays.push(new Day(dayName2, dateNext, this.CS.fetchSchedule(dayName2, dateNext)))
  }

	}

  showDay(day){

    this.currentDay = day;
    console.log(day);
   
  }




  

  

}


