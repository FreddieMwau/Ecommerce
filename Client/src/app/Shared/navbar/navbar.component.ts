import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/Auth/model/user';
import { AuthService } from 'src/app/Auth/Service/auth.service';
import { CartService } from 'src/app/Shop/Service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  totalItems:number=0
  user: Users = {
    customer_id: '',
    full_name: '',
    email: '',
    isAdmin:false,
    customer_password: ''
  }
  constructor(private router:Router, private cartService:CartService, public authService:AuthService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.totalItems = res.length
    })

    let email = localStorage.getItem('email')
    if(email){
      this.authService.getUser(email).subscribe(data=>{
        this.user = data[0]
      })
    }

  }

  menu(e: Event, x: HTMLDivElement, y: HTMLDivElement) {
    const menu = '../../assets/menu.png'
    const close = '../../assets/cross.png'

    const img = <HTMLImageElement>e.target
    const imgUrlSegs = img.src.split('/')
    const iconName = imgUrlSegs[imgUrlSegs.length - 1]

    iconName === 'menu.png' ? (img.src = close, x.children[0].classList.remove('absolute', 'opacity-0'),
      y.classList.remove('absolute', 'opacity-0')) : (img.src = menu, x.children[0].classList.add('absolute', 'opacity-0'),
        y.classList.add('absolute', 'opacity-0'))
  }

  cart() {
    this.router.navigate(['/shop/cart'])   
  }

}
