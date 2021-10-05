import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id : number
  todo : Todo

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = -2;
    this.todo = {} as Todo;
   }

  ngOnInit(){
    this.id = this.route.snapshot.params["id"];

    if(this.id != -1) {
      this.todoService.retrieveTodo("parker", this.id)
          .subscribe(
            data => this.todo = data
          )
    }
  }

  // For some reason, date is always -1 from what you specify, the new id is 0, and the method is called twice.
  // (except if you don't change the date, then it remains as it is)
  saveTodo(){
    console.log(this.id == -1)
    if(this.id == -1){  // tutorial has ===, but that results in false
      //Create Todo
      console.log(`todo.comp create, id=${this.id}`)
      this.todoService.createTodo("parker", this.todo)
          .subscribe(
            data => {
              // console.log(data)
              this.router.navigate(["todos"])
            }
          )
    } else {
      console.log(`todo.comp update, id=${this.id}`)
      this.todoService.updateTodo("parker", this.id, this.todo)
          .subscribe(
            data => {
              // console.log(data)
              this.router.navigate(["todos"])
            }
          )
    }
    
  }

}
