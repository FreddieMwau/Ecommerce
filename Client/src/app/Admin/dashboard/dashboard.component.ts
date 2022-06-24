import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Auth/model/user';
import { AuthService } from 'src/app/Auth/Service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:Users={
    email: '',
    full_name:'',
    customer_password: ''
  }
  constructor(private authService:AuthService) { }
  adminName!:string
  ngOnInit(): void {
    const email = localStorage.getItem('email')
    if(email){
      this.authService.getUser(email).subscribe(data => {
        this.user=data[0]
      })
    }
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
