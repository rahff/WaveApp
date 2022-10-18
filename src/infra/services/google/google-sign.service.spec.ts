import { TestBed } from '@angular/core/testing';
import { GoogleSignService } from './google-sign.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('GoogleSignService', () => {
  let service: GoogleSignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GoogleSignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
