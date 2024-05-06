import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../models/Employee.model';
import { EmployeeService } from '../service/employee.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { RoleEmployeeService } from '../service/role-employee.service';
import { RoleService } from '../service/role.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RoleEmployee } from '../models/RoleEmployee.model';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AddRoleComponent,
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSortModule, 
    MatPaginatorModule, 
    MatTableModule, 
    AddEmployeeComponent, 
    RouterOutlet, 
    MatToolbarModule
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})

export class EditEmployeeComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['RoleName', 'isManagement', 'DateOfStartingWork', ' '];
  ELEMENT_DATA: RoleEmployee[] = [];
  dataSource = new MatTableDataSource<RoleEmployee>(this.ELEMENT_DATA);
  public DicNameRole: { id: number, name: string }[] = [];//מילון לפי שם תפקיד וקוד
  public listEmployeeRole: FormGroup[] = [];
  public saveEmployeeRole: FormGroup[] = [];
  public employeeRole!: FormGroup;
  public formEmployee!: FormGroup;
  public employee!: Employee;
  public employeeId!: number;
  constructor(private _employeeService: EmployeeService,
    private _roleEmployeeService: RoleEmployeeService,
    private _roleService: RoleService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute) {
      this.dataSource = new MatTableDataSource<RoleEmployee>(this.ELEMENT_DATA);
    this.employeeRole = new FormGroup({
      "employeeId": new FormControl(this.employeeId),
      "roleId": new FormControl('', [Validators.required]),
      "isManagement": new FormControl(false, [Validators.required]),
      "startDate": new FormControl("", [Validators.required, this.goodDate.bind(this)]),
    });
  }
  
  ngOnInit(): void {
    //איתחול המילון
    this._roleService.getListRoleName().subscribe({
      next: (res) => {
        this.DicNameRole = Object.keys(res).map(key => ({ id: parseInt(key), name: res[parseInt(key)] }));
        console.log(this.DicNameRole, " this.DicNameRole")
      }
    })
    
    //עידכון הנתונים לפי הפרמטר הנישלח
    let id = this.route.snapshot.queryParamMap.get('numEmp');
    console.log("id", id)
    if (id) {
      this.employeeId = parseInt(id, 10);
      this._employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (res) => {
          console.log("res", res)
          this.employee = res;
          this.formEmployee = new FormGroup({
            "firstName": new FormControl(this.employee.firstName, [Validators.required]),
            "lastName": new FormControl(this.employee.lastName, [Validators.required]),
            "tz": new FormControl(this.employee.tz, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
            "startWork": new FormControl(this.employee.startWork, [Validators.required]),
            "dateBirth": new FormControl(this.employee.dateBirth, [Validators.required]),
            "kind": new FormControl(this.employee.kind, [Validators.required]),
          })
          
        },
        error: (res) => {
          console.log("error", res)
        }
      });
      this._roleEmployeeService.getRolesById(this.employeeId).subscribe({
        next: (resf) => { this.ELEMENT_DATA = resf;
          for (let i = 0; i < resf.length; i++) {
            const formGroup = new FormGroup({
              "employeeId": new FormControl(this.employeeId),
              "roleId": new FormControl(resf[i].roleId, [Validators.required]),
              "isManagement": new FormControl(resf[i].isManagement, [Validators.required]),
              "startDate": new FormControl(resf[i].startDate, [Validators.required, this.goodDate.bind(this)]),
            });
            const formGroupsave = new FormGroup({
              "employeeId": new FormControl(this.employeeId),
              "roleId": new FormControl(resf[i].roleId, [Validators.required]),
              "isManagement": new FormControl(resf[i].isManagement, [Validators.required]),
              "startDate": new FormControl(resf[i].startDate, [Validators.required, this.goodDate.bind(this)]),
            });
            this.listEmployeeRole.push(formGroup);
            this.saveEmployeeRole.push(formGroupsave);
            console.log("saveevvevv", this.saveEmployeeRole)
            console.log("list employee role", formGroup.value)
          }
         
          this.dataSource = new MatTableDataSource<RoleEmployee>(this.ELEMENT_DATA);
  
          // Set the paginator after assigning the data to the dataSource
          this.dataSource.paginator = this.paginator;
        }
      })
    }
    this.formEmployee = new FormGroup({
      "firstName": new FormControl("", [Validators.required]),
      "lastName": new FormControl("", [Validators.required]),
      "tz": new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      "startWork": new FormControl("", [Validators.required]),
      "dateBirth": new FormControl("", [Validators.required]),
      "kind": new FormControl("", [Validators.required]),
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  goodDate() {
    const startDateControl = this.employeeRole?.get('startDate');
    
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
      const selectedDate = new Date(event.value);
      const formattedDateForServer = selectedDate.toISOString().substring(0, 10);
      this.formEmployee.controls['startWork'].setValue(formattedDateForServer);
    }
  }
  updateDateBirth(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      const formattedDate = selectedDate.toISOString();
      // Adjust the formatted date to match the expected server format
      const formattedDateForServer = formattedDate.slice(0, 10); // Extract YYYY-MM-DD
      this.formEmployee.controls['dateBirth'].setValue(formattedDateForServer);
    }
  }

  addRole() {
    this._employeeService.putEmployee(this.employeeId, this.formEmployee.value).subscribe({
      next: () => {
        this._employeeService.getEmployTableServer().subscribe({
          next: (resful) => {
            this.employeeId = Number(resful.find(emp => emp.tz === this.formEmployee.value.tz)?.id) ?? null;
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
  edit() {
    console.log("listttttt", this.listEmployeeRole);
    console.log("saveeeeeeeeee", this.saveEmployeeRole);
    console.log(this.formEmployee.value);

    this._employeeService.putEmployee(this.employeeId, this.formEmployee.value).subscribe({
      next: () => {
        for (let i = 0; i < this.listEmployeeRole.length; i++) {
          console.log(this.employeeId, this.saveEmployeeRole[i].value.roleId, this.listEmployeeRole[i].value)
          this._roleEmployeeService.putEmmployeeRole(this.employeeId, this.saveEmployeeRole[i].value.roleId, this.listEmployeeRole[i].value).subscribe({
            error: (err) => {
              console.error("Error saving data for role:");
            }
          });
          break; // exit the loop after updating the existing role
        }
        this.router.navigate(['../']);
        console.log(this.formEmployee.value, "השמירה");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  chooseRole(selectedRole: number, i: number) {
    if (this.DicNameRole.hasOwnProperty(selectedRole)) {
      const selectedRoleName = this.DicNameRole[selectedRole].name;
      this._roleService.getRoleByNameServer(selectedRoleName).subscribe({
        next: (res) => {
          if (res && res.id) {
            this.listEmployeeRole[i].get('roleId')?.setValue(res.id);
          } else {
            console.log("Role or Role id is undefined");
          }
        },
        error: (err) => {
          console.log("error", err);
        }
      });
    } else {
      console.log("Selected role does not exist in DicNameRole");
    }
  }
   editRole(role: RoleEmployee) {
    this.dialog.open(EditRoleComponent, { data: { employeeId: this.employeeId ,roleId:role.roleId} });
  }

  deleteRole(role: RoleEmployee) {
    this._roleEmployeeService.deleteRoleById(role.employeeId,role.roleId).subscribe(() => {
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(item => item.roleId !== role.roleId);
      this.dataSource.data = this.ELEMENT_DATA;
    });

  }
}
