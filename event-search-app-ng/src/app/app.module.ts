import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { EventSearchComponent } from './event-search/event-search.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { DetailsNavContainerComponent } from './details-nav-container/details-nav-container.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    EventSearchComponent,
    EventsTableComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailsNavContainerComponent,
    EventDetailsComponent,
    ArtistDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
