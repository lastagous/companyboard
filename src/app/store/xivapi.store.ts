import { Injectable } from '@angular/core';
import { CharacterResponse, XivapiOptions, XivapiService } from '@xivapi/angular-client';
import { BehaviorSubject } from 'rxjs';
import { FreeCompanyModel } from '../model/freecompany';

@Injectable()
export class XivapiStore {

  private fcId: string = "9233082923551375942"
  private fcApiOption: XivapiOptions = {
    extraQueryParams : {
      "data": "FCM"
    }
  } as XivapiOptions
  private _freeCompany: BehaviorSubject<FreeCompanyModel> = new BehaviorSubject({} as FreeCompanyModel);
  private _characters: BehaviorSubject<Map<number, CharacterResponse>> = new BehaviorSubject(new Map());


  constructor(private xivapi: XivapiService) { 
    this._freeCompany.subscribe({
      next: () => {
        console.log(this.freeCompany);
        console.log(this.characters);
      }
    })
    this.getFreeCompany();
  }

  public get freeCompany() {
    return this._freeCompany.getValue();
  }

  public get characters() {
    return this._characters.getValue();
  }

  public async getFreeCompany(fcId: string = this.fcId, options: XivapiOptions = this.fcApiOption): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.xivapi.getFreeCompany(fcId, options).subscribe({
        next: response => {
          const freecompanyModel = response as FreeCompanyModel;
          freecompanyModel.FreeCompanyMembers.forEach((fcMember) => {
            this.getCharacter(fcMember.ID);
          });
          this._freeCompany.next(freecompanyModel);
          resolve();
        },
        error: err => {
          console.log("[ERR] call API \"getFreeCompany\":" + err);
          reject();
        }
      });
    });
  }
  public async getCharacter(lodestoneId: number, options: XivapiOptions = {}): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.xivapi.getCharacter(lodestoneId, options).subscribe({
        next: response => {
          this.characters.set(lodestoneId, response);
          this.freeCompany.FreeCompanyMembers.forEach(fcMember => {
            if (fcMember.ID === response.Character.ID) {
              fcMember.Character = response.Character;
              return;
            }
          })
          resolve();
        },
        error: err => {
          console.log("[ERR] call API \"getCharacter\":" + err);
          reject();
        }
      });
    });
  }
}
