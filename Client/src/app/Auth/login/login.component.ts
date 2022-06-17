import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  customerCredentials!:FormGroup

  ngOnInit(): void {
    this.customerCredentials = new FormGroup({
      'customerSignInEmail': new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-z]+@gmail.com$/)]),
      'customerSignInPassword': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'customerSignUpEmail': new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-z]+@gmail.com$/)]),
      'customerSignUpPassword': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'customerNames': new FormControl('', Validators.required)
    })
  }

}
