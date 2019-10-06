import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  task: Task;

  constructor(public taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.taskService.getTaskById(this.route.snapshot.params.id)
    .subscribe((data: Task) => {
        this.task = data;
    }, (err) => {
      this.router.navigate(['/home']);
    });
  }

  updateTask() {
    this.taskService.updateTask(this.task)
    .subscribe((data: Task) => {
      this.task = data;
    });
  }

  deleteTask() {
    const r = confirm('Are you sure you want to delete this task!');
    if (r === true) {
      this.taskService.deleteTask(this.task.id).subscribe((data) => {
        this.router.navigate(['/home']);
      });
    }
  }
}
