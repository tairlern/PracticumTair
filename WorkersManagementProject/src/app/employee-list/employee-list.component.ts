import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';

import { Employee } from '../models/Employee.model';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule, MatTableModule, CommonModule, MatButtonModule, MatIconModule, AddEmployeeComponent, RouterOutlet,MatToolbarModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export class EmployeeListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['lastName', 'firstName', 'id', 'startWork', ' '];
  ELEMENT_DATA: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);

  constructor(private _employeeService: EmployeeService, private router: Router) {
    this.dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    this._employeeService.getEmployTableServer().subscribe({
      next: (res) => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addData() {
    this.router.navigate(['add-employee']);
  }

  editRow(emp: Employee) {
    this.router.navigate(['edit-employee'], { queryParams: { numEmp: emp.id } })
  }

  deleteRow(emp: Employee) {
    this._employeeService.deleteById(emp.id).subscribe(() => {
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(item => item.id !== emp.id);
      this.dataSource.data = this.ELEMENT_DATA;
    });

  }
  
  saveinExel() {
    import('xlsx').then((xlsx) => {
      const fileName = 'employees.xlsx';
      const worksheet = xlsx.utils.json_to_sheet(this.ELEMENT_DATA.map(data => ({
        lastName: data.lastName,
        firstName: data.firstName,
        id: data.tz,
        startWork: data.startWork
      })));
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Employees');
      xlsx.writeFile(workbook, fileName);
    });
  }
}
