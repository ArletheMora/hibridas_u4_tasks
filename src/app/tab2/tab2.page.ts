import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks: Task[];
  //public tasksComplete: string[];

  constructor(
    private taskService:TaskService
  ) {
    this.taskService.getCompleteTasks().subscribe((res) => {
      this.tasks = res;
    });
  }

  public removeTask(id:string){
    this.taskService.removeTask(id)
  }

  public uncompleteTask(id:string) {
    this.taskService.unCompleteTask(id);
  }

}