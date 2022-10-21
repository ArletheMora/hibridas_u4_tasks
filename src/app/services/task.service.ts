import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: string[] = [];
  private tasksComplete: string[] = [];

  constructor() { 
    this.tasks.push("Tarea 1");
    this.tasks.push("Tarea 2");
  }

  public getTasks():string[] {
    return this.tasks;
  }

  public addTask(newTask:string) {
    this.tasks.push(newTask);
  }

  public removeTask(pos:number) {
    this.tasks.splice(pos, 1);
  }

  public completeTask(pos:number){
    this.tasksComplete.push(this.tasks[pos]);
    this.tasks.splice(pos, 1);
  }
}