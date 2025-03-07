import { Routes } from '@angular/router';
import { AllCoursesComponent } from  "../app/components/all-courses/all-courses.component";
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthComponent } from './components/auth/auth.component';
export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {path: 'auth', component: AuthComponent},
    { path: 'home', component: HomePageComponent },
    { path: 'all-courses', component: AllCoursesComponent },
   // { path: '**', redirectTo: '/home' } // fallback לכל הנתיבים הלא מוכרים
  ];