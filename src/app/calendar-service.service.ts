import { Injectable, EventEmitter } from '@angular/core';
import { Day } from './day';
import { Month } from './month';

@Injectable()
export class CalendarService {


private leapOffset: number = 0;
months: Month[] = [
	new Month("January", 1, this.currentYear, 31, 0),
	new Month("February", 2, this.currentYear, 28, 3),
	new Month("March", 3, this.currentYear, 31, 3+this.leapOffset),
	new Month("April", 4, this.currentYear, 30, 6+this.leapOffset),
	new Month("May", 5, this.currentYear, 31, 1+this.leapOffset),
	new Month("June", 6, this.currentYear, 30, 4+this.leapOffset),
	new Month("July", 7, this.currentYear, 31, 6+this.leapOffset),
	new Month("August", 8, this.currentYear, 31, 2+this.leapOffset),
	new Month("September", 9, this.currentYear, 30, 5+this.leapOffset),
	new Month("October", 10, this.currentYear, 31, 0+this.leapOffset),
	new Month("November", 11, this.currentYear, 30, 3+this.leapOffset),
	new Month("December", 12, this.currentYear, 31, 5+this.leapOffset),
]

currentMonth: Month = this.months[1];
currentYear: number = 2017;

  constructor() { }




	getMonths(){
	return this.months;
}

 	

	



}
