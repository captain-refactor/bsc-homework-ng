import {TestBed} from '@angular/core/testing';

import {NotesClientService} from './notes-client.service';
import {HttpClientModule} from '@angular/common/http';

describe('NotesClientService', () => {
  let service: NotesClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(NotesClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
