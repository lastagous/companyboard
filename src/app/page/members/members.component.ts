import { Component, OnInit } from '@angular/core';
import { AlbumModel } from 'src/app/model/albums';
import { FreeCompanyMemberModel } from 'src/app/model/freecompany';
import { FirebaseStore } from 'src/app/store/firebase.store';
import { XivapiStore } from 'src/app/store/xivapi.store';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  isPickupModal = false;
  pickupModel: FreeCompanyMemberModel = {} as FreeCompanyMemberModel;
  albums: AlbumModel[] = [];
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  constructor(private xivapiStore: XivapiStore, private firebaseStore: FirebaseStore) { }

  ngOnInit(): void {
  }

  public get freeCompanyMembers() {
    return this.xivapiStore.freeCompany.FreeCompanyMembers;
  }

  public isLoading() {
    return this.xivapiStore.freeCompany.FreeCompanyMembers.length !== this.xivapiStore.characters.size;
  }

  public onCardClick(fcMember: FreeCompanyMemberModel) {
    this.pickupModel = fcMember;
    this.albums = this.firebaseStore.albumList.filter(album => album.lodestoneId === String(this.pickupModel.ID));
    this.isPickupModal = true;
  }

  public closePickUpModal() {
    this.isPickupModal = false;
  }

  public getPickUpImage() {
    return this.pickupModel.Character?.Portrait
  }

  public getPickupModelFirstName() {
    return this.pickupModel.Name?.split(/\s+/)[0];
  }

  public getPickupModelFamilyName() {
    return this.pickupModel.Name?.split(/\s+/)[1];
  }

}
