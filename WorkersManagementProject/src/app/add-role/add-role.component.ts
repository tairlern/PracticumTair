
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
import { RoleService } from '../service/role.service';
import { Role } from '../models/Role.model';
import { RoleEmployeeService } from '../service/role-employee.service';
import { Dialog } from '@angular/cdk/dialog';


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

  constructor(private _roleService: RoleService, private _roleEmployeeService: RoleEmployeeService, @Inject(MAT_DIALOG_DATA) public data: { employeeId: number }, private dialog: Dialog) {
    this.FormRoleEmp = new FormGroup({
      "employeeId": new FormControl(data.employeeId),
      "roleId": new FormControl('', [Validators.required]),
      "isManagement": new FormControl(false, [Validators.required]),
      "startDate": new FormControl("", [Validators.required]),
    })
  }

  ngOnInit(): void {
    this._roleService.getRoleTableServer().subscribe({
      next: (res) => {
        this.listRole = res;
        this.listNameRole = this.listRole.map(role => role.name);
      },
      error: (err) => { console.log(err) }
    })

  }

  updateDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      const formattedDate = selectedDate.toISOString();
      const formattedDateForServer = formattedDate.slice(0, 10);
      this.FormRoleEmp.controls['startDate'].setValue(formattedDateForServer);
    }
  }

  chooseRole(selectedRole: string) {
    this._roleService.getRoleByNameServer(selectedRole).subscribe({
      next: (res) => {
        this.role = res;
        console.log(this.role, "role in next this potisen return")
        if (this.role && this.role.id) {
          this.FormRoleEmp.get('roleId')?.setValue(this.role.id);
        } else {
          console.log("Role or Role id is undefined");
        }
      },
      error: (err) => {
        console.log("chooseRole", err);
      }
    })
  }

  Add() {
    console.log("post role", this.FormRoleEmp.value)

    this._roleEmployeeService.postRoleEmployee(this.FormRoleEmp.value).subscribe();
    this.dialog.closeAll();

  }
}
