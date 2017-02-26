import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Day } from './day';
import { Month } from './month';
import { Activity } from './activity';

@Injectable()
export class CalendarService implements OnInit {

private weekday: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
private weekEnd: string[] = ["Saturday", "Sunday"];

calendar = {

      "December 25, 2017" : [new Activity("Christmas", "once", undefined, "☦")],
      "August 21, 2017" : [new Activity("Jen's Birthday", "once", undefined, "😸")],
      "Sunday" : [new Activity("Go to church", "weekly", "09:15", "☦")],
      "weekdays" : [new Activity("Go to work", "weekdays", "09:00", "☭")]

}

icons = ["☭", "☏", "😸", "🚙", "🚲", "🗽", "🎣", "🎥", 
"☦", "☕"]

occurrence = ["today", "once", "weekly", "monthly", "daily", "weekdays", "weekends"]



  constructor() { }

    

  ngOnInit(){

  }

  fetchSchedule(dayName: string, date: string){

    let thing = "weekdays";
    let schedule = [];
    let thegoatbeast = date.match(/\d+(?=,)/g)[0];
   console.log(thegoatbeast);

    if (this.calendar.hasOwnProperty(thegoatbeast)){
      console.log("it worked!");
      let monthly = this.calendar[thegoatbeast];
      monthly.forEach(function(a){
        schedule.push(a);
      })
       
      
    }



   if (this.calendar.hasOwnProperty(date)){
    let activity = this.calendar[date];
    activity.forEach(function(a){
      schedule.push(a);
    })
    
  }
   if (this.calendar.hasOwnProperty(dayName)){
    let weekly = this.calendar[dayName];
    weekly.forEach(function(a){
      schedule.push(a);
    })
   }

   if(this.calendar.hasOwnProperty("weekends")){
      if (this.weekEnd.includes(dayName)){
        let weekEnding = this.calendar["weekends"];
        weekEnding.forEach(function(a){
            schedule.push(a);
        })
     }

   }

    if (this.calendar.hasOwnProperty(thing)){
      if (this.weekday.includes(dayName)){
        let weeklyDay = this.calendar[thing];
        weeklyDay.forEach(function(a){
            schedule.push(a);
        })
        
       
      }

    }
    
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
