import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import { ThingService } from './thing.service';

describe('ThingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ThingService]
    });
  });

  it('should be created', inject([ThingService], (service: ThingService) => {
    expect(service).toBeTruthy();
  }));
});
