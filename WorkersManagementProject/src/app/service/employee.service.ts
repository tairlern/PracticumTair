import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from '../models/Employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public baseUrl = 'https://localhost:7223/api/Employee'

  constructor(private http: HttpClient) { }

  getEmployTableServer(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://localhost:7223/api/Employee')
  }

  getEmployTzServer(ts: string): Observable<Employee> {
    return this.http.get<Employee[]>('https://localhost:7223/api/Employee')
      .pipe(
        map((employees: Employee[]) => employees.find(emp => emp.tz === ts)!)
      );
  }

  postEmployeeServer(emp: Employee): Observable<void> {
    return this.http.post<void>('https://localhost:7223/api/Employee', emp)
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7223/api/Employee/${id}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:7223/api/Employee/${id}`)
  }

  putEmployee(id: number, emp: Employee): Observable<void> {
    return this.http.put<void>(`https://localhost:7223/api/Employee/${id}`, emp)
  }

}

