import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { Observable, filter, map, shareReplay, throwError } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-auth';

  // customOptions: OwlOptions = {
  //   loop: true,
  //   autoplay: true,
  //   center: true,
  //   dots: false,
  //   autoHeight: true,
  //   autoWidth: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 1,
  //     },
  //     1000: {
  //       items: 1,
  //     }
  //   }
  // }

  apiData1 = [
  {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  },
  {
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "https://via.placeholder.com/600/24f355",
    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
  },
  {
    "albumId": 1,
    "id": 4,
    "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    "url": "https://via.placeholder.com/600/d32776",
    "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  },
  {
    "albumId": 1,
    "id": 8,
    "title": "aut porro officiis laborum odit ea laudantium corporis",
    "url": "https://via.placeholder.com/600/54176f",
    "thumbnailUrl": "https://via.placeholder.com/150/54176f"
  }
]
  

  public isAuthenticated$!: Observable<boolean>;
  public apiData!: PhotosApi;
  limit: number = 10;
  public darkMode = false;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private _router: Router,
    private overlayContainer: OverlayContainer,
    private elementRef: ElementRef<HTMLElement>,
    private _oktaStateService: OktaAuthStateService, 
    @Inject(OKTA_AUTH) 
    private _oktaAuth: OktaAuth) { }

  public ngOnInit(): void {
    this.fetch();
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    // console.log(this.apiData);
  }

  public toggleTheme(): void {
    this.darkMode = !this.darkMode;

    const elems = [
      this.elementRef.nativeElement,
      this.overlayContainer.getContainerElement()
    ];

    for (const elem of elems) {
      if (this.darkMode) {
        elem.classList.add('demo-dark-theme');
        continue;
      }

      elem.classList.remove('demo-dark-theme');
    }
  }

  

  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }

  fetch() {
    const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    const http$ = this.http.get<PhotosApi>(api);

    // http$.subscribe((res) => {
    //   this.apiData = res;
    //   console.log(this.apiData);
    // }, (err) => {
    //   throwError(err)
    // });

    // http$.subscribe({
    //   next: (v) => {
    //     console.log("Next Callback Function");
    //     console.log(v);
    //     this.apiData = v;
    //   },
    //   error: (e) => {
    //     console.log("Error Callback Function");
    //     console.log(e);
    //   },
    //   complete: () => {
    //     console.log("Completed Callback Function");
    //     console.log(this.apiData);1
    //   }
    // })

    // console.log(this.apiData);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
}
