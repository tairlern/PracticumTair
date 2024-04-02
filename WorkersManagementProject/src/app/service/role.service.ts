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
    //  this.http.get<Role[]>('https://localhost:7223/api/Role')
   return this.http.get<Role[]>('https://localhost:7223/api/Role')
      .pipe(
        map((roles: Role[]) => roles.find(rol => rol.name === selectedRole)!)
      );
  }

}
