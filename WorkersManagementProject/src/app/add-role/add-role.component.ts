
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';

import { RoleService } from '../service/role.service';
import { Role } from '../models/Role.model';
import { RoleEmployeeService } from '../service/role-employee.service';
import { Employee } from '../models/Employee.model';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'app-add-role',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatCardModule,
    MatButtonModule, MatFormFieldModule,
    MatSelectModule, MatInputModule,
    AddRoleComponent, CommonModule,
    MatCheckboxModule, MatDatepickerModule,
    MatDialogTitle, MatDialogContent,
    MatDialogActions, MatDialogClose,
    MatButtonModule,],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit {
  listRole: Role[] = [];
  listNameRole: String[] = [];
  public FormRoleEmp!: FormGroup;
  public role!: Role;
  public employee!: Employee

  constructor(private _roleService: RoleService, private _employeeService: EmployeeService, private _roleEmployeeService: RoleEmployeeService, @Inject(MAT_DIALOG_DATA) public data: { employeeId: number }, private dialog: Dialog) {
    this.FormRoleEmp = new FormGroup({
      "employeeId": new FormControl(data.employeeId),
      "roleId": new FormControl('', [Validators.required]),
      "isManagement": new FormControl(false, [Validators.required]),
      "startDate": new FormControl("", [Validators.required, this.goodDate.bind(this)]),
    });
  }

  ngOnInit(): void {
    this._roleService.getRoleTableServer().subscribe({
      next: (res) => {
        this.listRole = res;
        this.listNameRole = this.listRole.map(role => role.name);
        this._employeeService.getEmployeeById(this.data.employeeId).subscribe({ next: (res) => { this.employee = res } })
      },
      error: (err) => { console.log(err) }
    });
  }

  goodDate() {
    if (this.FormRoleEmp && this.FormRoleEmp.value && this.FormRoleEmp.value.startDate && this.employee && this.employee.startWork) {
      if (this.FormRoleEmp.value.startDate > this.employee.startWork) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  // updateDate(event: MatDatepickerInputEvent<Date>) {
  //   if (event.value) {
  //     const selectedDate = event.value;
  //     const formattedDate = selectedDate.toISOString();
  //     const formattedDateForServer = formattedDate.slice(0, 10);
  //     this.FormRoleEmp.controls['startDate'].setValue(formattedDateForServer);
  //   }
  // }

  chooseRole(selectedRole: string) {
    this._roleService.getRoleByNameServer(selectedRole).subscribe({
      next: (res) => {
        this.role = res;
        console.log(this.role, "role in next this position return")
        if (this.role && this.role.id) {
          this.FormRoleEmp.get('roleId')?.setValue(this.role.id);
        } else {
          console.log("Role or Role id is undefined");
        }
      },
      error: (err) => {
        console.log("chooseRole", err);
      }
    });
  }

  Add() {
    console.log("post role", this.FormRoleEmp.value)

    this._roleEmployeeService.postRoleEmployee(this.FormRoleEmp.value).subscribe({
      error: (err) => {
        console.log(err)
      }
    });

    this.dialog.closeAll();
  }
}
