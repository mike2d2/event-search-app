import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventSearchComponent } from './event-search/event-search.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
  {path: "home", component: HomeComponent},
  {path: "event-search", component: EventSearchComponent},
  {path: "events-table", component: EventsTableComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

