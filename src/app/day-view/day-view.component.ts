import { Component, Input, OnChanges } from '@angular/core';
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
export class DayViewComponent implements OnChanges {

	@Input() private currentDay: Day = new Day ("", "", undefined);
	@Input() private currentMonth: Month;
	private title: string; 
  private dayName: string;
  private daysOfTheWeek: string[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  ActivityForm: FormGroup;
  model = new Activity("activity", "", 4, undefined);
  occurrence = new String("once");
  constructor(private CS: CalendarService) { }


  ngOnChanges(){
  	this.title = this.currentDay.date.toString();
    this.dayName = this.currentDay.dayName;
  }

  newActivity(){
    let fox = new Activity(this.model.name, this.model.occurrence, this.model.time, this.model.icon);
    this.currentDay.schedule.push(fox);
    this.currentDay.schedule.sort(function(a, b){
    if (a.time < b.time){
      return -1
    } else if (a.time > b.time){
     return 1}
     return 0;
  })

    if (this.CS.calendar.hasOwnProperty(this.currentDay.date)){
      this.CS.calendar[this.currentDay.date].push(fox);
    } else {this.CS.calendar[this.currentDay.date] = [fox];}
  }

  delete(i){
    if (this.CS.calendar.hasOwnProperty(this.currentDay.date)){
    console.log("this happens");
    this.CS.calendar[this.currentDay.date].splice(i, 1);
    this.currentDay.schedule.splice(i, 1);
  }}


}
