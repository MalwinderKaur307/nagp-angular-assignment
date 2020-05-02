import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UpdatesComponent } from './updates/updates.component';
import { PrecautionsComponent } from './precautions/precautions.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'updates',
    component:UpdatesComponent
  },
  {
    path: 'precautions',
    component:PrecautionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
