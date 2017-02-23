import { Component, Input, OnChanges } from '@angular/core';
import { Day } from '../day';
import { Month } from '../month';
import { CalendarService } from '../calendar-service.service';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnChanges {

	@Input() private currentDay: Day;
	@Input() private currentMonth: Month;
	@Input() private currentYear: number = this.CS.currentYear;
	private title: string; 

  constructor(private CS: CalendarService) { }



  ngOnChanges(){
  	this.title = this.currentDay.date.toString() 
  }

}
