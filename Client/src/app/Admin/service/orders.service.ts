import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Users } from 'src/app/Auth/model/user';
import { Cart } from '../model/cart';
import { Orders } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private Http:HttpClient) { }

  getAllOrders(){
    return this.Http.get<Cart[]>("http://localhost:7000/orders/")
  }
  orders$ = this.Http.get<Cart[]>("http://localhost:7000/orders/").pipe(
    tap(orders=>console.log(orders)
    )
  )

  getCustomerDetails(customer_id:string){
    return this.Http.get<Users>(`http://localhost:7000/user/${customer_id}`)
  }

  getOrder(order_id:string){
    return this.Http.get<Cart>(`http://localhost:7000/orders/${order_id}`)
  }

  getOrdersCount(){
    return this.Http.get<any>("http://localhost:7000/orders/orders")
  }

  addOrder(order: Orders){
    return this.Http.post<any>("http://localhost:7000/orders/neworder", order)
  }

  updateOrder(order_id: string, order: Cart){
    return this.Http.patch<any>(`http://localhost:7000/orders/${order_id}`,order)
  }

  deleteOrder(order_id:string){
    return this.Http.delete<any>(`http://localhost:7000/orders/order/${order_id}`)
  }
}