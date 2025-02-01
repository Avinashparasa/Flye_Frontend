import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  workout = {
    username: '',
    workoutType: 'Cycling',
    workoutMinutes: null as number | null
  };

  constructor(private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      const storedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
      storedWorkouts.push(this.workout);
      localStorage.setItem('workouts', JSON.stringify(storedWorkouts));
      this.router.navigate(['/workout-list']);
    }
  }
}
