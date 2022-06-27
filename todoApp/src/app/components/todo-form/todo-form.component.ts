import { TodoService } from './../../service/todo.service';
import { Todo } from './../../model/Todo';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  todoTitle: string;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  // to add new todo
  handleAdd() {
    const newTodo = {
      id: uuidv4(),
      title: this.todoTitle,
      isCompleted: false,
      date: new Date(),
    };
    this.todoService.addTodo(newTodo);
    this.todoTitle = '';
  }
}
