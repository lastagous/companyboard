import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { TopComponent } from './page/top/top.component';
import { MembersComponent } from './page/members/members.component';

import { XivapiStore } from './store/xivapi.store';

import { MenubarModule } from 'primeng/menubar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DataViewModule } from 'primeng/dataview';
import { ChipModule } from 'primeng/chip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { XivapiClientModule } from '@xivapi/angular-client';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopComponent,
    MembersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ScrollPanelModule,
    DataViewModule,
    ChipModule,
    NgbModule,
    XivapiClientModule.forRoot(),
  ],
  providers: [
    XivapiStore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
