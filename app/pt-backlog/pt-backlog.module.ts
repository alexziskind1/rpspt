import { NgModule } from '@angular/core';

//nativescript imports
import { NativeScriptModule } from "nativescript-angular/platform";
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

import { BacklogService } from '../services/backlog.service';
import { PTBacklogComponent } from './pt-backlog.component';
import { PTItemListComponent } from './pt-item-list/pt-item-list.component';
import { PTItemModule } from './pt-item/pt-item.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        NativeScriptModule,
        PTItemModule,
        PipesModule
    ],
    exports: [PTBacklogComponent],
    declarations: [
        SIDEDRAWER_DIRECTIVES,
        PTBacklogComponent,
        PTItemListComponent
    ],
    providers: [
        BacklogService
    ],
})
export class PTBacklogModule { }
