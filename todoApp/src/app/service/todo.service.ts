import { of } from 'rxjs';
import { Todo } from './../model/Todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[];
  constructor() {
    // dummy todos
    this.todos = [
      {
        id: '130',
        title: 'Learn C++',
        isCompleted: true,
        date: new Date(),
      },
      {
        id: '13000',
        title: 'Make App',
        isCompleted: true,
        date: new Date(),
      },
      {
        id: '1300000',
        title: 'Complete Todo App',
        isCompleted: false,
        date: new Date(),
      },
    ];
  }

  // to add todo to the array
  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  // to get all todos
  getTodos() {
    return of(this.todos);
  }

  // to mark as Complete ,vice-versa, of todo
  changeStatus(todo: Todo) {
    this.todos.map((singleTodo) => {
      if (singleTodo.id == todo.id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
  }

  // to remove the todo from array
  deleteTodo(todo: Todo) {
    const indexofTodo = this.todos.findIndex(
      (currentObj) => currentObj.id === todo.id
    );
    this.todos.splice(indexofTodo, 1);
    console.log(this.todos);
  }
}
