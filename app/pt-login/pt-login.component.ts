import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Page } from 'ui/page';
import { View } from 'ui/core/view';
import { Button } from 'ui/button';
import { Color } from "color";
import * as enums from 'ui/enums';
import { EventData } from 'data/observable';

import { AuthenticationService } from '../services';
import { DEMO_PASSWORD } from '../shared/constants';
import { PTDomain } from '../typings/domain';
import ILoginModel = PTDomain.ILoginModel;

@Component({
    moduleId: module.id,
    selector: 'pt-login',
    templateUrl: 'pt-login.component.html',
    styleUrls: ['pt-login.component.css']
})
export class LoginComponent implements OnInit {
    public isLoading: boolean = false;
    @ViewChild('loginInputs') loginInputsRef: ElementRef;
    @ViewChild('btnLoginWrapper') btnLoginWrapperRef: ElementRef;
    @ViewChild('btnLogin') btnLoginRef: ElementRef;

    public get loginInputs(): View {
        return this.loginInputsRef.nativeElement;
    }
    public get btnLoginWrapper(): View {
        return this.btnLoginWrapperRef.nativeElement;
    }
    public get btnLogin(): View {
        return this.btnLoginRef.nativeElement;
    }

    public loginModel: ILoginModel = { username: 'alexziskind', password: 'bad_password' };

    constructor(
        private page: Page,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    public loginTapped(btn: Button) {
        //alert('login tapped: ' + args.object);
        btn.text = 'Loggin in...';
    }

    public login() {
        this.isLoading = true;
        this.loginInputs.className = '';

        this.loginAnimationForward();

        this.authService.login(this.loginModel.username, this.loginModel.password)
            .subscribe(data => {
                if (data === null) {
                    console.log('login failed');
                    this.loginAnimationReverse()
                        .then(() => {
                            this.loginInputs.className = 'login-failed';
                        });
                }
                else {
                    console.log('login successful');
                }
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
            });
    }

    private loginAnimationForward() {
        this.btnLogin.opacity = 0;
        this.btnLoginWrapper.animate({
            scale: { x: 0.5, y: 0.5 },
            duration: 200,
            curve: enums.AnimationCurve.cubicBezier(0, .75, .22, 1)
        }).then(() => {
            this.btnLoginWrapper.animate({
                scale: { x: 20, y: 20 },
                duration: 250,
                curve: enums.AnimationCurve.cubicBezier(.93, .02, 1, .25)
            }).then(() => {
                this.btnLoginWrapper.animate({
                    backgroundColor: new Color('#999999'),
                    duration: 5000,
                    delay: 500
                });
            });
        });
    }

    private loginAnimationReverse() {
        return this.btnLoginWrapper.animate({
            scale: { x: 1, y: 1 },
            backgroundColor: new Color('#555a97'),
            duration: 200,
            curve: enums.AnimationCurve.cubicBezier(0, .75, .22, 1)
        }).then(() => {
            this.btnLogin.opacity = 1;
        });
    }
}