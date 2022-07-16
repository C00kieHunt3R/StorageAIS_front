import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {
  ConsumerOperation,
  Partner,
  Product,
  ConsumerOperationDialogData,
} from "../../../model/model";
import {MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddProductDialogComponent} from "../../product/add-product-dialog/add-product-dialog.component";
import {ProductService} from "../../../service/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-consumer-operation-dialog',
  templateUrl: './add-consumer-operation-dialog.component.html',
  styleUrls: ['./../../dialogStyle.css']
})
export class AddConsumerOperationDialogComponent implements OnInit {

  consumerOperation: ConsumerOperation;
  partners: Partner[];
  products: Product[];

  @ViewChild('partnersSelector') partnerSelect: MatSelect
  @ViewChild('productsSelector') productSelect: MatSelect
  private productService: ProductService;

  constructor(public dialogRef: MatDialogRef<AddConsumerOperationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConsumerOperationDialogData,
              public addProductDialog: MatDialog,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.consumerOperation = {} as ConsumerOperation;
    this.partners = this.data.partnersList;
    this.products = this.data.productsList;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  saveConsumerOperation() {
    this.consumerOperation.partner = this.partners.find(s => s.companyName === this.partnerSelect.value['companyName']) as Partner;
    this.consumerOperation.product = this.products.find(s => s.name === this.productSelect.value['name']) as Product;
    this.dialogRef.close({data: this.consumerOperation});
  }
}
