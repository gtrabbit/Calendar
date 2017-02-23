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

	@Input() private currentDay: Day = new Day ("", "", [{name: "cats", time: 24}]);
	@Input() private currentMonth: Month;
	private title: string; 
  private dayName: string;

  constructor(private CS: CalendarService) { }


  ngOnChanges(){
  	this.title = this.currentDay.date.toString();
    this.dayName = this.currentDay.dayName;
  }

}
