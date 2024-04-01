import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component:EmployeeListComponent },
    { path: 'add-employee', component:EmployeeListComponent },
    { path: '', component:EmployeeListComponent },
    
 

];
