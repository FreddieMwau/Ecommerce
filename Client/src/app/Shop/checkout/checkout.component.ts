import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  paymentDeliveryDetails!: FormGroup
  constructor() { }

  ngOnInit(): void {
    this.paymentDeliveryDetails = new FormGroup({
      'customerAddress': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'customerCity': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'customerCounty': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'customerCountyCode': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(3), Validators.maxLength(3)]),
      'customerCardName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'customerCardNo': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(14)]),
      'customerCardExpMonth': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(9)]),
      'customerCardExpYear': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(4), Validators.maxLength(4)]),
      'customerCardCvv': new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(/^[0-9]\d*$/), Validators.maxLength(4)]),
      'customerMpesaNo': new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]\d*$/), Validators.maxLength(10)])
    })

    
  }
  
  checkOut() {
    // console.log(this.paymentDeliveryDetails.value);
    console.log(this.paymentDeliveryDetails);

  }

}
