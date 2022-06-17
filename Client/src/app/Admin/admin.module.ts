import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { AddProductComponent } from './add-product/add-product.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashDataComponent } from './dash-data/dash-data.component';
import { EditOrderComponent } from './edit-order/edit-order.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AddProductComponent,
    WelcomeComponent,
    DashDataComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    AngularLineawesomeModule,
    RouterModule.forChild([
      {path:'', component: DashboardComponent, children:[
        {path:'', component: WelcomeComponent},
        {path:'home', component: DashDataComponent},
        { path: 'addproduct', component: AddProductComponent },
        { path: 'editorder', component: EditOrderComponent }
      ]}
    ])
  ]
})
export class AdminModule { }
