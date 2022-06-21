import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product';
import { ShopService } from '../Service/shop.service';

@Component({
  selector: 'app-headphones',
  templateUrl: './headphones.component.html',
  styleUrls: ['./headphones.component.css']
})
export class HeadphonesComponent implements OnInit {

  constructor(private shopService:ShopService) { }
  products:ProductModel[]=[]
  p:number =1

  ngOnInit(): void {
    this.shopService.getAllHeadphones().subscribe(data => {
      this.products = data
    })
  }

}
