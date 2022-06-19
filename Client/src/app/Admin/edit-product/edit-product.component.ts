import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor() { }

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
  }

}
