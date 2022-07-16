import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthMenuComponent} from './auth-menu/auth-menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./service/login.service";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MainMenuComponent} from './main-menu/main-menu.component';
import {ProductService} from "./service/product.service";
import {
  MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
  MatDialog,
  MatDialogModule
} from "@angular/material/dialog";
import {Dialog, DIALOG_SCROLL_STRATEGY_PROVIDER} from "@angular/cdk/dialog";
import {AddProductDialogComponent} from './dialogs/product/add-product-dialog/add-product-dialog.component';
import {ProductsInfoComponent} from "./pages/products-info/products-info.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SetProductDialogComponent} from './dialogs/product/set-product-dialog/set-product-dialog.component';
import {PartnersInfoComponent} from './pages/partners-info/partners-info.component';
import {AddPartnerDialogComponent} from './dialogs/partner/add-partner-dialog/add-partner-dialog.component';
import {PartnerService} from "./service/partner.service";
import {SetPartnerDialogComponent} from './dialogs/partner/set-partner-dialog/set-partner-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from "@angular/material/expansion";
import {SupplierOperationsInfoComponent} from './pages/supplier-operations-info/supplier-operations-info.component';
import {SupplierOperationsService} from "./service/supplier-operations.service";
import {
  AddSupplierOperationDialogComponent
} from './dialogs/supplierOperation/add-supplier-operation-dialog/add-supplier-operation-dialog.component';
import {
  SetSupplierOperationDialogComponent
} from './dialogs/supplierOperation/set-supplier-operation-dialog/set-supplier-operation-dialog.component';
import {ConsumerOperationsInfoComponent} from './pages/consumer-operations-info/consumer-operations-info.component';
import {
  AddConsumerOperationDialogComponent
} from './dialogs/consumerOperation/add-consumer-operation-dialog/add-consumer-operation-dialog.component';
import {
  SetConsumerOperationDialogComponent
} from './dialogs/consumerOperation/set-consumer-operation-dialog/set-consumer-operation-dialog.component';
import {ConsumerOperationsService} from "./service/consumer-operations.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {MatSortModule} from "@angular/material/sort";
import { EmployeeRegistrationComponent } from './dialogs/registration/employee-registration/employee-registration.component';
import {AuthGuard} from "./auth-model/auth.guard";
//import { EmployeeRegistrationDialogComponent } from './dialogs/registration/employee-registration-dialog/employee-registration-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthMenuComponent,
    MainMenuComponent,
    ProductsInfoComponent,
    AddProductDialogComponent,
    SetProductDialogComponent,
    PartnersInfoComponent,
    AddPartnerDialogComponent,
    SetPartnerDialogComponent,
    SupplierOperationsInfoComponent,
    AddSupplierOperationDialogComponent,
    SetSupplierOperationDialogComponent,
    ConsumerOperationsInfoComponent,
    AddConsumerOperationDialogComponent,
    SetConsumerOperationDialogComponent,
    EmployeeRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatListModule,
    MatMenuModule,
    MatSliderModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
  ],
  providers: [
    LoginService,
    ProductService,
    MatDialog,
    Dialog,
    MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
    DIALOG_SCROLL_STRATEGY_PROVIDER,
    MainMenuComponent,
    PartnerService,
    SupplierOperationsService,
    ConsumerOperationsService,
    DatePipe,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
