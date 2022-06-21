import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductModel } from '../model/product';
import { ShopService } from '../Service/shop.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: ProductModel = {
    product_name: '',
    product_image_url: '',
    product_description: '',
    product_price: 0,
    product_category: ''
  }
  constructor(private shopService:ShopService, private route:ActivatedRoute) { }  

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      const product_id = params['product_id']
      this.shopService.getProduct(product_id).subscribe((data) => {
        console.log(data[0]);
        this.product = data[0]
      })
    })
  }

}
