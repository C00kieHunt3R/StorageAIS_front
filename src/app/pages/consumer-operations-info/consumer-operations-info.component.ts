import {Component, OnInit, ViewChild} from '@angular/core';
import {ConsumerOperation, Partner, Product, SupplierOperation} from "../../model/model";
import {MatTable} from "@angular/material/table";
import {SupplierOperationsService} from "../../service/supplier-operations.service";
import {PartnerService} from "../../service/partner.service";
import {ProductService} from "../../service/product.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  AddSupplierOperationDialogComponent
} from "../../dialogs/supplierOperation/add-supplier-operation-dialog/add-supplier-operation-dialog.component";
import {
  SetSupplierOperationDialogComponent
} from "../../dialogs/supplierOperation/set-supplier-operation-dialog/set-supplier-operation-dialog.component";
import {ComponentType} from "@angular/cdk/overlay";
import {forkJoin} from "rxjs";
import {ConsumerOperationsService} from "../../service/consumer-operations.service";
import {
  AddConsumerOperationDialogComponent
} from "../../dialogs/consumerOperation/add-consumer-operation-dialog/add-consumer-operation-dialog.component";
import {
  SetConsumerOperationDialogComponent
} from "../../dialogs/consumerOperation/set-consumer-operation-dialog/set-consumer-operation-dialog.component";


@Component({
  selector: 'app-consumer-operations-info',
  templateUrl: './consumer-operations-info.component.html',
  styleUrls: ['./../pagesStyle.css']
})
export class ConsumerOperationsInfoComponent implements OnInit {

  consumerOperations: ConsumerOperation[];
  displayedColumns: string[] = ['comment', 'price', 'received', 'created', 'partnerName', 'productName', 'actions'];
  @ViewChild(MatTable) table: MatTable<SupplierOperation>;


  constructor(
    private consumerOperationsService: ConsumerOperationsService,
    private partnerService: PartnerService,
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getConsumerOperations();
  }

  getConsumerOperations(): void {
    this.consumerOperationsService.getAllConsumerOperations().subscribe(
      (r: ConsumerOperation[]) => {
        this.consumerOperations = r;
      }
    );
  }

  create(): void {
    this.openDialog(AddConsumerOperationDialogComponent, 'Добавление новой операции прошло успешно', null)
  }

  set(element: ConsumerOperation) {
    this.openDialog(SetConsumerOperationDialogComponent, 'Изменение данных операции прошло успешно', element);
  }

  delete(element: ConsumerOperation) {
    const index = this.consumerOperations.indexOf(element);
    this.consumerOperationsService.deleteConsumerOperation(element.id).subscribe(r => {
      this.consumerOperations.splice(index, 1);
      this.table.renderRows();
      this.snackBar.open('Удаление данных операции прошло успешно', 'ОК', {
        duration: 5000,
      });
    });
  }

  openDialog<T = any>(dialogComponent: ComponentType<T>, message: string, operation: ConsumerOperation | null = null): void {
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
            this.consumerOperationsService.createConsumerOperation(result.data).subscribe(r => {
              this.consumerOperations.push(r);
              this.table.renderRows();
              this.snackBar.open(message, 'ОК', {
                duration: 5000,
              });
            })
          } else {
            this.consumerOperationsService.updateConsumerOperation(result.data).subscribe(r => {
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
