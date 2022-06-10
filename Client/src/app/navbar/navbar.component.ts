import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
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
