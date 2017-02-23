import { Activity } from './activity';

export class Day {
	constructor(public dayName: string, public date: string, public schedule: Activity[]){}
}
