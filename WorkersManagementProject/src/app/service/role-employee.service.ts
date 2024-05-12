import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RoleEmployee } from '../models/RoleEmployee.model';

@Injectable({
  providedIn: 'root'
})
export class RoleEmployeeService {

  constructor(private http: HttpClient) { }
  getEmployTableServer(): Observable<RoleEmployee[]> {
    return this.http.get<RoleEmployee[]>('https://localhost:7223/api/RoleEmployee')
  }

  postRoleEmployee(roleEmployee: RoleEmployee): Observable<void> {
    return this.http.post<void>(`https://localhost:7223/api/RoleEmployee`, roleEmployee);
  }

  getRoleEmployee(ide: number, idr: number):Observable<RoleEmployee>{
    return this.http.get<RoleEmployee>(`https://localhost:7223/api/RoleEmployee/${ide}/${idr}`)
  }

  getRolesById(id: number): Observable<RoleEmployee[]> {
    return this.http.get<RoleEmployee[]>('https://localhost:7223/api/RoleEmployee')
      .pipe(
        map((roles: RoleEmployee[]) => roles.filter(role => role.employeeId === id))
      );
  }

  deleteRoleById(ide: number, idr: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7223/api/RoleEmployee/${ide}/${idr}`)
  }
  
  putEmmployeeRole(ide: number, idr: number, roleEmployee: RoleEmployee): Observable<void> {
    return this.http.put<void>(`https://localhost:7223/api/RoleEmployee/${ide}/${idr}`, roleEmployee)
  }
}
