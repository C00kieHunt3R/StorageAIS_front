import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeInformation} from "../../../model/model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./../../dialogStyle.css']
})
export class EmployeeRegistrationComponent implements OnInit {

  employeeInfo: EmployeeInformation;

  constructor(public dialogRef: MatDialogRef<EmployeeInformation>,
              @Inject(MAT_DIALOG_DATA) public data: EmployeeInformation) { }

  ngOnInit(): void {
    this.employeeInfo = {} as EmployeeInformation;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  register() {
    this.dialogRef.close({data: this.employeeInfo});
  }
}
