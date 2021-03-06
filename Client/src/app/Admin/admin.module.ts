import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashDataComponent } from './dash-data/dash-data.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllProductsComponent } from './all-products/all-products.component';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    DashboardComponent,
    AddProductComponent,
    WelcomeComponent,
    DashDataComponent,
    EditOrderComponent,
    EditProductComponent,
    AllProductsComponent
  ],
  imports: [
    CommonModule,
    AngularLineawesomeModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    [LottieModule.forRoot({ player: playerFactory })],
    RouterModule.forChild([
      {path:'', component: DashboardComponent, children:[
        {path:'', component: WelcomeComponent},
        {path:'home', component: DashDataComponent},
        { path: 'addproduct', component: AddProductComponent },
        { path: 'products', component: AllProductsComponent },
        { path: 'editorder', component: EditOrderComponent },
        { path: 'editproduct/:productid', component: EditProductComponent }
      ]}
    ])
  ]
})
export class AdminModule { }
