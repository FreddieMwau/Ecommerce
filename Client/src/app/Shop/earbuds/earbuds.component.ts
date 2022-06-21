import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product';
import { ShopService } from '../Service/shop.service';

@Component({
  selector: 'app-earbuds',
  templateUrl: './earbuds.component.html',
  styleUrls: ['./earbuds.component.css']
})
export class EarbudsComponent implements OnInit {

  constructor(private shopService:ShopService) { }
  products:ProductModel[] = []
  p: number = 1

  ngOnInit(): void {
    this.shopService.getAllEarbuds().subscribe(data => {
      this.products = data
    })
  }

}
