import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { LoginModule } from "./pt-login/pt-login.module";
import { PTBacklogModule } from "./pt-backlog/pt-backlog.module";
import { AuthenticationService, UserService } from './services';
import { setStatusBarColors } from "./shared/status-bar-util";

setStatusBarColors();

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        LoginModule,
        PTBacklogModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthenticationService,
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
