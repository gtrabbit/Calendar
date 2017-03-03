import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Day } from './day';
import { Month } from './month';
import { Activity } from './activity';

@Injectable()
export class CalendarService implements OnInit {

private weekday: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
private weekEnd: string[] = ["Saturday", "Sunday"];

calendar = {

      "December 25, 2017" : [new Activity("Christmas", "December 25, 2017", undefined, "☦")],
      "August 21, 2017" : [new Activity("Jen's Birthday", "August 21, 2017", undefined, "😸")],
      "Sunday" : [new Activity("Go to church", "Sunday", "09:15", "☦")],
      "weekdays" : [new Activity("Go to work", "weekdays", "09:00", "☭")]

}

icons = ["☭", "☏", "😸", "🚙", "🚲", "🗽", "🎣", "🎥", 
"☦", "☕"]

occurrence = ["today", "once", "weekly", "monthly", "daily", "weekdays", "weekends"]
categories = ["Holiday", "Work", "Entertainment", "Religious", "Social", "Errands/Appointments", "Medical", "School", "Personal", "Family", "Community"]


  constructor() { }

    

  ngOnInit(){


  }
  

  fetchSchedule(dayName: string, date: string){

    let thing = "weekdays";
    let schedule = [];
    let thegoatbeast = date.match(/\d+(?=,)/g)[0];
  
    if (this.calendar.hasOwnProperty("daily")){
    let daily = this.calendar["daily"];
    daily.forEach(function(a){
      schedule.push(a);
      })
    }

//fetches monthly events
    if (this.calendar.hasOwnProperty(thegoatbeast)){
      let monthly = this.calendar[thegoatbeast];
      monthly.forEach(function(a){
        schedule.push(a);
      })     
    }


//fetches events linked to individual days
   if (this.calendar.hasOwnProperty(date)){
    let activity = this.calendar[date];
    activity.forEach(function(a){
      schedule.push(a);
    })
  }

//fetches weekly events by day of the week
   if (this.calendar.hasOwnProperty(dayName)){
    let weekly = this.calendar[dayName];
    weekly.forEach(function(a){
      schedule.push(a);
    })
   }

//fetches events linked to weekends
   if(this.calendar.hasOwnProperty("weekends")){
      if (this.weekEnd.includes(dayName)){
        let weekEnding = this.calendar["weekends"];
        weekEnding.forEach(function(a){
            schedule.push(a);
        })
     }
   }

//fetches events linked to weekdays
    if (this.calendar.hasOwnProperty(thing)){
      if (this.weekday.includes(dayName)){
        let weeklyDay = this.calendar[thing];
        weeklyDay.forEach(function(a){
            schedule.push(a);
        })
      }
    }



//sorts the events chronologically   
  schedule.sort(function(a, b){
    if (a.time < b.time){
      return -1
    } else if (a.time > b.time){
     return 1}
     return 0;
  })

    return schedule;

  }


}
