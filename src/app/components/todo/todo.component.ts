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
  isTodoExist: boolean = false;
  searchedInput: string = "";
  filteredTodos: Todo[] = [];

  constructor(
    private todoDataService: TodoDataService
  ) { }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(): void {
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
     this.updateTodo(this.newTodo)
    } else {
      const index = this.todos.findIndex((el) => el.title.toLocaleLowerCase() === this.newTodo.title.toLocaleLowerCase());
      if (index === -1) {
        this.isTodoExist = false;
        this.todoDataService.createTodo(this.newTodo).subscribe((newTodo) => {
          this.todos = this.todos.concat(newTodo);
        });
      } else {
        this.isTodoExist = true;
        setTimeout(() => this.isTodoExist = false, 2000);
      }
    }
    this.clearInput();
  }

  clearInput() {
    this.newTodo = new Todo();
    this.isEditMode = false;
  }

  clearSearchInput() {
    this.searchedInput = "";
    this.getAllTodos();
  }

  markAsCompleted(todo: Todo) {
    this.updateTodo(todo);
  }

  searchTodos(): void {
    if (this.searchedInput) {
      this.filteredTodos = this.todos.filter((el) => el.title.toLocaleLowerCase().includes(this.searchedInput.toLocaleLowerCase().trim()));
    }
  }

  updateTodo(todo: Todo) {
    this.todoDataService.updateTodo(todo).subscribe((newTodo) => {
      const index = this.todos && this.todos.length ? this.todos.findIndex((el) => el.id === newTodo.id) : -1;
      if (index > -1) {
        this.todos[index] = newTodo
      }
    });
  }
}