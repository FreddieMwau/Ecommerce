import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeadphonesComponent } from './headphones/headphones.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { EarbudsComponent } from './earbuds/earbuds.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    CartComponent,
    NavbarComponent,
    CheckoutComponent,
    HeadphonesComponent,
    SpeakersComponent,
    EarbudsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'', children:[
        {path:'', component:ProductsComponent},
        { path: 'headphones', component: HeadphonesComponent },
        { path: 'earbuds', component: EarbudsComponent },
        { path: 'speakers', component: SpeakersComponent },
        { path: 'cart', component: CartComponent },
        { path: 'checkout', component: CheckoutComponent },
      ]},
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class ShopModule { }
