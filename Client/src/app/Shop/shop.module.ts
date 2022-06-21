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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../Shared/footer/footer.component';
import { NavbarComponent } from '../Shared/navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    CartComponent,
    NavbarComponent,
    CheckoutComponent,
    HeadphonesComponent,
    FooterComponent,
    SpeakersComponent,
    EarbudsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'', children:[
        {path:'', component:ProductsComponent},
        { path: 'headphones', component: HeadphonesComponent },
        { path: 'earbuds', component: EarbudsComponent },
        { path: 'product/:product_id', component: ProductComponent },
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
