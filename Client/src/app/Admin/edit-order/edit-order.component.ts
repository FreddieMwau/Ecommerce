import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  orderDetails!: FormGroup
  constructor() { }

  ngOnInit(): void {
    this.orderDetails = new FormGroup({
      'productName': new FormControl('', Validators.required),
      'productImageURL': new FormControl('', Validators.required),
      'productDescription': new FormControl('', Validators.required),
      'productPrice': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(3)]),
      'quantityInStock': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(1)]),
      'productCategory': new FormControl('', Validators.required)
    })
  }

}
