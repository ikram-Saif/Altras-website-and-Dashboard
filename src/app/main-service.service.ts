import { Injectable } from '@angular/core';
import {HttpClient ,HttpParams , HttpHeaders } from '@angular/common/http'
import { CompileShallowModuleMetadata } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  url = 'https://api.altras.co.uk/trws.php'

  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYWx0cmFzLmNvLnVrIiwiYXVkIjoiaHR0cHM6XC9cL2FsdHJhcy5jby51ayIsImlhdCI6MTU1NjQ2MDkxNiwiZGF0YSI6eyJJRCI6IjMiLCJFbXBsb3llZUlEIjoiNTYiLCJGdWxsTmFtZSI6IkFsdHJhcyBXRUIiLCJFbWFpbCI6Im1vdGF6QGFsdHJhcy5jby51ayIsIlBob25lIjoiKzI0OTEyMzQ1MjAwMCIsIkFMb2dpbiI6Im9ubGluZSJ9fQ.I3mralY2BwYBz-NMcDZUGS1qVHsQknBqZ-RckyJpIIk'
   headers = new HttpHeaders().set('token', this.token);
   

  constructor(private _http: HttpClient) { }
  ngOnInit() {

  }
  
  get(p1:[{}]){
    let httpParams = new HttpParams()
 
    p1.map(param =>
      { 

        for (const [key, value] of Object.entries(param)) 
        {
           console.log(key , value)
          httpParams = httpParams.append(`${key}` , `${value}`)
        }
      })
      console.log(httpParams)
     return this._http.get(this.url ,{headers:this.headers,params: httpParams})
  }
}

