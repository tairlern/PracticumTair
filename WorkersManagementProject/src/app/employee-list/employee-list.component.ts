import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../service/employee.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../models/Employee.model';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, CommonModule, MatButtonModule, MatIconModule, AddEmployeeComponent, RouterOutlet], // Include AddEmployeeComponent in the imports array
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  constructor(private _employeeService: EmployeeService, private router: Router) { }
  displayedColumns: string[] = ['lastName', 'firstName', 'id', 'startWork'];
  ELEMENT_DATA: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this._employeeService.getEmployTableServer().subscribe({
      next: (res) => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addData() {
    this.router.navigate(['add-employee']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(emp: Employee) {}

  deleteRow(emp: Employee) {
  
  }

  saveinExel() {}
}