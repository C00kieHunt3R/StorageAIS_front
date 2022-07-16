import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../model/model";
import {DatePipe} from "@angular/common";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./../../dialogStyle.css'],
})
export class AddProductDialogComponent implements OnInit {

  product: Product;


  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.product = {} as Product;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveProduct() {

    this.dialogRef.close({data: this.product});
  }

}
