import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/Auth/Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken() || ''
    const tokenizedRequest = req.clone({headers: req.headers.set('token', token)})
    return next.handle(tokenizedRequest).pipe(
      catchError(err => {
        const error = err.error.message || "Failed. Try again later"
        return throwError(error)
      })
    )
  }
}
