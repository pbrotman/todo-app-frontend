import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http/';
import { API_URL } from 'src/app/app.constants';


export class HelloWorldBean {
  constructor(public message :  string){

  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient
  ) { }

  executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean/`)
    // console.log("executeHelloWorldBeanService")
  }

  executeHelloWorldWithPathVar(name : any){
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    //   })

    return this.http.get<HelloWorldBean>(
      `${API_URL}/hello-world-bean/path-var/${name}`,
      // {headers}
      );
    // console.log("executeHelloWorldBeanService")
  }

  // createBasicAuthenticationHttpHeader(){
  //   let username = "parker"
  //   let password = "brotman"
  //   let basicAuthHeaderString = "Basic " + window.btoa(`${username}:${password}`)
  //   return basicAuthHeaderString;
  // }
}
