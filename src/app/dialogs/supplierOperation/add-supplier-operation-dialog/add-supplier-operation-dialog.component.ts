import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Partner, Product, SupplierOperationDialogData, SupplierOperation} from "../../../model/model";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-add-supplier-operation-dialog',
  templateUrl: './add-supplier-operation-dialog.component.html',
  styleUrls: ['./../../dialogStyle.css']
})
export class AddSupplierOperationDialogComponent implements OnInit {

  supplierOperation: SupplierOperation;
  partners: Partner[];
  products: Product[];

  @ViewChild('partnersSelector') partnerSelect: MatSelect
  @ViewChild('productsSelector') productSelect: MatSelect

  constructor(public dialogRef: MatDialogRef<AddSupplierOperationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SupplierOperationDialogData
              ) {
  }

  ngOnInit(): void {
    this.supplierOperation = {} as SupplierOperation;
    this.partners = this.data.partnersList;
    this.products = this.data.productsList;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  saveSupplierOperation() {
    this.supplierOperation.partner = this.partners.find(s => s.companyName === this.partnerSelect.value['companyName']) as Partner;
    this.supplierOperation.product = this.products.find(s => s.name === this.productSelect.value['name']) as Product;
    this.dialogRef.close({data: this.supplierOperation});
  }

}
