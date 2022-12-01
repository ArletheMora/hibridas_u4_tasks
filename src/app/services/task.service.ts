import { Task } from './../models/task';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        });
      })
    )
  }
  public getNoCompleteTasks(): Observable<Task[]> {
    //return this.tasks;
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return {id, ...data };
        }).filter(task=>task.complete==false);
      })
    )
  }
  public getCompleteTasks(): Observable<Task[]> {
    //return this.tasks;
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return {id, ...data };
        }).filter(task=>task.complete==true);
      })
    )
  }

  /* public getCompleteTasks():string[] {
    return this.tasksComplete;
  } */

  public addTask(newTask:Task) {
    //this.tasks.push(newTask);
    this.firestore.collection('tasks').add(newTask);
  }

  public removeTask(id:string) {
    //this.tasks.splice(pos, 1);
    this.firestore.collection('tasks').doc(id).delete();
  }

  /* public removeCompleteTask(pos:number){
      this.tasksComplete.splice(pos,1);
  } */

  public completeTask(id:string) {
    //this.tasksComplete.push(this.tasks[pos]);
    //this.tasks.splice(pos, 1);
    this.firestore.collection('tasks').doc(id).update({complete:true});
  }

  public unCompleteTask(id:string){
    this.firestore.collection('tasks').doc(id).update({complete:false});
  }
}