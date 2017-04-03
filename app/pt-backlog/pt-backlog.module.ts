import { NgModule } from '@angular/core';

//nativescript imports
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

import { BacklogRoutingModule } from './pt-backlog.routing';
import { BacklogService } from '../services';
import { MockDataService } from '../services/mock-data.service';
import { PTBacklogComponent } from './pt-backlog.component';
import { PTItemListComponent } from './pt-item-list/pt-item-list.component';
import { PTItemModule } from './pt-item/pt-item.module';
import { AddItemModalComponent } from './shared/add-item-modal.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        BacklogRoutingModule,
        PTItemModule,
        PipesModule
    ],
    exports: [PTBacklogComponent],
    declarations: [
        SIDEDRAWER_DIRECTIVES,
        PTBacklogComponent,
        PTItemListComponent,
        AddItemModalComponent
    ],
    entryComponents: [
        AddItemModalComponent
    ],
    providers: [
        BacklogService,
        MockDataService
    ],
})
export class PTBacklogModule { }
