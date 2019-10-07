import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskDetailsComponent,
    HeaderComponent,
    FooterComponent,
    TaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  entryComponents: [TaskModalComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
