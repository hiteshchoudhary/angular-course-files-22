import { BootcampComponent } from './components/bootcamp/bootcamp.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { OurserviceComponent } from './components/ourservice/ourservice.component';
import { RootComponent } from './root/root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent, // will load root component which contain jumbotron and router outlet
    children: [
      { path: '', component: OurserviceComponent }, // this component has no diference with the other children except for the shorter route.
      { path: 'course', component: CourseComponent },
      { path: 'bootcamps', component: BootcampComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurserviceRoutingModule {}
