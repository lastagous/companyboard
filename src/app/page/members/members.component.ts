import { Component, OnInit } from '@angular/core';
import { ClassJob } from '@xivapi/angular-client';
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
  jobViewList: { id: number; icon: string; level: any; uiPriority: number; }[] = [];

  constructor(private xivapiStore: XivapiStore, private firebaseStore: FirebaseStore) { }

  ngOnInit(): void {
  }

  public get freeCompanyMembers() {
    return this.xivapiStore.freeCompany.FreeCompanyMembers;
  }

  public isLoading() {
    return this.xivapiStore.freeCompany.FreeCompanyMembers?.length !== this.xivapiStore.characters.size;
  }

  public onCardClick(fcMember: FreeCompanyMemberModel) {
    this.pickupModel = fcMember;
    this.albums = this.firebaseStore.albumList.filter(album => album.lodestoneId === String(this.pickupModel.ID));
    this.jobViewList = this.getJobViewList();
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

  private getJobViewList() {
    const result = [];
    const characterJobs = this.pickupModel.Character ? this.pickupModel.Character.ClassJobs : {};
    for (let i = 0; characterJobs[i]; i++) {
      const characterJob = characterJobs[i] as any;
      const jobInfo = this.xivapiStore.jobList.find(job => job.id === characterJob.UnlockedState.ID);
      if (jobInfo) {
        result.push({
          id: jobInfo.id,
          icon: jobInfo.icon,
          level: characterJob.Level,
          uiPriority: jobInfo.uiPriority
        });
      }
    }
    return result;
  }

  public get tankJobList() {
    return this.jobViewList.filter(job => Math.trunc(job.uiPriority / 10) === 0);
  }
    
  public get healerJobList() {
    return this.jobViewList.filter(job => Math.trunc(job.uiPriority / 10) === 1);
  }
    
  public get meleeJobList() {
    return this.jobViewList.filter(job => Math.trunc(job.uiPriority / 10) === 2);
  }
    
  public get pRangeJobList() {
    return this.jobViewList.filter(job => Math.trunc(job.uiPriority / 10) === 3);
  }
    
  public get mRangeJobList() {
    return this.jobViewList.filter(job => Math.trunc(job.uiPriority / 10) === 4);
  }

  public get crafterJobList() {
    return this.jobViewList.filter(job => Math.trunc(job.uiPriority / 10) === 10);
  }

  public get gathererJobList() {
    return this.jobViewList.filter(job => Math.trunc(job.uiPriority / 10) === 20);
  }

}
