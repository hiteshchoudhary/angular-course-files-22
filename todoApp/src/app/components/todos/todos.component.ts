import { Todo } from './../../model/Todo';
import { TodoService } from './../../service/todo.service';
import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  // to use this icon in html
  faTrashAlt = faTrashAlt;

  // using service to get todo
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // subscribing to service and setting in properties
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  // to mark and unmark the todo
  changeTodoStatus(todo: Todo) {
    this.todoService.changeStatus(todo);
  }

  // to delete a single todo
  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
