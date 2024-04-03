import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleEmployee } from '../models/RoleEmployee.model';

@Injectable({
  providedIn: 'root'
})
export class RoleEmployeeService {

  constructor(private http: HttpClient) { }
  getEmployTableServer(): Observable<RoleEmployee[]> {
    return this.http.get<RoleEmployee[]>('https://localhost:7223/api/RoleEmployee')
  }
postRoleEmployee(roleEmployee:RoleEmployee):Observable<void>{
  return this.http.post<void>("https://localhost:7223/api/RoleEmployee",roleEmployee);
}
}
