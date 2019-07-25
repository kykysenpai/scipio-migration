import { TestBed } from '@angular/core/testing';

import { CommunistSplitService } from './communist-split.service';

describe('CommunistSplitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunistSplitService = TestBed.get(CommunistSplitService);
    expect(service).toBeTruthy();
  });
});
