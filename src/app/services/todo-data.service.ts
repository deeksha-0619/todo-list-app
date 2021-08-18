import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './../models/todo.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllTodos(): Observable<Todo[]>{
    return this.http.get(API_URL + '/todos').pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http.post(API_URL + '/todos', todo).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put(API_URL + '/todos/' + todo.id, todo).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  public deleteTodoById(todoId: number) {
    return this.http.delete(API_URL + '/todos/' + todoId).pipe(
      map(() => {
        return null;
      }));
  }

}
