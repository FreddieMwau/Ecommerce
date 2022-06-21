import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product';
import { ShopService } from '../Service/shop.service';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent implements OnInit {

  constructor(private shopService:ShopService) { }
  products:ProductModel[]=[]
  p: number = 1

  ngOnInit(): void {
    this.shopService.getAllSpeakers().subscribe(data => {
      this.products = data
    })
  }

}
