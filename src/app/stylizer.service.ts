import { Injectable } from '@angular/core';

@Injectable()
export class StylizerService {

public monthlyStyles: any;

  constructor() { 

  	this.monthlyStyles = [ 
  	{backgroundColor: 'red'},
  	{color: 'orange'},
  	{color: 'blue'},
  	{color: 'brown'},
  	{color: 'teal'},
  	{color: 'black'},
  	{color: 'cyan'},
  	{color: 'magenta'},
  	{color: 'yellow'},
  	{color: 'green'},
  	{color: 'silver'},
  	{color: 'gold'}


  	 ]


  	

  }

}
