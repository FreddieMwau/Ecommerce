import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    const menu = <HTMLDivElement> document.getElementById('menu')
    menu.classList.add('active')
  }

  close(){
    const menu = <HTMLDivElement>document.getElementById('menu')
    menu.classList.remove('active')
  }

}
