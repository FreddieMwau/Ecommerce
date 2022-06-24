import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Cart } from 'src/app/Admin/model/cart';
import { Orders } from 'src/app/Admin/model/order';
import { OrdersService } from 'src/app/Admin/service/orders.service';
import { Users } from 'src/app/Auth/model/user';
import { AuthService } from 'src/app/Auth/Service/auth.service';
import { ProductModel } from '../model/product';
import { CartService } from '../Service/cart.service';

type ProductModelX = ProductModel & { subtotal: number, ordered_quantity:number}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: ProductModelX[] = []
  order: Cart ={
    quantity_ordered: 0,
    total_price: 0,
    product_image_url: '',
    full_name: ''
  }

  user:Users={
    customer_id:'',
    full_name:'',
    email: '',
    customer_password: ''
  }

  customer_id?:string
  product_id?:string
  msg=''
  quantity_ordered?:number
  total_price?:number

  grandTotalPrice = 0
  subTotal!: number
  constructor(private router: Router, private cartService: CartService, private orderService:OrdersService, private authService:AuthService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res
      this.grandTotalPrice = this.cartService.getTotalPrice()
    })
    this.products.forEach(prod => {
      prod.subtotal = prod.product_price
      prod.ordered_quantity = 1
    })
    let email=localStorage.getItem('email')
    console.log(email);
    if(email){
      this.authService.getUser(email).subscribe(data => {
        this.user = data[0]
        this.customer_id = this.user.customer_id
        // this.orders.customer_id = this.customer_id
        console.log(this.customer_id);
        
      })
    }    
  }

  options: AnimationOptions = {
    path: '/assets/orders.json'
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  checkOut() {
    this.products.forEach((prod)=>{
      this.product_id = prod.product_id
      this.quantity_ordered = prod.ordered_quantity
      this.total_price = prod.subtotal
      const orders:Orders={
        customer_id:this.customer_id,
        product_id: this.product_id,
        quantity_ordered:this.quantity_ordered,
        total_price:this.total_price
      }
      this.orderService.addOrder(orders).subscribe((res)=>{
        this.msg = res.message
        if (res.message == "Order added successfully"){
          setTimeout(() => {
            this.msg=''
            this.cartService.removeAllCartItems()
            this.router.navigate(['/shop'])
          }, 3000);
        } else{
          this.msg = res.message
          setTimeout(() => {
            this.msg=''
          }, 3000);
        }
      }, (error) => {
        console.log("Error definitely");
        this.msg = error.message
      })
      
              
    })
  }

  removeItem(product: ProductModel) {
    this.cartService.removeCartItem(product)
  }

  getSubTotal(id: string, value: string) {
    const product = this.products.find(product => product.product_id === id)
    if (product)
      product.subtotal = product!.product_price * +value
  }

  getGrandTotal() {
    this.grandTotalPrice = this.products.map(prod => prod.subtotal).reduce((x, y) => x + y, 0)
  }

}
