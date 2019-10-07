import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import _ from 'lodash';
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
  searchText: string;
  key = 'id';
  reverse = true;
  checkedIds = [];
  addTaskForm: FormGroup;

  constructor(public taskService: TaskService, private datePipe: DatePipe, private fb: FormBuilder) {
    this.addTaskForm = this.fb.group({
      name: ['', Validators.required ],
      description: ['', Validators.required ]
   });
  }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  get f() { return this.addTaskForm.controls; }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  createTask() {
    if (this.addTaskForm.invalid) {
      return;
    }

    this.task.created = this.datePipe.transform(new Date(), 'yyyy-MM-dd h:mm:ss');
    this.task.name = this.f.name.value;
    this.task.description = this.f.description.value;
    this.taskService.createTask(this.task)
    .subscribe((newTask) => {
      this.tasks = this.tasks.concat(newTask);
    });
    this.task = {id: null, name: '', description: '', created: ''};
  }

  checkTask(event) {
    if (event.target.checked) {
      this.checkedIds.push(event.target.value);
    } else {
      const index = this.checkedIds.indexOf(event.target.value);
      if (index !== -1) {
        this.checkedIds.splice(index, 1);
      }
    }
  }

  deleteTasks() {
    const r = confirm('Are you sure you want to delete selected task!');
    if (r === true) {
      this.checkedIds.forEach(id => {
        this.taskService.deleteTask(id).subscribe((data) => {
          const index = _.findIndex(this.tasks, (task) => task.id === Number(id));
          if (index !== -1) {
            this.tasks.splice(index, 1);
          }
        });
      });
      this.checkedIds = [];
    }
  }

}
