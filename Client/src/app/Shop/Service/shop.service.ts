import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ProductModel } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private Http:HttpClient) { }
  speaker: string = 'Speakers'
  earbuds:string='Earbuds'
  headphones: string ='Headphones'

  getAllProducts(){
    return this.Http.get<ProductModel[]>("http://localhost:7000/products/")
  }

  getProduct(product_id:string){
    return this.Http.get<ProductModel[]>(`http://localhost:7000/products/${product_id}`)
  }

  getAllEarbuds(){
    return this.Http.get<ProductModel[]>(`http://localhost:7000/products/category/${this.earbuds}`)
  }

  getAllSpeakers() {
    return this.Http.get<ProductModel[]>(`http://localhost:7000/products/category/${this.speaker}`)
  }

  getAllHeadphones() {
    return this.Http.get<ProductModel[]>(`http://localhost:7000/products/category/${this.headphones}`)
  }

  getProductCount(){
    return this.Http.get<any>("http://localhost:7000/products/products")
  }
}
