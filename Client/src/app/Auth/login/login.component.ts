import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../model/user';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInCredentials = {
    email: '',
    customer_password: '',
  }
  signUpCredentials = {
    full_name: '',
    email: '',
    customer_password: '',
  }

  user:Users={
    email: '',
    customer_password: '',
    isAdmin:false
  }

  msg: string = ''
  admin: string = ''
  constructor(private router:Router, private authService:AuthService) { }
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

    signUpUser(){
      this.authService.signUpUser(this.signUpCredentials).subscribe((res) => {
        this.msg = res.message
        localStorage.setItem('token', res.token)
        localStorage.setItem('email', this.signUpCredentials.email)

        this.authService.getUser(this.signUpCredentials.email).subscribe(res=>{
          this.user = res[0]
          console.log(this.user);
          
        })
        if (res.message == "New user created successfully"){
          setTimeout(()=> {
            this.router.navigate(['/shop'])
          }, 4000)
        } else {
          console.log(res.message);
          this.msg = res.message
        }
      }, (error) => {
        console.log("Error definitely");
        this.msg = error.message
      })
    }

    signInUser(){
      this.authService.signInUser(this.signInCredentials).subscribe((res) => {
        this.msg = res.message
        localStorage.setItem('email', this.signInCredentials.email)
        localStorage.setItem('token', res.token)
        this.authService.getUser(this.signInCredentials.email).subscribe(res => {
          this.user = res[0]
          console.log(this.user);
          if(this.user.isAdmin == true){
            this.admin = 'Yes'
            localStorage.setItem('isAdmin', this.admin)
          }
        })
        if (res.message == "Logged in successfully") {
          console.log("On Success bout to nav");
          setTimeout(() => {
            this.router.navigate(['/shop'])
          }, 4000)
        } else {
          console.log(res.error.message);
          this.msg = res.error.message
        }
      }, (error) => {
        console.log(error.error.message);
        // this.msg = 
      })
    }

}
