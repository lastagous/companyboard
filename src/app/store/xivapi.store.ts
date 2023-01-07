import { Injectable } from '@angular/core';
import { XivapiOptions, XivapiService } from '@xivapi/angular-client';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class XivapiStore {

  private fcId: string = "9233082923551375942"
  private fcApiOption: XivapiOptions = {
    extraQueryParams : {
      "data": "FCM"
    }
  } as XivapiOptions
  private _freeCompany: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private xivapi: XivapiService) { 
    this._freeCompany.subscribe({
      next: () => console.log(this.freeCompany)
    })
    this.getFreeCompany();
  }

  public get freeCompany() {
    return this._freeCompany.getValue();
  }

  public async getFreeCompany(fcId: string = this.fcId, options: XivapiOptions = this.fcApiOption): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.xivapi.getFreeCompany(fcId, options).subscribe({
        next: response => {
          this._freeCompany.next(response);
          resolve();
        },
        error: err => {
          console.log("[ERR] call API \"getFreeCompany\":" + err);
          reject();
        }
      });
    });
  }
}
