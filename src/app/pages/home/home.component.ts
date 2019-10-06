import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastId = 0;
  tasks: Task[];
  task: Task = {id: null, name: '', description: '', created: ''};
  config: any;

  constructor(public taskService: TaskService, private datePipe: DatePipe) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1
    };
  }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.config.totalItems = this.tasks.length
    });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  createTask() {
    this.task.created = this.datePipe.transform(new Date(), 'yyyy-MM-dd h:mm:ss');
    this.taskService.createTask(this.task)
    .subscribe((newTask) => {
      this.tasks = this.tasks.concat(newTask);
      this.config.totalItems = this.tasks.length
    });
    this.task = {id: null, name: '', description: '', created: ''};

  }

}
