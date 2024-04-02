
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-role',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,MatCardModule,
     MatButtonModule,MatFormFieldModule,MatSelectModule,MatInputModule,AddRoleComponent,CommonModule,
      MatCheckboxModule, MatRadioModule,  MatDatepickerModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  listRole:String[]=["techer","manecher"];
  ngOnInit(): void {
   
  }
  Add(){

  }
  Cencel(){
    
  }
}
