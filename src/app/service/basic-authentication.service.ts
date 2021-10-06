import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators"

export const TOKEN = "token"
export const AUTHENTICATED_USER = "authenticatedUser"
export const API_URL = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http : HttpClient) { }

  authenticate(username : string, password : string){
    // console.log("before" + this.isUserLoggedIn());
    if(username==="parker" && password==="brotman"){
      sessionStorage.setItem(AUTHENTICATED_USER, username)
      // console.log("after" + this.isUserLoggedIn());
      return true;
    } else {
      return false;
    }
  }

  executeAuthenticationService(username : string, password : string){
    let basicAuthHeaderString = "Basic " + window.btoa(`${username}:${password}`)
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
      })

    return this.http.get<AuthenticationBean>(
      `http://localhost:8080/basicauth`,
      {headers}).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
        )
      );
    // console.log("executeHelloWorldBeanService")
  }

  executeJWTAuthenticationService(username : string, password : string){

    return this.http.post<any>(
      `${API_URL}/authenticate`, {
        username,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
    // console.log("executeHelloWorldBeanService")
  }

  // createBasicAuthenticationHttpHeader(){
  //   let username = "parker"
  //   let password = "brotman"
  //   let basicAuthHeaderString = "Basic " + window.btoa(`${username}:${password}`)
  //   return basicAuthHeaderString;
  // }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
    return null
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }
}

export class AuthenticationBean{
  constructor(public message: string){}
}
