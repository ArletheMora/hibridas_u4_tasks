import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  public tasks: string[];
  public task: string;

  constructor(
    private taskService:TaskService
  ) {
    this.tasks = this.taskService.getTasks();
    this.task = "";
  }

  public addTask(e){
    if(e.keyCode === 13 && this.task != "" ){
      this.taskService.addTask(this.task);
      this.tasks = this.taskService.getTasks();
      console.log(this.tasks);
      this.task = "";
    }
  }

  public addTaskButton(){
    this.taskService.addTask(this.task);
    this.tasks = this.taskService.getTasks();
    console.log(this.tasks);
    this.task = "";
  }

  public removeTask(pos:number) {
    this.taskService.removeTask(pos);
    this.tasks = this.taskService.getTasks();
  }

  public completeTask(pos:number) {
    this.taskService.completeTask(pos);
    this.tasks = this.taskService.getTasks();
  }

}
