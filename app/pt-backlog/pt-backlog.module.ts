import { NgModule } from '@angular/core';

//nativescript imports
import { NativeScriptModule } from "nativescript-angular/platform";

import { PTBacklogComponent } from './pt-backlog.component';
import { PTItemListComponent } from './pt-item-list/pt-item-list.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        NativeScriptModule,
        PipesModule
    ],
    exports: [PTBacklogComponent],
    declarations: [
        PTBacklogComponent,
        PTItemListComponent
    ],
    providers: [],
})
export class PTBacklogModule { }
