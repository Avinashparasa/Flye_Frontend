import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WorkoutChartComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  chart: any;

  constructor() {}

  ngOnInit() {
    this.loadInitialUsers();
    this.loadUsersFromLocalStorage();
  }

  loadInitialUsers() {
    this.users = [
      {
        name: 'Rushil',
        workouts: [
          { type: 'Running', minutes: 30 },
        ]
      },
      {
        name: 'Abhay',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        name: 'Ram',
        workouts: [
          { type: 'Meditation', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];
  }

  loadUsersFromLocalStorage() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const localStorageData = localStorage.getItem('workouts');
      const localStorageUsers: any[] = localStorageData ? JSON.parse(localStorageData) : [];
      
      localStorageUsers.forEach(localStorageUser => {
        const userIndex = this.users.findIndex(user => user.name === localStorageUser.username);
        if (userIndex !== -1) {
          this.users[userIndex].workouts.push({
            type: localStorageUser.workoutType,
            minutes: localStorageUser.workoutMinutes
          });
        } else {
          this.users.push({
            name: localStorageUser.username,
            workouts: [
              {
                type: localStorageUser.workoutType,
                minutes: localStorageUser.workoutMinutes
              }
            ]
          });
        }
      });
    }
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.renderChart();
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('workoutChart') as HTMLCanvasElement;
    const workoutTypes = this.selectedUser!.workouts.map(workout => workout.type);
    const workoutMinutes = this.selectedUser!.workouts.map(workout => workout.minutes);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: workoutTypes,
        datasets: [{
          label: 'Workout Minutes',
          data: workoutMinutes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}