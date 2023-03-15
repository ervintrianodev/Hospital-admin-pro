import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Error404Component } from './pages/error/error404/error404.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: '**', component: Error404Component },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
