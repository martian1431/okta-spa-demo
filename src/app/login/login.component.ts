import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

   constructor(
    private _router: Router, 
    private _oktaStateService: OktaAuthStateService, 
    @Inject(OKTA_AUTH) 
    private _oktaAuth: OktaAuth) { }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

    public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect();
  }

}
