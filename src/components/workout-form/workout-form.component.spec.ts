import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutFormComponent } from './workout-form.component';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let router: Router;

  beforeEach(async () => {
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [WorkoutFormComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should initialize the component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when no data is provided', () => {
    expect(component.workout.username).toBe('');
    expect(component.workout.workoutType).toBe('');
    expect(component.workout.workoutMinutes).toBeNull();
    expect(fixture.nativeElement.querySelector('form').checkValidity()).toBeFalse();
  });

  it('should validate form when all fields are filled', () => {
    component.workout.username = 'Sample User';
    component.workout.workoutType = 'Jogging';
    component.workout.workoutMinutes = 45;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('form').checkValidity()).toBeTrue();
  });

  it('should save workout details in localStorage and navigate to workout list upon submission', () => {
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(localStorage, 'getItem').and.returnValue('[]');

    component.workout.username = 'Sample User';
    component.workout.workoutType = 'Jogging';
    component.workout.workoutMinutes = 45;

    fixture.detectChanges();
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(localStorage.getItem).toHaveBeenCalledWith('workouts');
    expect(localStorage.setItem).toHaveBeenCalledWith('workouts', jasmine.any(String));
    expect(router.navigate).toHaveBeenCalledWith(['/workout-list']);
  });
});
