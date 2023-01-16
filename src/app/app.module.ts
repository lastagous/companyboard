import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { MenubarModule } from 'primeng/menubar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DataViewModule } from 'primeng/dataview';
import { ChipModule } from 'primeng/chip';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { XivapiClientModule } from '@xivapi/angular-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { TopComponent } from './page/top/top.component';
import { MembersComponent } from './page/members/members.component';
import { HousingComponent } from './page/housing/housing.component';
import { XivapiStore } from './store/xivapi.store';
import { FirebaseStore } from './store/firebase.store';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopComponent,
    MembersComponent,
    HousingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ScrollPanelModule,
    DataViewModule,
    ChipModule,
    BlockUIModule,
    ButtonModule,
    GalleriaModule,
    NgbModule,
    XivapiClientModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    XivapiStore,
    FirebaseStore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
