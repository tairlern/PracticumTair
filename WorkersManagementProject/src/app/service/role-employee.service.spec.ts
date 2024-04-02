import { TestBed } from '@angular/core/testing';

import { RoleEmployeeService } from './role-employee.service';

describe('RoleEmployeeService', () => {
  let service: RoleEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
