// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { WorkoutChartComponent } from './workout-chart.component';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// describe('WorkoutChartComponent', () => {
//   let component: WorkoutChartComponent;
//   let fixture: ComponentFixture<WorkoutChartComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CommonModule, FormsModule],
//       declarations: [WorkoutChartComponent]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WorkoutChartComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load users from local storage', () => {
//     spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([
//       { username: 'John Doe', workoutType: 'Running', workoutMinutes: 30 }
//     ]));
//     component.ngOnInit();
//     expect(component.users.length).toBeGreaterThan(0);
//   });

//   it('should select a user and render chart', () => {
//     const user = { name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] };
//     component.selectUser(user);
//     expect(component.selectedUser).toEqual(user);
//   });
// });