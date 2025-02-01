Health Challenge Tracker
Overview
The Health Challenge Tracker is an Angular-based single-page application (SPA) that allows users to track their workout activities. Users can input their name, workout type, and workout duration. The application displays a list of user workouts with search, filter, and pagination functionalities. Optionally, it also includes a chart to visualize workout progress.


Features
Workout Form: Users can add their workout details (username, workout type, and duration).
Workout List: Displays a list of all users and their associated workouts, with options to search, filter, and paginate the results.
Local Storage: Workouts are saved to the browser's local storage to persist across sessions.
Pagination: View workouts with paginated results.
Filtering: Filter users by workout type and search by username.


Tech Stack
Frontend: Angular 14+, Tailwind CSS
Routing: Angular Router
Local Storage: Browser's local storage for saving user workouts

Setup
Clone the repository:
git clone <repository-url>
cd health-challenge-tracker


Install dependencies:
npm install

Run the application:
ng serve

The app will be available at http://localhost:4200/


To run the unit tests:
ng test



