import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleEmployee } from '../models/RoleEmployee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleEmployeeService {

  constructor(private http: HttpClient) { }
  getEmployTableServer(): Observable<RoleEmployee[]> {
    return this.http.get<RoleEmployee[]>('https://localhost:7223/api/RoleEmployee')
  }

}
