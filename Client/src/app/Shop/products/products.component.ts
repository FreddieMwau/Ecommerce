import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product';
import { ShopService } from '../Service/shop.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:ProductModel[] = []
  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.shopService.getAllProducts().subscribe(data => {
      this.products = data
      console.log(data);
      
    })
  }

}
