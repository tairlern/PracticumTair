import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component:EmployeeListComponent },
    { path: 'add-employee', component:AddEmployeeComponent },
    { path: 'edit-employee', component:EditEmployeeComponent },
    
];
