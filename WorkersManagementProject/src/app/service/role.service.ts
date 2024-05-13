import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/Role.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoleTableServer(): Observable<Role[]> {
    return this.http.get<Role[]>('https://localhost:7223/api/Role')
  }
  
  getRoleByNameServer(selectedRole: string): Observable<Role> {
   return this.http.get<Role[]>('https://localhost:7223/api/Role')
      .pipe(
        map((roles: Role[]) => roles.find(rol => rol.name == selectedRole)!)
      );
  }

  getListRoleName():Observable<{[key: number]: string}> {
    return this.http.get<Role[]>('https://localhost:7223/api/Role')
      .pipe(
        map((roles: Role[]) => {
          return roles.reduce((acc, role) => {
            acc[role.id] = role.name;
            return acc;
          }, {} as {[key: number]: string});
        })
      );
  }
  
}
