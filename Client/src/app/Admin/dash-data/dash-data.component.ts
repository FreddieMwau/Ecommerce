import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Cart } from '../model/cart';
import { OrdersService } from '../service/orders.service';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-dash-data',
  templateUrl: './dash-data.component.html',
  styleUrls: ['./dash-data.component.css']
})
export class DashDataComponent implements OnInit {

  orders: Cart[]=[]
  customer_id:string=''
  p: number = 1
  constructor(private orderService:OrdersService, private testService:TestService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data 
      // this.orderService.getCustomerDetails().subscribe()     
    })
  }

  options: AnimationOptions = {
    path: '/assets/orders.json'
  }

  animationCreated(animationItem: AnimationItem): void {
  }

}
