import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Partner, Product, SupplierOperationDialogData, SupplierOperation} from "../../../model/model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-set-supplier-operation-dialog',
  templateUrl: './set-supplier-operation-dialog.component.html',
  styleUrls: ['./../../dialogStyle.css']
})
export class SetSupplierOperationDialogComponent implements OnInit {

  supplierOperation: SupplierOperation;
  partners: Partner[];
  products: Product[];
  partnerName: string;
  productName: string;

  @ViewChild('matSelect') partnerSelect: MatSelect
  @ViewChild('productsSelector') productSelect: MatSelect

  constructor(public dialogRef: MatDialogRef<SetSupplierOperationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SupplierOperationDialogData
  ) { }

  ngOnInit(): void {
    this.supplierOperation = this.data.supplierOperation;
    this.partners = this.data.partnersList;
    this.products = this.data.productsList;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  setSupplierOperation() {
    this.partners.forEach(partner => {
      if (partner.companyName == this.partnerSelect.value) {
        this.supplierOperation.partner = partner;
      }
    });
    this.products.forEach(product => {
      if (product.name == this.productSelect.value) {
        this.supplierOperation.product = product;
      }
    });
    this.dialogRef.close({data: this.supplierOperation});
  }
}
