import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photos } from './models/photos.model';

import { map, mergeMap, take } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  albums;
  photos;
  selectedId: string = "";
  isLoadingAlbum = false;
  isLoadingPhotos = false;
  errors: string = "";
  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.albums = [];
    this.photos = [];
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {

    this.isLoadingAlbum = true;
    this.subscription = this.http.get('https://jsonplaceholder.typicode.com/albums')
      .subscribe(albums => {
        this.albums = albums;
        this.isLoadingAlbum = false;
        this.subscription = this.http.get('https://jsonplaceholder.typicode.com/photos')
          .subscribe(photos => {
            this.photos = photos;
            this.isLoadingPhotos = false;
          }, error => {

            this.errors = error;

          })
      })
  }


  getSelectedAlbumPhotoData(event: any) {
    this.selectedId = event.target.value;
    this.isLoadingPhotos = true;

    //Funkar inte
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    this.subscription = this.http.get(`https://jsonplaceholder.typicode.com/photos?albumId=${this.selectedId}`)
      .subscribe(photosData => {
        this.photos = photosData;
        console.log('Done');
        this.isLoadingPhotos = false;
      }, error => {

        this.errors = error;
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


