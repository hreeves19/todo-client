import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Todo } from './todos/todo';
import { Observable, switchMap } from 'rxjs';
import { TodoService } from './todos/todo.service';

interface AppComponentState {
    todos: Todo[]
    newTodo: string
}

@Injectable()
export class AppStore extends ComponentStore<AppComponentState> {
    constructor(private todoService: TodoService) {
        super({ todos: [], newTodo: '' })
    }

    readonly todos$ = this.select((state) => state.todos)
    readonly filteredTodo$ = this.select(this.todos$, (todos) => todos.filter((todo) => todo.name.toLowerCase().includes('0')))

    private readonly setTodos = this.updater((state, todos: Todo[]) => {
        return {
            ...state,
            todos: [...todos]
        }
    })

    private readonly addTodoInState = this.updater((state, todo: Todo) => {
        return {
            ...state,
            todos: [...state.todos, todo]
        }
    })

    readonly initialize = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            switchMap(() => {
                return this.todoService.getAll().pipe(tapResponse(
                    (_) => {
                        const todos = [...Array(100_000).keys()].map((val) => {
                            const newTodo = new Todo()
                            newTodo._id = `${val}`
                            newTodo.name = `Todo ${val}`
                            return newTodo
                        })
                        this.setTodos(todos)
                    },
                    (error) => {
                        console.error(error)
                    }
                ))
            })
        )
    })
    readonly addTodo = this.effect((name$: Observable<string>) => {
        return name$.pipe(
            switchMap((name) => {
                return this.todoService.addNewTodo(name).pipe(tapResponse(
                    (todo) => {
                        this.addTodoInState(todo)
                    },
                    (error) => {
                        console.error(error)
                    }
                ))
            })
        )
    })
}