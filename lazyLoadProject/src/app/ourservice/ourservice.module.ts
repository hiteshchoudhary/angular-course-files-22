import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurserviceRoutingModule } from './ourservice-routing.module';
import { CourseComponent } from './components/course/course.component';
import { BootcampComponent } from './components/bootcamp/bootcamp.component';
import { OurserviceComponent } from './components/ourservice/ourservice.component';
import { RootComponent } from './root/root.component';


@NgModule({
  declarations: [CourseComponent, BootcampComponent, OurserviceComponent, RootComponent],
  imports: [
    CommonModule,
    OurserviceRoutingModule
  ]
})
export class OurserviceModule { }
