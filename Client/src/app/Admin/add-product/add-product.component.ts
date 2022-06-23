import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productDetails!:FormGroup
  constructor(private productService:ProductService, private router:Router) { }
  msg=''
  productsDet = {
    product_name:'',
    product_image_url:'',
    product_description:'',
    product_price:0,
    product_in_stock:0,
    product_category:'',
  }

  ngOnInit(): void {
    this.productDetails = new FormGroup({
      'productName': new FormControl('', Validators.required),
      'productImageURL': new FormControl('', Validators.required),
      'productDescription': new FormControl('', Validators.required),
      'productPrice': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(3)]),
      'quantityInStock': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(1)]),
      'productCategory': new FormControl('', Validators.required)
    })
  }

  addProduct(){
    this.productService.addProduct(this.productsDet).subscribe((res) =>{
      this.msg= res.message  
      if (res.message == "Product added successfully") {
        setTimeout(() => {
          this.router.navigate(['/admin/home'])
          this.msg=''
        }, 4000)
      } else {
        this.msg = res.message
        setTimeout(()=>{
          this.msg=''
        },3000)
      }
    }, (error) => {
      this.msg = error.message
    })
  }

}
