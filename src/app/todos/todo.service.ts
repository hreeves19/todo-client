import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly route = 'http://localhost:3000/todos'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.route)
  }

  addNewTodo(name: string): Observable<Todo> {
    return this.http.post<Todo>(this.route, { name })
  }
}