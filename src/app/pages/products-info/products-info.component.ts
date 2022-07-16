import {AfterViewInit, Component, ElementRef, Inject, NgModule, OnInit, ViewChild} from '@angular/core';

import {ProductService} from "../../service/product.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddProductDialogComponent} from "../../dialogs/product/add-product-dialog/add-product-dialog.component";
import {SetProductDialogComponent} from "../../dialogs/product/set-product-dialog/set-product-dialog.component";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../model/model";
import {MatPaginator} from "@angular/material/paginator";



@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./../pagesStyle.css'],
})
export class ProductsInfoComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'cropDate', 'currentOutPrice', 'totalValue', 'created', 'updated', 'actions'];
  public products: Product[];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatTable) table: MatTable<Product>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.products = [];
  }

  ngOnInit(): void {
    this.getProducts();
    this.paginator._intl.itemsPerPageLabel='Количество продуктов на странице:'
  }

  public getProducts(): void {
    this.productService.getAllProducts().subscribe(
      (r: Product[]) => {
        this.dataSource = new MatTableDataSource<Product>(r);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  create(): void {
    this.dialog.open(AddProductDialogComponent)
      .afterClosed().subscribe(result => {
        if (result != null) {
          this.productService.createProduct(result.data).subscribe(r => {
            this.dataSource.data.push(r);
            this.dataSource._updateChangeSubscription();
            this.table.renderRows();
            this.snackBar.open('Добавление нового продукта прошло успешно', 'ОК', {
              duration: 5000,
            });
          })
        }
      })
  }

  set(element: Product) {
    const index = this.dataSource.data.indexOf(element);
    this.dialog.open(SetProductDialogComponent,
      {
        data: element
      })
      .afterClosed().subscribe(result => {
        if (result != null) {
          this.productService.updateProduct(result.data).subscribe(r => {
            this.dataSource.data[index] = r;
            this.table.renderRows();
            this.snackBar.open('Изменение данных продукта прошло успешно', 'ОК', {
              duration: 5000,
            });
          });
        }
      })
  }

  delete(element: Product) {
    const index = this.dataSource.data.indexOf(element);
    this.productService.deleteProduct(element.id).subscribe(r => {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
      this.table.renderRows();
      this.snackBar.open('Удаление данных продукта прошло успешно', 'ОК', {
        duration: 5000,
      });
    });
  }

}






