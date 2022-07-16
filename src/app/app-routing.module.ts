import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthMenuComponent} from "./auth-menu/auth-menu.component";
import {ProductsInfoComponent} from "./pages/products-info/products-info.component";
import {PartnersInfoComponent} from "./pages/partners-info/partners-info.component";
import {SupplierOperationsInfoComponent} from "./pages/supplier-operations-info/supplier-operations-info.component";
import {ConsumerOperationsInfoComponent} from "./pages/consumer-operations-info/consumer-operations-info.component";
import {AuthGuard} from "./auth-model/auth.guard";



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: AuthMenuComponent},
  { path: 'products', component: ProductsInfoComponent, canActivate: [AuthGuard]},
  { path: 'partners', component: PartnersInfoComponent, canActivate: [AuthGuard]},
  { path: 'supplier-operations', component: SupplierOperationsInfoComponent, canActivate: [AuthGuard]},
  { path: 'consumer-operations', component: ConsumerOperationsInfoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
