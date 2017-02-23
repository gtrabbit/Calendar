import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Day } from './day';
import { Month } from './month';
import { Activity } from './activity';

@Injectable()
export class CalendarService implements OnInit {

private weekday: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]


calendar = {

      "December 25, 2017" : ["Christmas", "all day"],
      "August 21, 2017" : ["Jen's Birthday"],
      "Sunday" : ["Go to church", "9:15"],
      "weekDays" : ["Go to work", "hopefully by 9"]

}

   



  constructor() { }

    

  ngOnInit(){

  }

  fetchSchedule(dayName: string, date: string){

    let thing = "weekDays";
    let schedule = [];
   if (this.calendar.hasOwnProperty(date)){
    let activity = new Activity(this.calendar[date]);
    schedule.push(activity);
  }
   if (this.calendar.hasOwnProperty(dayName)){
    let weekly = new Activity(this.calendar[dayName]);
    schedule.push(weekly);
   }
    if (this.calendar.hasOwnProperty(thing)){
      if (this.weekday.includes(dayName)){
        let weeklyDay = new Activity(this.calendar[thing]);
        schedule.push(weeklyDay);
      }

    }
    
   
    return schedule;

  }


}
