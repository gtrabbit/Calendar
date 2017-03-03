import { Component, Input, OnChanges, DoCheck, Output, EventEmitter, OnInit } from '@angular/core';
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
export class DayViewComponent implements OnChanges, DoCheck, OnInit {

  @Output() ActivityAdded: EventEmitter<string> = new EventEmitter<string>();
 
	@Input() private currentDay: Day;
	@Input() private currentMonth: Month;
  private numberList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
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
  private theTimer: any;
  public deletedEvents: Activity;
  private toggle: boolean = false;
  private FormDisplay: boolean = false;
  constructor(private CS: CalendarService) {

    }


 

  ngDoCheck(){
//each of these if statements just sets the modelDate so that events
//can be properly fetched and assigned to days    
     switch (this.model.occurrence){
      case "weekdays":
        this.modelDate = "weekdays";
        break;

      case "weekends":
        this.modelDate = "weekends";
        break;
    
      case "daily":
        this.modelDate = "daily";
        break;

      case "today":
        this.modelDate = this.currentDay.date;
        break;

      default:
         break;
    }

  }

  ngOnInit(){

  }

  ngOnChanges(){
    
  	this.title = this.currentDay.date.toString();
    this.dayName = this.currentDay.dayName;
  }

  toggleFormDisplay(){
    const options = ["+", "x"];
    const button = document.getElementById("toggleButton");
    this.FormDisplay = !this.FormDisplay;
    if (this.FormDisplay){
      button.textContent = options[1];
    } else { button.textContent = options[0]}
  }


//this adds events
  newActivity(){
   //transforms the input type="date" tag data to the naming conventions I'm using here
    if (this.model.occurrence === "once"){
      let transformed = this.modelDate.split("-");
      transformed[1] = this.monthList[+transformed[1]-1];
      this.modelDate = transformed[1] + " " + transformed[2] + ", " + transformed[0];
    }

//this creates the new activity
    let fox = new Activity(this.model.name, this.modelDate, this.model.time, this.model.icon);

 //checks if the date already exists, and if so updates the value for that key
    if (this.CS.calendar.hasOwnProperty(this.modelDate)){
      this.CS.calendar[this.modelDate].push(fox);
 //otherwise, creates a new entry    
    } else {this.CS.calendar[this.modelDate] = [fox];
      }


     this.ActivityAdded.emit(""); //tells monthview to update events
     
  }
//for deleting events, unsurprisingly
  delete(i){
    
    this.toggle = !this.toggle;
    this.theTimer = setTimeout(() => this.toggle = false, 10000)
    this.deletedEvents = this.currentDay.schedule[i];
    let index = this.CS.calendar[this.deletedEvents.occurrence].indexOf(this.deletedEvents);
    this.CS.calendar[this.currentDay.schedule[i].occurrence].splice(index, 1);
    this.currentDay.schedule.splice(i, 1);
    this.ActivityAdded.emit("");

}

  undo(){

    clearTimeout(this.theTimer);
    this.toggle = false;
    let fox = this.deletedEvents;
    
 //checks if the date already exists, and if so updates the value for that key
    if (this.CS.calendar.hasOwnProperty(fox.occurrence)){
      this.CS.calendar[fox.occurrence].push(fox);
 //otherwise, creates a new entry    
    } else {this.CS.calendar[fox.occurrence] = [fox];
      }
     this.ActivityAdded.emit(""); 
    
  }


  logThing(){
    
    
  }


}
