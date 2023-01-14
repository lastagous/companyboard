import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { AlbumModel } from '../model/albums';

@Injectable()
export class FirebaseStore {
  albumAngularFireList: AngularFireList<AlbumModel> = this.db.list('/album');
  albumList: AlbumModel[] = [];

  constructor(private db: AngularFireDatabase) {
    this.albumAngularFireList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.albumList = data as AlbumModel[];
      console.log(data);
    });
	}
}
