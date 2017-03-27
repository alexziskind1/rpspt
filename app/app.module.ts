//angular imports
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

//nativescript imports
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";

//app imports
import { AppComponent } from "./app.component";
import { LoginModule } from "./pt-login/pt-login.module";
import { PTBacklogModule } from "./pt-backlog/pt-backlog.module";
import { UserService, AuthenticationService } from './services';
import { setStatusBarColors } from "./shared/status-bar-util";

setStatusBarColors();

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        LoginModule,
        PTBacklogModule
    ],
    providers: [
        UserService,
        AuthenticationService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
