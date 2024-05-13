import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import { EmployeeService } from '../service/employee.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AddRoleComponent,
    CommonModule, MatIconModule,
    MatDatepickerModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
   addForm!: FormGroup;
   isAddRole: boolean = false
   employeeId!: number
   save = false;
   
  constructor(private _employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      "firstName": new FormControl("", [Validators.required]),
      "lastName": new FormControl("", [Validators.required]),
      "tz": new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9), this.onlyNumbers]),
      "startWork": new FormControl("", [Validators.required]),
      "dateBirth": new FormControl("", [Validators.required]),
      "kind": new FormControl("", [Validators.required]),
    });
  }

  onlyNumbers(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {
      return { onlyNumbers: true };
    }
    return null;
  }

  updateDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      const formattedDateForServer = this.formatDateForServer(selectedDate);
      this.addForm.controls['startWork'].setValue(formattedDateForServer);
    }
  }

  updateDateBirth(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      const formattedDateForServer = this.formatDateForServer(selectedDate);
      this.addForm.controls['dateBirth'].setValue(formattedDateForServer);
    }
  }

  formatDateForServer(selectedDate: Date): string {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1 < 10 ? `0${selectedDate.getMonth() + 1}` : selectedDate.getMonth() + 1;
    const day = selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate();
    return `${year}-${month}-${day}`;
  }

  addRole() {
    this.save = true
    if (this.isAddRole === false) {
      this._employeeService.postEmployeeServer(this.addForm.value).subscribe({
        next: () => {
          console.log("האדם אליו מוסיפים תפקיד",this.addForm.value)
          this.isAddRole = true;
          this._employeeService.getEmployTableServer().subscribe({
            next: (resful) => {
              this.employeeId = Number(resful.find(emp => emp.tz === this.addForm.value.tz)?.id) ?? null;
              this.dialog.open(AddRoleComponent, { data: { employeeId: this.employeeId } });
            },
            error: (err) => console.log(err)
          });
        }

      })
    }

    else {
      this._employeeService.getEmployTableServer().subscribe({
        next: (resful) => {
          this.employeeId = Number(resful.find(emp => emp.tz === this.addForm.value.tz)?.id) ?? null;
          this.dialog.open(AddRoleComponent, { data: { employeeId: this.employeeId } });
        },
        error: (err) => console.log(err)
      })
    }
  }
  cencel() {
    this.router.navigate(['../']);
  }

  add() {
    this.save = true
    if (this.isAddRole === false) {
      this._employeeService.postEmployeeServer(this.addForm.value).subscribe();
    }
    this.router.navigate(['../']);
  }
}