import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './page/members/members.component';
import { TopComponent } from './page/top/top.component';

const routes: Routes = [
  { path: 'top', component: TopComponent },
  { path: 'members', component: MembersComponent },
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path: '**', redirectTo: '/top', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
