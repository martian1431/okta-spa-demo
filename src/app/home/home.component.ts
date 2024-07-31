import { Component } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public isAuthenticated$!: Observable<boolean>;

   constructor(private _oktaAuthStateService: OktaAuthStateService) { }

    public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaAuthStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

}
