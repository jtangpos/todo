import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskModalComponent } from 'src/app/components/task-modal/task-modal.component';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  task: Task;
  modalRef: BsModalRef;

  constructor(
    public taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.taskService.getTaskById(this.route.snapshot.params.id)
    .subscribe((data: Task) => {
        this.task = data;
    }, (err) => {
      this.router.navigate(['/home']);
    });
  }

  showEditTaskModal() {
    const initialState = {
      title: 'Edit Task',
      task: this.task
    };
    this.modalRef = this.modalService.show(TaskModalComponent, {initialState});
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((result) => {
      if (result !== null) {
        this.task = JSON.parse(result);
      }
    });
  }

  deleteTask(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  deleteTasksConfirm(): void {
    this.taskService.deleteTask(this.task.id).subscribe((data) => {
      this.modalRef.hide();
      this.router.navigate(['/home']);
    });
  }

  declineDelete(): void {
    this.modalRef.hide();
  }
}
