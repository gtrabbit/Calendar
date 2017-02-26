import { Component, Input, OnChanges, DoCheck } from '@angular/core';
import { Day } from '../day';
import { Month } from '../month';
import { Activity } from '../activity';
import { CalendarService } from '../calendar-service.service';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-day-view',
  moduleId: module.id,
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnChanges, DoCheck {

	@Input() private currentDay: Day = new Day ("", "", undefined);
	@Input() private currentMonth: Month;
	private title: string; 
  private dayName: string;
  private daysOfTheWeek: string[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  private monthList = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
  ActivityForm: FormGroup;
  model: Activity = new Activity("", "today", undefined, undefined);
  modelDate: any;
  occurrence = new String("once");
  public deletedEvents = [];
  constructor(private CS: CalendarService) { }


  ngDoCheck(){
      if (this.model.occurrence === "weekdays"){
      this.modelDate = "weekdays";
    }
       if (this.model.occurrence === "weekends"){
      this.modelDate = "weekends";
    }
     if (this.model.occurrence === "daily"){
      this.modelDate = "daily";
    }
    if (this.model.occurrence === "today"){
      this.modelDate = this.currentDay.date;
    }

  }

  ngOnChanges(){
    
  	this.title = this.currentDay.date.toString();
    this.dayName = this.currentDay.dayName;
  }

  newActivity(){
   
    if (this.model.occurrence === "once"){
      let transformed = this.modelDate.split("-");
      transformed[1] = this.monthList[+transformed[1]-1];
      this.modelDate = transformed[1] + " " + transformed[2] + ", " + transformed[0];
    }


    let fox = new Activity(this.model.name, this.model.occurrence, this.model.time, this.model.icon);
     if (this.model.occurrence === "today"){
      this.currentDay.schedule.push(fox);
      this.currentDay.schedule.sort(function(a, b){
        if (a.time < b.time){
          return -1
        } else if (a.time > b.time){
         return 1}
         return 0;
        })
      }

    if (this.CS.calendar.hasOwnProperty(this.modelDate)){
      this.CS.calendar[this.modelDate].push(fox);
     
    } else {this.CS.calendar[this.modelDate] = [fox];
      }
  }

  delete(i){
   
    if (this.currentDay.schedule[i].occurrence === "daily" || this.currentDay.schedule[i].occurrence === "once"){
       
        this.deletedEvents.push(
          this.CS.calendar[this.currentDay.date].splice(i, 1)[0]);
        this.currentDay.schedule.splice(i, 1);
    } else if (this.currentDay.schedule[i].occurrence === "weekly" ){
        this.deletedEvents.push(this.CS.calendar[this.currentDay.dayName]
          .splice(i, 1)[0]
          );
        this.currentDay.schedule.splice(i, 1);
    } else {
     
      this.deletedEvents.push(
        this.CS.calendar[this.currentDay.schedule[i].occurrence].splice(i, 1)[0]);
      
      this.currentDay.schedule.splice(i, 1);
    
    }


}

  logThing(){
    console.log(this.CS.calendar);
  }


}
