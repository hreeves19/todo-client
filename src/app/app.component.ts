import { Component, OnInit } from '@angular/core';
import { TodoService } from './todos/todo.service';
import { Todo } from './todos/todo';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppStore]
})
export class AppComponent implements OnInit {
  title = 'todo-client';
  todos: Todo[] = []
  newTodo: string = ''

  constructor(public store: AppStore) {
  }

  ngOnInit(): void {
    this.store.initialize()
  }
}
