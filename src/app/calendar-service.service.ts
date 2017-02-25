import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Day } from './day';
import { Month } from './month';
import { Activity } from './activity';

@Injectable()
export class CalendarService implements OnInit {

private weekday: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]


calendar = {

      "December 25, 2017" : ["Christmas", undefined, undefined],
      "August 21, 2017" : ["Jen's Birthday", undefined],
      "Sunday" : ["Go to church", "9:15", "☦"],
      "weekDays" : ["Go to work", "9:00", "🚲"]

}

icons = ["☭", "☏", "😸", "🚙", "🚲", "🗽", "🎣", "🎥", 
"☦", "☕"]





  constructor() { }

    

  ngOnInit(){

  }

  fetchSchedule(dayName: string, date: string){

    let thing = "weekDays";
    let schedule = [];
   if (this.calendar.hasOwnProperty(date)){
    var activity = new Activity(this.calendar[date][0], this.calendar[date][1], this.calendar[date][2] );
    schedule.push(activity);
  }
   if (this.calendar.hasOwnProperty(dayName)){
    let weekly = new Activity(this.calendar[dayName][0], this.calendar[dayName][1], this.calendar[dayName][2]);
    schedule.push(weekly);
   }
    if (this.calendar.hasOwnProperty(thing)){
      if (this.weekday.includes(dayName)){
        let weeklyDay = new Activity(this.calendar[thing][0], this.calendar[thing][1], this.calendar[thing][2]);
        schedule.push(weeklyDay);
       
      }

    }
    
  
    return schedule;

  }


}
