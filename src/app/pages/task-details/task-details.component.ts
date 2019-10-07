import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  editTaskForm: FormGroup;

  constructor(public taskService: TaskService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.editTaskForm = this.fb.group({
      name: ['', Validators.required ],
      description: ['', Validators.required ]
   });
  }

  ngOnInit() {
    this.taskService.getTaskById(this.route.snapshot.params.id)
    .subscribe((data: Task) => {
        this.task = data;
    }, (err) => {
      this.router.navigate(['/home']);
    });
  }

  get f() { return this.editTaskForm.controls; }

  updateTask() {
    if (this.editTaskForm.invalid) {
      return;
    }
    this.task.name = this.f.name.value;
    this.task.description = this.f.description.value;
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
