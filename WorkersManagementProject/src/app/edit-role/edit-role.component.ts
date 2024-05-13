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
import { RoleEmployee } from '../models/RoleEmployee.model';


@Component({
  selector: 'app-edit-role',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatCardModule,
    MatButtonModule, MatFormFieldModule,
    MatSelectModule, MatInputModule,
    CommonModule,
    MatCheckboxModule, MatDatepickerModule,
    MatDialogTitle, MatDialogContent,
    MatDialogActions, MatDialogClose,
    MatButtonModule,],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit {
  FormRoleEmp!: FormGroup;
  role!: Role;
  roleEmploye!: RoleEmployee;
  employee!: Employee;
  listRole: Role[] = [];
  listChoose: String[] = [];
  listNameRole: String[] = [];
  listRoleEmployee: number[] = [];

  constructor(private _roleService: RoleService, private _employeeService: EmployeeService, private _roleEmployeeService: RoleEmployeeService, @Inject(MAT_DIALOG_DATA) public data: { employeeId: number, roleId: number }, private dialog: Dialog) {
    this.FormRoleEmp = new FormGroup({
      "employeeId": new FormControl(data.employeeId),
      "roleId": new FormControl(data.roleId, [Validators.required]),
      "isManagement": new FormControl(this.roleEmploye?.isManagement, [Validators.required]),
      "startDate": new FormControl(this.roleEmploye?.startDate, [Validators.required, this.goodDate.bind(this)]),
    });
  }

  ngOnInit(): void {
    this._roleEmployeeService.getRolesById(this.data.employeeId).subscribe({
      next: (res) => {
        this.listRoleEmployee = res.map(l => l.roleId);
      }
    })

    this._roleService.getRoleTableServer().subscribe({
      next: (res) => {
        this.listRole = res;
        this.listNameRole = this.listRole.map(role => role.name);

        this._employeeService.getEmployeeById(this.data.employeeId).subscribe({
          next: (res) => {
            this.employee = res
            this.listChoose = this.listRole
              .filter(role => !this.listRoleEmployee.includes(role.id))
              .map(role => role.name);
            console.log(this.listChoose, "listChose");
            console.log(this.listNameRole, "listname")
          }
        })
      },
      error: (err) => { console.log(err) }
    });

    this._roleEmployeeService.getRoleEmployee(this.data.employeeId, this.data.roleId).subscribe({
      next: (res) => {
        this.roleEmploye = res;
        this.FormRoleEmp = new FormGroup({
          "employeeId": new FormControl(this.data.employeeId),
          "roleId": new FormControl(this.data.roleId, [Validators.required]),
          "isManagement": new FormControl(this.roleEmploye?.isManagement, [Validators.required]),
          "startDate": new FormControl(this.roleEmploye?.startDate, [Validators.required, this.goodDate.bind(this)]),
        });

      },
      error: (err) => { console.log(err) }
    });
  }

  goodDate() {
    const startDateControl = this.FormRoleEmp?.get('startDate');
    if (startDateControl && this.employee && this.employee.startWork) {
      const startDate = startDateControl.value;
      const employeeStartWorkDate = new Date(this.employee.startWork);
      const roleStartDate = new Date(startDate);

      if (roleStartDate < employeeStartWorkDate) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  updateDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      const formattedDateForServer = this.formatDateForServer(selectedDate);
      this.FormRoleEmp.controls['startDate'].setValue(formattedDateForServer);
    }
  }

  formatDateForServer(selectedDate: Date): string {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1 < 10 ? `0${selectedDate.getMonth() + 1}` : selectedDate.getMonth() + 1;
    const day = selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate();
    return `${year}-${month}-${day}`;
  }

  chooseRole(selectedRole: string) {
    this._roleService.getRoleByNameServer(selectedRole).subscribe({
      next: (res) => {
        this.role = res;
        console.log(this.role, "role in next this position return")
        if (this.role && this.role.id) {
          this.FormRoleEmp.get('nameRole')?.setValue(selectedRole);
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
    this._roleEmployeeService.putEmmployeeRole(this.data.employeeId, this.data.roleId, this.FormRoleEmp.value).subscribe({
      next: () => {
        location.reload();
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.dialog.closeAll();
  }
}

