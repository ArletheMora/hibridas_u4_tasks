import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public tasks: Task[];
  public task: Task;

  constructor(private taskService: TaskService) {
    this.task = {
      nombre: '',
      complete: false,
    };
    //this.task.nombre = "";
    //this.taskService.getTasks().subscribe((res) => {
    this.taskService.getNoCompleteTasks().subscribe((res) => {
      this.tasks = res;
    });
  }

  public addTask(e) {
    if (e.keyCode === 13 && this.task.nombre != '') {
      this.add();
    }
  }

  public addTaskButton() {
    this.add();
  }

  public add() {
    this.task.complete = false;
    this.taskService.addTask(this.task);
    console.log(this.tasks);
    this.task.nombre = '';
  }

  public removeTask(id:string){
    this.taskService.removeTask(id)
  }

  public completeTask( id:string){
    this.taskService.completeTask(id);
  }

  /*public addTask(e) {  
  }

  public addTaskButton() {
    this.taskService.addTask(this.task);
    this.tasks = this.taskService.getTasks();
    console.log(this.tasks);
    this.task = "";
  }

  public removeTask(pos: number) {
    this.taskService.removeTask(pos);
    this.tasks = this.taskService.getTasks();
  }

  public completeTask(pos: number) {
    this.taskService.completeTask(pos);
    this.tasks = this.taskService.getTasks();
  }*/
}
