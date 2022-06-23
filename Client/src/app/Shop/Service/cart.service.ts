import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList:any =[]
  productList = new BehaviorSubject<any>([])

  constructor() { }

  getProducts(){
    return this.productList.asObservable()
  }

  setProducts(product: any){
    this.cartItemList.push(...product)
    this.productList.next(product)
  }

  addToCart(product:any){
    this.cartItemList.push(product)
    this.productList.next(this.cartItemList)
    this.getTotalPrice()
    
  }

  getSubTotal():number{
    let subTotal = 1
    this.cartItemList.map((y:ProductModel) => {
      subTotal = y.product_price * subTotal
    })
    return subTotal 
  }

  getTotalPrice() :number{
    let grandTotal = 0
    this.cartItemList.map((x: ProductModel)=>{
      grandTotal += x.product_price;
    })
    return grandTotal
  }

  removeCartItem(product: ProductModel){
    this.cartItemList.map((x:any, index:any)=>{
      if(product.product_id === x.product_id){
        this.cartItemList.splice(index, 1)
      }
    })
    this.productList.next(this.cartItemList)
  }

  removeAllCartItems(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList)
  }
}
