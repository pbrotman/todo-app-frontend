import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { stringify } from 'querystring';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];
  message: string;
  // todos = [
  //   new Todo(1, "Learn to Dance", false, new Date()),
  //   new Todo(2, "Become an angular expert", false, new Date()),
  //   new Todo(3, "Become an anglar fish", true, new Date()),
  //   new Todo(4, "Visit Inda", false, new Date())
  //   // {id : 1, description: "Learn to Dance"},
  //   // {id : 2, description: "Become an angular chad"},
  //   // {id : 3, description: "Become an anglar fish"},
  //   // {id : 4, description: "Visit Inda"},
  // ]

  // todo = {
  //   id : 1,
  //   description: "Learn to Dance"
  // }

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { 
    this.todos = [];
    this.message = "";
  }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos("parker").subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id : number){
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo("parker", id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`
        this.refreshTodos();
      }
    )
  }

  updateTodo(id : number){
    console.log(`update todo ${id}`)
    this.router.navigate(["todos", id])
  }

  addTodo(){
    this.router.navigate(["todos", -1])
  }

}
