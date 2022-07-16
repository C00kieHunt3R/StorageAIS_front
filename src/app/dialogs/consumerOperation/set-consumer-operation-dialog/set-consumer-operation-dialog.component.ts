import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {
  ConsumerOperation, ConsumerOperationDialogData,
  Partner,
  Product,
} from "../../../model/model";
import {MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-set-consumer-operation-dialog',
  templateUrl: './set-consumer-operation-dialog.component.html',
  styleUrls: ['./../../dialogStyle.css']
})
export class SetConsumerOperationDialogComponent implements OnInit {

  consumerOperation: ConsumerOperation;
  partners: Partner[];
  products: Product[];
  partnerName: string;
  productName: string;

  @ViewChild('matSelect') partnerSelect: MatSelect
  @ViewChild('productsSelector') productSelect: MatSelect

  constructor(public dialogRef: MatDialogRef<SetConsumerOperationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConsumerOperationDialogData
  ) { }

  ngOnInit(): void {
    this.consumerOperation = this.data.consumerOperation;
    this.partners = this.data.partnersList;
    this.products = this.data.productsList;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  setConsumerOperation() {
    this.partners.forEach(partner => {
      if (partner.companyName == this.partnerSelect.value) {
        this.consumerOperation.partner = partner;
      }
    });
    this.products.forEach(product => {
      if (product.name == this.productSelect.value) {
        this.consumerOperation.product = product;
      }
    });
    this.dialogRef.close({data: this.consumerOperation});
  }

}
