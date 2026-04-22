import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import {LoginService} from '../login.service'
import { Router } from '@angular/router';



// @Injectable()
// export class CheckHttpResponseInterceptor implements HttpInterceptor {

//   constructor( private _loginService : LoginService ,private _router: Router ) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     // let Modification = request.clone()
//     return next.handle(request).pipe(
//       map((event:HttpEvent<any>) =>{
//         if (event.body != null && event.body.RCode){
//           this._loginService.loggedOut()

         
//     }))
//   }
// }
