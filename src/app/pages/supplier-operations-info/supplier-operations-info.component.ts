import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {SupplierOperationsService} from "../../service/supplier-operations.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  AddSupplierOperationDialogComponent
} from "../../dialogs/supplierOperation/add-supplier-operation-dialog/add-supplier-operation-dialog.component";

import {Partner, Product, SupplierOperation} from "../../model/model";
import {
  SetSupplierOperationDialogComponent
} from "../../dialogs/supplierOperation/set-supplier-operation-dialog/set-supplier-operation-dialog.component";
import {PartnerService} from "../../service/partner.service";
import {ComponentType} from "@angular/cdk/overlay";
import {ProductService} from "../../service/product.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-supplier-operations-info',
  templateUrl: './supplier-operations-info.component.html',
  styleUrls: ['./../pagesStyle.css']
})
export class SupplierOperationsInfoComponent implements OnInit {

  supplierOperations: SupplierOperation[];
  displayedColumns: string[] = ['comment', 'price', 'received', 'created', 'partnerName', 'productName', 'actions'];
  @ViewChild(MatTable) table: MatTable<SupplierOperation>;

  constructor(
    private supplierOperationsService: SupplierOperationsService,
    private partnerService: PartnerService,
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getSupplierOperations();

  }

  getSupplierOperations(): void {
    this.supplierOperationsService.getAllSupplierOperations().subscribe(
      (r: SupplierOperation[]) => {
        this.supplierOperations = r;
      }
    );
  }

  create(): void {
    this.openDialog(AddSupplierOperationDialogComponent, 'Добавление новой операции прошло успешно', null)
  }

  set(element: SupplierOperation) {
    this.openDialog(SetSupplierOperationDialogComponent, 'Изменение данных об операции поставки прошло успешно', element);
  }

  delete(element: SupplierOperation) {
    const index = this.supplierOperations.indexOf(element);
    this.supplierOperationsService.deleteSupplierOperation(element.id).subscribe(r => {
      this.supplierOperations.splice(index, 1);
      this.table.renderRows();
      this.snackBar.open('Удаление данных операции прошло успешно', 'ОК', {
        duration: 5000,
      });
    });
  }

  openDialog<T = any>(dialogComponent: ComponentType<T>, message: string, operation: SupplierOperation | null = null): void {
    forkJoin([this.partnerService.getAllPartners(), this.productService.getAllProducts()]).subscribe(([partners, products]) => {
      this.dialog.open(dialogComponent,
        {
          data: {
            supplierOperation: operation,
            partnersList: partners as Partner[],
            productsList: products as Product[],
          }
        })
        .afterClosed().subscribe(result => {
        if (result != null) {
          if (operation == null) {
            this.supplierOperationsService.createSupplierOperation(result.data).subscribe(r => {
              this.supplierOperations.push(r);
              this.table.renderRows();
              this.snackBar.open(message, 'ОК', {
                duration: 5000,
              });
            })
          } else {
            this.supplierOperationsService.updateSupplierOperation(result.data).subscribe(r => {
              this.table.renderRows();
              this.snackBar.open(message, 'ОК', {
                duration: 5000,
              });
            })
          }
        }
      });
    });
  }
}
