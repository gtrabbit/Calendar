/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalendarServiceService } from './calendar-service.service';

describe('CalendarServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarServiceService]
    });
  });

  it('should ...', inject([CalendarServiceService], (service: CalendarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
