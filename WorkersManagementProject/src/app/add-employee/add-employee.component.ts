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
    CommonModule,
    MatDatepickerModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  serializedDate = new FormControl(new Date().toISOString());
  public addForm!: FormGroup;
  employeeId!: number
  constructor(private _employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      "firstName": new FormControl("", [Validators.required]),
      "lastName": new FormControl("", [Validators.required]),
      "tz": new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      "startWork": new FormControl("", [Validators.required]),
      "dateBirth": new FormControl("", [Validators.required]),
      "kind": new FormControl("", [Validators.required]),
    })

  }
  updateDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      const formattedDate = selectedDate.toISOString();
      // Adjust the formatted date to match the expected server format
      const formattedDateForServer = formattedDate.slice(0, 10); // Extract YYYY-MM-DD
      this.addForm.controls['startWork'].setValue(formattedDateForServer);
    }
  }
  updateDateBirth(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      const formattedDate = selectedDate.toISOString();
      // Adjust the formatted date to match the expected server format
      const formattedDateForServer = formattedDate.slice(0, 10); // Extract YYYY-MM-DD
      this.addForm.controls['dateBirth'].setValue(formattedDateForServer);
    }
  }

  addRole() {
    this._employeeService.postEmployeeServer(this.addForm.value).subscribe({
      next: (res) => {
        this._employeeService.getEmployTableServer().subscribe({
          next: (resful) => {
            this.employeeId = Number(resful.find(emp => emp.tz === this.addForm.value.tz)?.id) ?? null;
            this.dialog.open(AddRoleComponent, { data: { employeeId: this.employeeId } });
          }
        });
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



  cencel() {
    this.router.navigate(['../']);
  }



  add() {
    console.log(this.addForm.value)
    this._employeeService.postEmployeeServer(this.addForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['../']);
        console.log(this.addForm.value, "השמירה");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}