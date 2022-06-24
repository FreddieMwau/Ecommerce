import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Users } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http:HttpClient, private router:Router) { }

  signInUser(user:Users){
    return this.Http.post<any>("http://localhost:7000/user/signin", user)
  }

  signUpUser(user:Users){
    return this.Http.post<any>("http://localhost:7000/user/signup", user)
  }

  getUser(email:string){
    return this.Http.get<Users[]>(`http://localhost:7000/user/email/${email}`)
  }

  getUserCount(){
    return this.Http.get<any>("http://localhost:7000/user/users")
  }

  users$ = this.Http.get<Users[]>('http://localhost:7000/user/').pipe(
    tap(users=>console.log(users)
    )
  )
  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

  isAdmin(){
    return !!localStorage.getItem('isAdmin')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  
}
