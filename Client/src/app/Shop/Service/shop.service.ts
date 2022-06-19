import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ProductModel } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private Http:HttpClient) { }

  getAllProducts(){
    return this.Http.get<ProductModel[]>("http://localhost:7000/products/")
  }
}
