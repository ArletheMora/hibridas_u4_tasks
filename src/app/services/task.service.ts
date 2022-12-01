import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: string[] = [];
  private tasksComplete: string[] = [];

  constructor(private firestore: AngularFirestore) { 
    this.tasks.push("Tarea 1");
    this.tasks.push("Tarea 2");
  }

  public getTasks(): Observable<Task[]> {
    //return this.tasks;
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return {id, ...data };
        })
      })
    )
  }

  public getCompleteTasks():string[] {
    return this.tasksComplete;
  }

  public addTask(newTask:string) {
    this.tasks.push(newTask);
  }

  public removeTask(pos:number) {
    this.tasks.splice(pos, 1);
  }

  public removeCompleteTask(pos:number){
      this.tasksComplete.splice(pos,1);
  }

  public completeTask(pos:number) {
    this.tasksComplete.push(this.tasks[pos]);
    this.tasks.splice(pos, 1);
  }

  public uncompleteTask(pos:number){
    this.tasks.push(this.tasksComplete[pos]);
    this.tasksComplete.splice(pos,1);
  }
}