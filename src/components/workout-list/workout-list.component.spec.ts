// // import { ComponentFixture, TestBed } from '@angular/core/testing';

// // import { WorkoutListComponent } from './workout-list.component';

// // describe('WorkoutListComponent', () => {
// //   let component: WorkoutListComponent;
// //   let fixture: ComponentFixture<WorkoutListComponent>;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       imports: [WorkoutListComponent]
// //     })
// //     .compileComponents();
    
// //     fixture = TestBed.createComponent(WorkoutListComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { WorkoutListComponent } from './workout-list.component';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// describe('WorkoutListComponent', () => {
//   let component: WorkoutListComponent;
//   let fixture: ComponentFixture<WorkoutListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [WorkoutListComponent, FormsModule, CommonModule]
//     }).compileComponents();

//     fixture = TestBed.createComponent(WorkoutListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load initial users', () => {
//     component.loadInitialUsers();
//     expect(component.users.length).toBeGreaterThan(0);
//   });

//   it('should filter users by search term', () => {
//     component.searchTerm = 'Abhay';
//     component.applyFilters();
//     expect(component.paginatedUsers.length).toBe(1);
//     expect(component.paginatedUsers[0].name).toBe('Abhay');
//   });

//   it('should filter users by workout type', () => {
//     component.filterType = 'Cycling';
//     component.applyFilters();
//     expect(component.paginatedUsers.length).toBe(2);
//   });

//   it('should calculate total workout minutes correctly', () => {
//     const user = { name: 'Test', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] };
//     expect(component.getTotalWorkoutMinutes(user)).toBe(75);
//   });

//   it('should return correct workout types as string', () => {
//     const user = { name: 'Test', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] };
//     expect(component.getWorkoutTypes(user)).toBe('Running, Cycling');
//   });

//   it('should generate correct number of pages', () => {
//     component.itemsPerPage = 2;
//     component.generatePagesArray(6);
//     expect(component.pagesArray.length).toBe(3);
//   });

//   // it('should change current page on goToPage', () => {
//   //   component.goToPage(2);
//   //   expect(component.currentPage).toBe(2);
//   // });

//   it('should reset to page 1 on changing items per page', () => {
//     component.currentPage = 3;
//     component.itemsPerPage = 10;
//     component.updateItemsPerPage();
//     expect(component.currentPage).toBe(1);
//   });

//   it('should load users from local storage', () => {
//     const mockLocalStorageData = JSON.stringify([
//       { username: 'John', workoutType: 'Running', workoutMinutes: 40 }
//     ]);
//     spyOn(localStorage, 'getItem').and.returnValue(mockLocalStorageData);
//     component.loadUsersFromLocalStorage();
//     expect(component.users.length).toBeGreaterThan(3);
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutListComponent, FormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial users', () => {
    component.loadInitialUsers();
    expect(component.users.length).toBeGreaterThan(0);
  });

  it('should load users from local storage', () => {
    const mockLocalStorageData = JSON.stringify([
      { username: 'John', workoutType: 'Running', workoutMinutes: 40 }
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(mockLocalStorageData);
    component.loadUsersFromLocalStorage();
    expect(component.users.some(user => user.name === 'John')).toBeTrue();
  });

  it('should handle empty local storage gracefully', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(() => component.loadUsersFromLocalStorage()).not.toThrow();
  });

  

  it('should correctly filter users by search term', () => {
    component.searchTerm = 'Abhay';
    component.applyFilters();
    expect(component.paginatedUsers.length).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('Abhay');
  });

  it('should correctly filter users by workout type', () => {
    component.filterType = 'Cycling';
    component.applyFilters();
    expect(component.paginatedUsers.length).toBe(2);
  });

  it('should correctly filter users by search and workout type together', () => {
    component.searchTerm = 'Ram';
    component.filterType = 'Cycling';
    component.applyFilters();
    expect(component.paginatedUsers.length).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('Ram');
  });

  it('should return correct workout types as string', () => {
    const user = { name: 'Test', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] };
    expect(component.getWorkoutTypes(user)).toBe('Running, Cycling');
  });

  it('should calculate total workout minutes correctly', () => {
    const user = { name: 'Test', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] };
    expect(component.getTotalWorkoutMinutes(user)).toBe(75);
  });

  it('should return 0 workout minutes if user has no workouts', () => {
    const user = { name: 'Test', workouts: [] };
    expect(component.getTotalWorkoutMinutes(user)).toBe(0);
  });

  it('should return empty string if user has no workout types', () => {
    const user = { name: 'Test', workouts: [] };
    expect(component.getWorkoutTypes(user)).toBe('');
  });

  it('should correctly generate the pagination array', () => {
    component.itemsPerPage = 2;
    component.generatePagesArray(6);
    expect(component.pagesArray.length).toBe(3);
  });

  it('should reset to page 1 when changing items per page', () => {
    component.currentPage = 3;
    component.itemsPerPage = 10;
    component.updateItemsPerPage();
    expect(component.currentPage).toBe(1);
  });

  it('should correctly paginate users', () => {
    component.itemsPerPage = 1;
    component.currentPage = 1;
    component.applyFilters();
    expect(component.paginatedUsers.length).toBe(1);
  });

  it('should not go to invalid page numbers', () => {
    component.pagesArray = [1, 2, 3];
    component.goToPage(4); // Invalid
    expect(component.currentPage).toBe(1);
  });

  it('should correctly change pages when using goToPage', () => {
    component.pagesArray = [1, 2, 3];
    component.goToPage(2);
    expect(component.currentPage).toBe(2);
  });

  it('should not go to page 0', () => {
    component.goToPage(0);
    expect(component.currentPage).toBe(1);
  });

  it('should handle empty user list without errors', () => {
    component.users = [];
    component.applyFilters();
    expect(component.paginatedUsers.length).toBe(0);
  });

  it('should handle null search term gracefully', () => {
    component.searchTerm = null as any;
    expect(() => component.applyFilters()).not.toThrow();
  });

  it('should handle null filter type gracefully', () => {
    component.filterType = null as any;
    expect(() => component.applyFilters()).not.toThrow();
  });

  it('should store and retrieve users correctly from local storage', () => {
    const testUserData = [
      { username: 'Sam', workoutType: 'Yoga', workoutMinutes: 30 }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(testUserData));
    component.loadUsersFromLocalStorage();
    expect(component.users.some(user => user.name === 'Sam')).toBeTrue();
  });

  it('should correctly filter users when no filters are applied', () => {
    component.searchTerm = '';
    component.filterType = 'All';
    component.applyFilters();
    expect(component.paginatedUsers.length).toBeGreaterThan(0);
  });

  it('should properly update pagination when users list changes', () => {
    component.users.push({ name: 'NewUser', workouts: [{ type: 'Jumping', minutes: 15 }] });
    component.applyFilters();
    expect(component.paginatedUsers.length).toBeGreaterThan(0);
  });

  it('should return all users when filterType is "All"', () => {
    component.filterType = 'All';
    component.applyFilters();
    expect(component.paginatedUsers.length).toBe(component.users.length);
  });

});

