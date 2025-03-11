import { Routes } from '@angular/router';
import { AllCoursesComponent } from  "../app/components/all-courses/all-courses.component";

import { AuthComponent } from './components/auth/auth.component';
import { UpdateComponent } from './components/update-course/update.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { LessonListModalComponentComponent } from './components/lesson-list-modal-component/lesson-list-modal-component.component';
import { UpdateLessonComponent } from './components/update-lesson/update-lesson.component';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {path: 'auth', component: AuthComponent},
    { path: 'all-courses', component: AllCoursesComponent },
    

   // { path: '**', redirectTo: '/home' } // fallback לכל הנתיבים הלא מוכרים
  ];