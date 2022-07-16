import {Component, Inject, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../model/model";

@Component({
  selector: 'app-set-product-dialog',
  templateUrl: './set-product-dialog.component.html',
  styleUrls: ['./../../dialogStyle.css'],
})
export class SetProductDialogComponent implements OnInit {

  product: Product;
  constructor(
    public dialogRef: MatDialogRef<SetProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  )
  { }

  ngOnInit(): void {
    this.product = this.data;
  }

  setProduct() {
    this.dialogRef.close({data: this.product});
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}

