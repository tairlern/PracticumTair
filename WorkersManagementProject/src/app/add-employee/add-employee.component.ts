import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AddRoleComponent } from '../add-role/add-role.component';
import { CommonModule } from '@angular/common';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EmployeeService } from '../service/employee.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,MatCardModule, MatButtonModule,MatFormFieldModule,MatSelectModule,MatInputModule,AddRoleComponent,CommonModule,MatDatepickerModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{ 
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
   isRoleExite=false;
  public addForm!: FormGroup;
 constructor(private _employeeService:EmployeeService, private router: Router){}
 
 ngOnInit(): void {
   this.addForm = new FormGroup({
     "firstName": new FormControl("", [Validators.required]),
     "lastName": new FormControl("", [Validators.required]),
     "tz": new FormControl("", [Validators.required]),
     "startWork": new FormControl("", [Validators.required]),
     "dateBirth": new FormControl("", [Validators.required]),
     "kind": new FormControl("", [Validators.required ]),
 })

}
updateDate(event: MatDatepickerInputEvent<Date>)
 {      if (event.value) {
  const selectedDate = event.value;
  const formattedDate = selectedDate.toISOString();
  // Adjust the formatted date to match the expected server format
  const formattedDateForServer = formattedDate.slice(0, 10); // Extract YYYY-MM-DD
  this.addForm.controls['startWork'].setValue(formattedDateForServer);
}}
 updateDateBirth(event: MatDatepickerInputEvent<Date>)
 {    if (event.value) {
  const selectedDate = event.value;
  const formattedDate = selectedDate.toISOString();
  // Adjust the formatted date to match the expected server format
  const formattedDateForServer = formattedDate.slice(0, 10); // Extract YYYY-MM-DD
  this.addForm.controls['dateBirth'].setValue(formattedDateForServer);
} }
addRole(){
  this.isRoleExite=!this.isRoleExite;
}
cencel(){
}
add(){
  console.log(this.addForm.value)
  const formData = this.addForm.value;
  formData.startWork = new Date(formData.startWork);
  formData.dateBirth = new Date(formData.dateBirth);

  this._employeeService.postEmployeeServer(formData).subscribe({
    next: (res) => {
      this.router.navigate(['../']);
      console.log(formData, "השמירה");
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}