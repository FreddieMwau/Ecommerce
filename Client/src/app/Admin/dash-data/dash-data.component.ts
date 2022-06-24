import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/Auth/Service/auth.service';
import { ShopService } from 'src/app/Shop/Service/shop.service';
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
  userCount:any
  orderCount: any
  productCount: any
  constructor(private orderService:OrdersService, private authService:AuthService, private shopService:ShopService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data 
    })

    this.orderService.getOrdersCount().subscribe(data =>{
      this.orderCount = data
    })

    this.shopService.getProductCount().subscribe(data => {
      this.productCount = data
    })

    this.authService.getUserCount().subscribe(data => {
      this.userCount = data 
    })
  }

  options: AnimationOptions = {
    path: '/assets/orders.json'
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  deleteOrder(order_id?:string){
    if(order_id){
      this.orderService.deleteOrder(order_id).subscribe(data =>{
        console.log(data.message);
      })
    }
  }

}

