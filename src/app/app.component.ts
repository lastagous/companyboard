import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FirebaseStore } from './store/firebase.store';
import { XivapiStore } from './store/xivapi.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig, private xivapiStore: XivapiStore, private firebaseStore: FirebaseStore) {}
  
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  
  title = 'companyboard'; 
}
