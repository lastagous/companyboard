import { Injectable } from '@angular/core';
import { CharacterResponse, XivapiEndpoint, XivapiOptions, XivapiService } from '@xivapi/angular-client';
import { BehaviorSubject } from 'rxjs';
import { FreeCompanyModel } from '../model/freecompany';
import { JobModel } from '../model/job';

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
  private basePath: string = "https://xivapi.com";
  private _jobList: JobModel[] = this.createJobList().sort((a, b) => {
    if (a.uiPriority < b.uiPriority) return -1;
    if (a.uiPriority > b.uiPriority) return 1;
    return 0;
  });;


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

  public get jobList() {
    return this._jobList;
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

  private createJobList() {
    return [
      this.createJob(1, "gladiator", this.basePath + "/cj/1/gladiator.png", 2),
      this.createJob(2, "pugilist", this.basePath + "/cj/1/pugilist.png", 22),
      this.createJob(3, "marauder", this.basePath + "/cj/1/marauder.png", 4),
      this.createJob(4, "lancer", this.basePath + "/cj/1/lancer.png", 24),
      this.createJob(5, "archer", this.basePath + "/cj/1/archer.png", 32),
      this.createJob(6, "conjurer", this.basePath + "/cj/1/conjurer.png", 12),
      this.createJob(7, "thaumaturge", this.basePath + "/cj/1/thaumaturge.png", 42),
      this.createJob(8, "carpenter", this.basePath + "/cj/1/carpenter.png", 101),
      this.createJob(9, "blacksmith", this.basePath + "/cj/1/blacksmith.png", 102),
      this.createJob(10, "armorer", this.basePath + "/cj/1/armorer.png", 103),
      this.createJob(11, "goldsmith", this.basePath + "/cj/1/goldsmith.png", 104),
      this.createJob(12, "leatherworker", this.basePath + "/cj/1/leatherworker.png", 105),
      this.createJob(13, "weaver", this.basePath + "/cj/1/weaver.png", 106),
      this.createJob(14, "alchemist", this.basePath + "/cj/1/alchemist.png", 107),
      this.createJob(15, "culinarian", this.basePath + "/cj/1/culinarian.png", 108),
      this.createJob(16, "miner", this.basePath + "/cj/1/miner.png", 201),
      this.createJob(17, "botanist", this.basePath + "/cj/1/botanist.png", 202),
      this.createJob(18, "fisher", this.basePath + "/cj/1/fisher.png", 203),
      this.createJob(19, "paladin", this.basePath + "/cj/1/paladin.png", 1),
      this.createJob(20, "monk", this.basePath + "/cj/1/monk.png", 21),
      this.createJob(21, "warrior", this.basePath + "/cj/1/warrior.png", 3),
      this.createJob(22, "dragoon", this.basePath + "/cj/1/dragoon.png", 23),
      this.createJob(23, "bard", this.basePath + "/cj/1/bard.png", 31),
      this.createJob(24, "white mage", this.basePath + "/cj/1/whitemage.png", 11),
      this.createJob(25, "black mage", this.basePath + "/cj/1/blackmage.png", 41),
      this.createJob(26, "arcanist", this.basePath + "/cj/1/arcanist.png", 44),
      this.createJob(27, "summoner", this.basePath + "/cj/1/summoner.png", 43),
      this.createJob(28, "scholar", this.basePath + "/cj/1/scholar.png", 13),
      this.createJob(29, "rogue", this.basePath + "/cj/1/rogue.png", 26),
      this.createJob(30, "ninja", this.basePath + "/cj/1/ninja.png", 25),
      this.createJob(31, "machinist", this.basePath + "/cj/1/machinist.png", 33),
      this.createJob(32, "dark knight", this.basePath + "/cj/1/darkknight.png", 5),
      this.createJob(33, "astrologian", this.basePath + "/cj/1/astrologian.png", 14),
      this.createJob(34, "samurai", this.basePath + "/cj/1/samurai.png", 27),
      this.createJob(35, "red mage", this.basePath + "/cj/1/redmage.png", 45),
      this.createJob(36, "blue mage", this.basePath + "/cj/1/bluemage.png", 46),
      this.createJob(37, "gunbreaker", this.basePath + "/cj/1/gunbreaker.png", 6),
      this.createJob(38, "dancer", this.basePath + "/cj/1/dancer.png", 34),
      this.createJob(39, "reaper", this.basePath + "/cj/1/reaper.png", 28),
      this.createJob(40, "sage", this.basePath + "/cj/1/sage.png", 15),
    ]
  }

  private createJob(id: number, name: string, icon: string, uiPriority: number) {
    return { id, name, icon, uiPriority } as JobModel
  }
  
}
