import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/Role.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  getEmployTableServer(): Observable<Role[]> {
    return this.http.get<Role[]>('https://localhost:7223/api/Role')
  }

}
