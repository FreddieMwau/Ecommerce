import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ProductModel } from 'src/app/Shop/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private Http:HttpClient) { }

  getAllProducts(){
    return this.Http.get<ProductModel[]>('http://localhost:7000/products/')
  }

  addProduct(product:ProductModel){
    return this.Http.post<any>("http://localhost:7000/products/newproduct", product)
  }

  editProduct(product_id:string, product: ProductModel){
    console.log({product});
    
    const { product_id: _, isDeleted,  ...data} = product
    return this.Http.patch<any>(`http://localhost:7000/products/product/${product_id}`, data)
  }


  product$ =  this.Http.get<ProductModel[]>('http://localhost:7000/products/').pipe(
    tap(product=> console.log(product))
  )


  getProduct(product_id:string){
    return this.Http.get<ProductModel[]>(`http://localhost:7000/products/${product_id}`)
  }

  deleteProduct(product_id: string, product?: ProductModel) {
    return this.Http.patch<any>(`http://localhost:7000/products/${product_id}`, product)
  }
}
