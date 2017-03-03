/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StylizerService } from './stylizer.service';

describe('StylizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StylizerService]
    });
  });

  it('should ...', inject([StylizerService], (service: StylizerService) => {
    expect(service).toBeTruthy();
  }));
});
