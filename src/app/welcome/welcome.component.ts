import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message : string = "Some welcome message"
  welcomeMessageFromService : string = "";
  name = ""

  //ActivatedRoute
  constructor(
    private route:ActivatedRoute,
    private service:WelcomeDataService) {
  
  }

  ngOnInit(): void {
    // console.log(this.message)
    this.name = this.route.snapshot.params["name"]
  }

  getWelcomeMessage(){
    // console.log(this.service.executeHelloWorldBeanService());

    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
      // response => console.log(response)
    );

    console.log("last line of getWelcomeMessage")
    // console.log("get welcome message")
  }

  getWelcomeMessageWithParam(){
    // console.log(this.service.executeHelloWorldBeanService());

    this.service.executeHelloWorldWithPathVar(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
      // response => console.log(response)
    );

    console.log("last line of getWelcomeMessage")
    // console.log("get welcome message")
  }

  handleSuccessfulResponse(response: any){
    this.welcomeMessageFromService = response.message;
    // console.log(response);
    // console.log(response.message);
  }

  handleErrorResponse(error : any){
    // console.log(error);
    // console.log(error.error.message);
    this.welcomeMessageFromService = error
  }
}
