import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingComponent } from './page/housing/housing.component';
import { MembersComponent } from './page/members/members.component';
import { TopComponent } from './page/top/top.component';

const routes: Routes = [
  { path: 'top', component: TopComponent },
  { path: 'members', component: MembersComponent },
  { path: 'housing', component: HousingComponent },
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path: '**', redirectTo: '/top', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
