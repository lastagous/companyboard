import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private _menuItems: MenuItem[] = [
    {
      label:'Top',
      icon:'pi pi-fw pi-home',  
    },
    {
      label:'Members',
      icon:'pi pi-fw pi-user',  
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public get menuItems() {
    return this._menuItems;
  }
}
