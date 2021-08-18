import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoDataService } from '../../services/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = new Todo();
  isEditMode = false;
  
  constructor(
    private todoDataService: TodoDataService
  ) { }

  ngOnInit(): void {
    this.todoDataService.getAllTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  editTodo(todo: Todo) {
    this.newTodo = new Todo(todo);
    this.isEditMode = true;
  } 

  deleteTodo(id: number) {
    this.todoDataService.deleteTodoById(id).subscribe(x => {
      const index = this.todos && this.todos.length ? this.todos.findIndex((el) => el.id === id) : -1;
        if (index > -1) {
          this.todos.splice(index, 1);
        }
    });
  } 

  addEditTodo() {
    if(this.newTodo.title.trim() === "") {
      return;
    }
    
    if (this.isEditMode) {
     this.updateTodo()
    } else {
      this.todoDataService.createTodo(this.newTodo).subscribe((newTodo) => {
        this.todos = this.todos.concat(newTodo);
      });
    }
    this.clearInput();
  }

  clearInput() {
    this.newTodo = new Todo();
    this.isEditMode = false;
  }

  markAsCompleted(todo: Todo) {
    todo.complete = true;
    this.newTodo = todo;
    this.updateTodo();
  }

  updateTodo() {
    this.todoDataService.updateTodo(this.newTodo).subscribe((newTodo) => {
      const index = this.todos && this.todos.length ? this.todos.findIndex((el) => el.id === newTodo.id) : -1;
      if (index > -1) {
        this.todos[index] = newTodo
      }
    });
  }
}
