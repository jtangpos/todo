import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  title: string;
  closeBtnName: string;
  taskForm: FormGroup;
  task: Task = {id: null, name: '', description: '', created: ''};

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private modalService: BsModalService
    ) {
    this.taskForm = this.fb.group({
        name: ['', Validators.required ],
        description: ['', Validators.required ]
    });
   }

  ngOnInit() {
  }

  get f() { return this.taskForm.controls; }

  submitTask() {
    if (this.taskForm.invalid) {
      return;
    }

    this.task.name = this.f.name.value;
    this.task.description = this.f.description.value;

    if (this.task.id !== null) {
      this.editTask();
    } else {
      this.addTask();
    }
  }

  addTask() {
    this.task.created = this.datePipe.transform(new Date(), 'yyyy-MM-dd h:mm:ss');
    this.taskService.createTask(this.task)
    .subscribe((newTask) => {
      this.modalService.setDismissReason(JSON.stringify(newTask));
      this.bsModalRef.hide();
    });
  }

  editTask() {
    this.taskService.updateTask(this.task)
    .subscribe((data: Task) => {
      this.modalService.setDismissReason(JSON.stringify(data));
      this.bsModalRef.hide();
    });
  }
}
