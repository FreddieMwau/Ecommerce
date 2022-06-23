import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductModel } from 'src/app/Shop/model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private productService:ProductService, private router:Router, private route:ActivatedRoute) { }
  msg = ''
  product:ProductModel={
    product_name: '',
    product_image_url: '',
    product_description: '',
    product_price: 0,
    product_in_stock:0,
    product_category: ''
  }
  product_id!:string
  productDetails!: FormGroup
  ngOnInit(): void {
    this.productDetails = new FormGroup({
      'productName': new FormControl('', Validators.required),
      'productImageURL': new FormControl('', Validators.required),
      'productDescription': new FormControl('', Validators.required),
      'productPrice': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(3)]),
      'quantityInStock': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(1)]),
      'productCategory': new FormControl('', Validators.required)
    })

    this.route.params.subscribe((params:Params)=>{
       this.product_id = params['productid']      
      this.productService.getProduct(this.product_id).subscribe((data) => {
        this.product = data[0]
      })
    })
  }


  saveChanges(){ 
    if(this.product_id){
      this.productService.editProduct(this.product_id, this.product).subscribe(res => {
        console.log(this.product);  
        this.msg = res.message
        console.log(res);
        if (res.message == "Product added successfully"){
          setTimeout(()=>{
            this.msg=''
            this.router.navigate(['/admin/products'])
          }, 3500)
        } else{
          this.msg = res.message
          setTimeout(() => {
            this.msg = ''
          }, 3500)
        }
      }, (error) => {
        this.msg = error.message
        setTimeout(()=>{
          this.msg = ''
        }, 3500)
      })
    }
  }

}