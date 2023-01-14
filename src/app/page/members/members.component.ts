import { Component, OnInit } from '@angular/core';
import { XivapiStore } from 'src/app/store/xivapi.store';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  isPickupModal = false;

  constructor(private xivapiStore: XivapiStore) { }

  ngOnInit(): void {
  }

  public get freeCompanyMembers() {
    return this.xivapiStore.freeCompany.FreeCompanyMembers;
  }

  public onCardClick() {
    console.log("onclick");
    this.isPickupModal = true;
  }

  public closePickUpModal() {
    this.isPickupModal = false;
  }

}
