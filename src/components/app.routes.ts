import { Routes } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'workout-form',
    component: WorkoutFormComponent,
    pathMatch: 'full'
  },
  {
    path: 'work-chart',
    // redirectTo: 'workout-form',
    component: WorkoutChartComponent,
    pathMatch: 'full'
  },
  {
    path: 'workout-form',
    component: WorkoutFormComponent
  },
  {
    path: 'workout-list',
    component: WorkoutListComponent
  }
];
