import { NgModule } from '@angular/core';

import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { PTItemComponent } from './pt-item.component';
import { PTItemDetailsComponent } from './pt-item-details.component';
import { IncDecComponent } from '../shared/inc-dec.component';

import { ItemTypePickerModalComponent } from '../shared/item-type-picker-modal.component';
import { UserPickerModalComponent } from '../shared/user-picker-modal.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        PipesModule
    ],
    exports: [PTItemComponent],
    declarations: [
        PTItemComponent,
        PTItemDetailsComponent,
        ItemTypePickerModalComponent,
        UserPickerModalComponent,
        IncDecComponent
    ],
    providers: [],
    entryComponents: [
        ItemTypePickerModalComponent,
        UserPickerModalComponent
    ]
})
export class PTItemModule { }
