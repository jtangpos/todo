import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Task } from '../models/task';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public getAllTasks(): Observable<Task[]> {
     return this.http.get<Task[]>(API_URL + '/tasks');
  }

  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(API_URL + '/tasks', task);
  }

  public getTaskById(taskId: number) {
    return this.http.get<Task>(API_URL + '/tasks/' + taskId);
  }

  public updateTask(task: Task) {
    return this.http.put(API_URL + '/tasks/' + task.id, task)
  }

  public deleteTask(taskId: number) {
    return this.http.delete(API_URL + '/tasks/' + taskId);
  }

}
