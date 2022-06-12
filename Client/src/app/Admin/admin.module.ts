import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularLineawesomeModule } from 'angular-line-awesome';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AngularLineawesomeModule,
    RouterModule.forChild([
      {path:'', component: DashboardComponent, children:[

      ]}
    ])
  ]
})
export class AdminModule { }
