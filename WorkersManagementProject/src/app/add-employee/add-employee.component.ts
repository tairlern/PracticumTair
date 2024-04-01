import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AddRoleComponent } from '../add-role/add-role.component';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
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
 constructor(){}
 
 ngOnInit(): void {
   this.addForm = new FormGroup({
     "firstName": new FormControl("", [Validators.required]),
     "lastName": new FormControl("", [Validators.required]),
     "tz": new FormControl("", [Validators.required]),
     "startWork": new FormControl("", [Validators.required]),
     "dateBirth": new FormControl("", [Validators.required]),
     "kind": new FormControl("", [Validators.required ]),
     "status": new FormControl("", [Validators.required]),
 })

}
addRole(){
  this.isRoleExite=!this.isRoleExite;
}

}