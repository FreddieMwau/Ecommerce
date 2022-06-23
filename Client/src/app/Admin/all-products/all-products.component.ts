import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/Shop/model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private productService:ProductService, private router:Router) { }
  products : ProductModel[]=[]
  p=1;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data
    })
  }

}
