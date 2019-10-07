import { Component, OnInit, TemplateRef } from '@angular/core';
import _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskModalComponent } from 'src/app/components/task-modal/task-modal.component';
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
  modalRef: BsModalRef;

  constructor(public taskService: TaskService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  showAddTaskModal() {
    const initialState = {
      title: 'Create Task'
    };
    this.modalRef = this.modalService.show(TaskModalComponent, {initialState});
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((result) => {
      if (result !== null) {
        this.tasks = this.tasks.concat(JSON.parse(result));
      }
    });
  }

  showEditTaskModal(task: Task) {
    const initialState = {
      title: 'Edit Task',
      task
    };
    this.modalRef = this.modalService.show(TaskModalComponent, {initialState});
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((result) => {
      if (result !== null) {
        result = JSON.parse(result);
        const index = _.findIndex(this.tasks, (r) => r.id === Number(result.id));
        if (index !== -1) {
          this.tasks[index] = result;
        }
      }
    });
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
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

  deleteTasks(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  deleteTasksConfirm(): void {
    this.checkedIds.forEach(id => {
      this.taskService.deleteTask(id).subscribe((data) => {
        const index = _.findIndex(this.tasks, (task) => task.id === Number(id));
        if (index !== -1) {
          this.tasks.splice(index, 1);
        }
      });
    });
    this.checkedIds = [];
    this.modalRef.hide();
  }

  declineDelete(): void {
    this.modalRef.hide();
  }
}
