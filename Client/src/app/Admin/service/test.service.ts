import { Injectable } from "@angular/core";
import { combineLatest, map, merge, scan, tap } from "rxjs";
import { AuthService } from "src/app/Auth/Service/auth.service";
import { Cart } from "../model/cart";
import { OrdersService } from "./orders.service";
import { ProductService } from "./product.service";

@Injectable ({
    providedIn: 'root'
})
export class TestService {

constructor(private orderService: OrdersService, private userService:AuthService, private productService:ProductService){}

// orderDetails$=combineLatest(
// [    this.orderService.orders$,
//     this.productService.product$,
// ]
// ).pipe(
   
//     map(([order, product])=>
//     order.map(ord=>({
//         ...ord,
//         product_name:product.find(c=> c.product_id===ord.product_id)?.product_name,
//         product_price:product.find(p=>p.product_id===ord.product_id)?.product_price
//     } as Order)
//         )
// )
// )

}


// orderDetails$= merge([
//     this.orderService.orders$,
//     this.productService.product$,
//     this.userService.users$
// ]).pipe(
//    scan((order,product,user))
//     )
// ).subscribe(
//     ord=>{
//         console.log(`ord`+ord);
        
//     }
// )

