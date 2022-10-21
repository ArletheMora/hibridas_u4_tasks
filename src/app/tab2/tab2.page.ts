import { Component } from '@angular/core';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public tasksComplete: string[];

  constructor(
    private taskService:TaskService
  ) {
    this.tasksComplete = this.taskService.getCompleteTasks();
  }

  public removeCompleteTask(pos:number) {
    this.taskService.removeCompleteTask(pos);
    this.tasksComplete = this.taskService.getCompleteTasks();
  }

  public uncompleteTask(pos:number) {
    this.taskService.uncompleteTask(pos);
    this.tasksComplete = this.taskService.getCompleteTasks();
  }

}