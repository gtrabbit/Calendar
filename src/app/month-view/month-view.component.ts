import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { Day } from '../day';
import { Activity } from '../activity';
import { CalendarService } from '../calendar-service.service';
import { Month } from '../month';
import { YearViewComponent } from '../year-view/year-view.component';
import { DayViewComponent } from '../day-view/day-view.component';
import { StylizerService } from '../stylizer.service';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css'],
})
export class MonthViewComponent implements OnInit, OnChanges{


  @Input() private currentDate: Date;
  @Input() private currentMonth: Month = this.YV.months[5];
  @Input() private previousMonth: Month = this.YV.months[5];
  @Input() private nextMonth: Month = this.YV.months[5];
  @Input() private currentYear: number = this.YV.currentYear;
  private leadingDays: Day[] = [];
  private outroDays: Day[] = [];
  private daysOftheMonth: Day[] = [];
  private allDisplayedDays: Day[] = [];
  private title: string; 
  private currentDay: Day = new Day("undefined", "undefined", undefined)
  private ghostOfTheCurrentDay: number; 
  private daysOfTheWeek: string[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  





  constructor(private CS: CalendarService, private YV: YearViewComponent) {
   const regex: RegExp = /\d+(?=,)/g;
   }

 makeNewDays(){
    this.allDisplayedDays = [];
    const padding = "00";
    this.title = this.currentMonth.name;
    this.daysOftheMonth = [];
//generates this month's days
    for (let d = 0; d<this.currentMonth.days; d++){
      let str = "" + (d+1);
      let dayNumber = padding.substring(0, padding.length - str.length) + str;
      let dateNow = this.currentMonth.name + " " + dayNumber + ", " + this.YV.currentYear;
      let dayName = this.daysOfTheWeek[(this.currentMonth.offset+d)%7]
      let today = new Day(dayName, dateNow, this.CS.fetchSchedule(dayName, dateNow))
      this.daysOftheMonth.push(today);
      this.allDisplayedDays.push(today);
    }
//adds in leading days
    this.leadingDays = [];
    for (let i=this.currentMonth.offset; i > 0; i--){
      let dayName1 = this.daysOfTheWeek[(this.currentMonth.offset - i)];
      let dateThen = this.previousMonth.name+ " " + (this.previousMonth.days -  (i-1) )+ ", " + this.YV.currentYear;
      let today = new Day(dayName1, dateThen, this.CS.fetchSchedule(dayName1, dateThen))
      this.leadingDays.push(today);
      this.allDisplayedDays.push(today);
    }
//adds in outro days
  this.outroDays = [];
  let remainingDays = (7- (this.currentMonth.days + this.currentMonth.offset)%7)%7;
  for (let i=0; i<remainingDays; i++){
    let str = "" + (i+1);
    let dayNumber = padding.substring(0, padding.length - str.length) + str;
    let dayName2 = this.daysOfTheWeek[6-((this.currentMonth.days - this.currentMonth.offset)%7)  + i];
    let dateNext = this.nextMonth.name+ " " + dayNumber+ ", " + this.YV.currentYear;
    let today = new Day(dayName2, dateNext, this.CS.fetchSchedule(dayName2, dateNext))
    this.outroDays.push(today);
    this.allDisplayedDays.push(today);
  }

//note that these days are created dynamically each time a new month
// is loaded thus no changes made to these arrays persist
// --add all events to CS.calendar
    }

  ngOnInit() {
   
   this.currentDay = this.daysOftheMonth[this.currentDate.getDate()-1];
    this.ghostOfTheCurrentDay = this.allDisplayedDays.indexOf(this.currentDay);
  	}

  ngOnChanges(){
    this.makeNewDays() 
    
  }
//displays current day in the day-view component
  showDay(day){
    console.log(day);
    this.currentDay = day;
    this.ghostOfTheCurrentDay = this.allDisplayedDays.indexOf(this.currentDay);
       
  }

  OnActAdded(activity: string){
    this.makeNewDays();
    this.currentDay = this.allDisplayedDays[this.ghostOfTheCurrentDay];
    
    
    
  }


  

  

}


