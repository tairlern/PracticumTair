import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Employee } from './models/Employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public baseUrl = 'https://localhost:7223/api/Employee'
  
  constructor(private http: HttpClient) { }

  getEmployTableServer(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://localhost:7223/api/Employee')
  }
}
